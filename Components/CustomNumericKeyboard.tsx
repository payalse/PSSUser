import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Typography from './Core/Typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
//@ts-ignore
import { Color } from '@project-types/enum';

interface CustomNumericKeyboardProps {
  onKeyPress: (num: string) => void;
}

const CustomNumericKeyboard: React.FC<CustomNumericKeyboardProps> = ({
  onKeyPress,
}) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'];

  const handleKeyPress = (key: string) => {
    onKeyPress(key);
  };

  return (
    <View style={styles.keyboardContainer}>
      {keys.map(key => (
        <TouchableOpacity
          key={key}
          style={[
            styles.key,
            key === '0'
              ? {width: widthPercentageToDP('48%'), position: 'relative'}
              : {},
          ]}
          onPress={() => handleKeyPress(key)}>
          {key === 'backspace' ? (
            <Ionicons
              name="backspace"
              onPress={() => handleKeyPress(key)}
              size={28}
              color={Color.Tertiary}
            />
          ) : (
            <Typography
              onPress={() => handleKeyPress(key)}
              containerStyle={
                key === '0'
                  ? {position: 'absolute', right: widthPercentageToDP('10%')}
                  : {}
              }
              style={[styles.keyText, key === '0' ? {textAlign: 'right'} : {}]}>
              {key}
            </Typography>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  key: {
    width: widthPercentageToDP('24%'),
    padding: 14,
    alignItems: 'center',
    fontSize: 24,
    opacity: 0.8,
    zIndex: 2,
  },

  keyText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CustomNumericKeyboard;
