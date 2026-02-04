import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Typography from '@components/Core/Typography';
import Button from '@components/Core/Button';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Color } from '@project-types/enum';

const Onboarding = () => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const navigation = useNavigation<any>();
  const WrapperData = [
    {
      image: require('@assets/Images/onboarding-1.png'),
      title:
        'Lorem ipsum dolor sit amet ipsum dolor',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      image: require('@assets/Images/onboarding-2.png'),
      title: 'Lorem ipsum dolor sit amet ipsum dolor',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      image: require('@assets/Images/onboarding-3.png'),
      title: 'Lorem ipsum dolor sit amet ipsum dolor',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  const highlightedWords = [
    'dolor',
    'sit',
  ];

  const onNext = () => {
    if (currentIndex < WrapperData.length - 1) {
      setcurrentIndex(currentIndex + 1);
    } else {
      setcurrentIndex(0);
      navigation.navigate('Login');
    }
  };

  const makeTextHighlight = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      if (highlightedWords.includes(word)) {
        return (
          <Typography
            key={index}
            color={'Red'}
          >
            {' ' + word}
          </Typography>
        );
      }
      return (
        <Text key={index}>
          {' ' + word}
        </Text>
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* <ImageBackground
          imageStyle={{
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
          source={require('@assets/Images/onboarding-back.png')}
          style={{
            height: heightPercentageToDP('100%'),
            width: widthPercentageToDP('100%'),
            marginBottom: 100,
          }}
        > */}
        {currentIndex != 2 && (
            <Typography
              onPress={() => navigation.navigate('Login')}
              containerStyle={{
                position: 'absolute',
                top: Platform.OS === 'android' ? 20 : 50,
                right: 20,
                zIndex: 1000,
              }}
            >
              Skip
            </Typography>
          )}

          <Image
            source={WrapperData[currentIndex].image}
            style={{
              height: heightPercentageToDP('50%'),
              width: widthPercentageToDP('100%'),
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              zIndex: -1,
            }}
          />

          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: heightPercentageToDP('40%'),
              marginTop: 22,
            }}
          >
            <Typography
              containerStyle={{
                width: '100%',
              }}
              style={{
                textAlign: 'center',
                color: '#000',
              }}
            >
              {makeTextHighlight(WrapperData[currentIndex].title)}
            </Typography>
            <Typography
              containerStyle={{
                width: widthPercentageToDP('90%'),
              }}
              style={{
                textAlign: 'center',
                color: '#666',
                opacity: 0.8,
                lineHeight: 22,
                fontSize: 13,
                marginTop: 10,
              }}
            >
              {WrapperData[currentIndex].description}
            </Typography>

            <TouchableOpacity onPress={onNext}>
              <Image
                source={require('@assets/Images/red-button.png')}
                style={{ width: 70, height: 70 }}
              />
            </TouchableOpacity>
          </View>
        {/* </ImageBackground> */}
      </ScrollView>
    </View>
  )
};
export default Onboarding;

const styles = StyleSheet.create({
  gradient: {
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('100%'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
