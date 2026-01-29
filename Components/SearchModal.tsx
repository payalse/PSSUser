import {
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Typography from './Core/Typography';
// @ts-ignore
import { Color, FontSize } from '@project-types/enum';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  value: string;
  onChangeText: (text: string) => void;
  topMargin?: any;
  type?: string;
  title: string;
}

const SearchModal = (props: IProps) => {
  const inputEl: any = useRef(null);
  const navigation = useNavigation<any>();
  const [history, setHistory] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  const getHistory = () => {
    AsyncStorage.getItem('history').then((res: any) => {
      if (res !== null) {
        const localHistory: any = JSON.parse(res);
        setHistory(localHistory);
      }
    });
  };

  const saveHistory = (searchString: string) => {
    const tempHistory = [...history];
    if (tempHistory.length < 5) {
      tempHistory.push(searchString);
    } else {
      tempHistory.shift();
      tempHistory.push(searchString);
    }
    setHistory(tempHistory);
    AsyncStorage.setItem('history', JSON.stringify(tempHistory));
  };

  const clearHistory = () => {
    console.log('hhg');
    AsyncStorage.removeItem('history');
    setShowHistory(false);
    setHistory([]);
  };

  const onFocusOut = () => {
    Keyboard.dismiss;
    // setIsFocused(false);
  };

  useEffect(() => {
    getHistory();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowHistory(false);
  //   }, 5000);
  // }, [isFocused]);

  return (
    <TouchableWithoutFeedback onPress={onFocusOut}>
      <View style={styles.container}>
        <View
          style={{
            ...styles.searchBar,
            top: props.topMargin ? props.topMargin : 10,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              backgroundColor: '#fff',
              alignItems: 'center',
              paddingHorizontal: 8,
              borderRadius: 12,
              height: 40
            }}
          >
            <Ionicons name="search-outline" size={18} color={'#c6c5c9'} />
            <TextInput
              style={{ color: '#000' , paddingLeft: 10}}
              placeholderTextColor={'#c6c5c9'}
              placeholder="Search here..."
              ref={inputEl}
              onChangeText={text => props.onChangeText(text)}
              value={props.value}
              onFocus={() => {
                setIsFocused(true);
                setShowHistory(true);
              }}
              onSubmitEditing={() => {
                saveHistory(props.value);
                setIsFocused(false);
                props.onChangeText('')
                navigation.navigate('Search', {
                  search: props.value,
                  type: props.type,
                  title: props.title,
                });
              }}
            />
          </View>
        </View>
        {isFocused && (
          <View style={styles.historyContainer}>
            <View style={styles.historyHeader}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Ionicons name="search-outline" size={18} color={'#c6c5c9'} />
                <Typography
                  onPress={() => {
                    clearHistory(); // Clear the history
                  }}
                  style={{
                    fontSize: FontSize['base'],
                    color: '#F52020',
                    zIndex: 99999,
                    marginLeft: 10,
                  }}
                >
                  Clear history
                </Typography>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Ionicons
                  name="close"
                  onPress={() => setIsFocused(false)}
                  size={24}
                  color={'#c6c5c9'}
                />
              </View>
            </View>
            {history.map((item: any, index: any) => (
              <TouchableOpacity
                onPress={() => {
                  setIsFocused(false);
                  navigation.navigate('Search', {
                    search: item,
                    type: props.type,
                    title: props.title,
                  });
                }}
                key={index}
                style={styles.historyItem}
              >
                <Ionicons
                  name="time-outline"
                  size={18}
                  color={Color.Tertiary}
                />
                <Typography
                  auto
                  style={{
                    fontSize: FontSize['base'],
                    marginLeft: 6,
                  }}
                >
                  {item}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  searchBar: {
    width: widthPercentageToDP('90%'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: 'auto',
  },
 
  historyContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    width: '99%',
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    position: 'absolute',
    top: 40,
    zIndex: Platform.OS === 'ios' ? 9999 : 2,
    elevation: 1
  },
  historyHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    position: 'relative',
    zIndex: 1,
  },
  historyItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    opacity: 0.8,
  },
});
