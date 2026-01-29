/* eslint-disable react-native/no-inline-styles -- dynamic values (widthPercentageToDP, bottomImageStyle) require inline styles */
import {
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Typography from '@components/Core/Typography';
import ScreenLoader from '@components/ScreenLoader';
// @ts-ignore
import { Color } from '@project-types/enum';
import { useNavigation } from '@react-navigation/native';

interface AuthTemplateProps {
  children: React.ReactNode;
  bottomText?: string;
  style?: ViewStyle;
  bottomImageStyle?: {
    right?: number;
    bottom?: number;
  };
  title?: string;
  showBack?: boolean;
  showBackText?: boolean;
  isLoading?: boolean;
  renderBottom?: () => React.ReactNode;
}
const AuthTemplate = (props: AuthTemplateProps) => {
  const {
    children,
    bottomText,
    bottomImageStyle,
    showBack,
    showBackText = true,
    style,
    title,
    isLoading = false,
    renderBottom,
  } = props;
  const navigation = useNavigation<any>();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('')}
        style={{
          width: widthPercentageToDP('100%'),
          height: heightPercentageToDP('100%'),
        }}
      >
        {showBack ? (
          <View
            style={{
              marginTop: heightPercentageToDP('3.6%'),
              width: widthPercentageToDP('84%'),
              marginBottom: 28,
              marginHorizontal: widthPercentageToDP('8%'),
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {showBackText && (
              <Typography
                onPress={() => navigation.goBack()}
                style={{
                  fontSize: 14,
                  opacity: 0.8,
                  color: Color.Tertiary,
                }}
              >
                Back
              </Typography>
            )}
            <Typography
              color="Primary"
              containerStyle={{
                width: widthPercentageToDP('80%'),
                marginLeft: widthPercentageToDP('18%'),
              }}
              style={{
                fontFamily: 'Georgia',
                fontSize: 20,
              }}
            >
              {title}
            </Typography>
          </View>
        ) : (
          <Image
            source={require('')}
            style={{
              marginTop: heightPercentageToDP('5%'),
              marginLeft: '7%',
              marginBottom: 28,
            }}
          />
        )}

        <View
          style={[
            {
              minHeight: heightPercentageToDP('40%'),
              height: 'auto',
              width: widthPercentageToDP('88%'),
              marginHorizontal: widthPercentageToDP('6%'),
              borderRadius: 20,
              backgroundColor: '#fff',
              zIndex: 1,
              shadowColor: '#000',
              shadowOffset: { width: 2, height: 5 },
              shadowOpacity: 0.1,
              shadowRadius: 15,
              elevation: 10,
              position: 'relative',
              overflow: 'hidden',
            },
            style,
          ]}
        >
          {children}
          <Image
            source={require('')}
            style={{
              position: 'absolute',
              top: -12,
              left: -10,
              zIndex: -1,
            }}
          />
          <Image
            style={{
              position: 'absolute',
              bottom: bottomImageStyle?.bottom || 0,
              right: bottomImageStyle?.right || -20,
              zIndex: 1,
            }}
            source={require('')}
          />
          <Image
            style={{
              position: 'absolute',
              bottom: bottomImageStyle?.bottom || 0,
              right: bottomImageStyle?.right || -20,
              zIndex: -1,
            }}
            source={require('')}
          />
        </View>
        <Image
          source={require('')}
          style={{
            width: widthPercentageToDP('100%'),
            height: heightPercentageToDP('50%'),
            alignSelf: 'center',
            marginTop: 'auto',
            position: 'absolute',
            bottom: 0,
          }}
        />
        {renderBottom && renderBottom()}
        {bottomText && (
          <Typography
            onPress={() => Linking.openURL('https://dev-iliff-flourish-web-new.flynautstaging.com/terms&Conditions/terms.html')}
            containerStyle={{
              marginVertical: 20,
              alignSelf: 'center',
            }}
            style={{
              fontSize: 13,
            }}
          >
            {bottomText}
          </Typography>
        )}
      </ImageBackground>
      <ScreenLoader open={isLoading} />
    </ScrollView>
  );
};

export default AuthTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
    position: 'relative',
    marginTop: Platform.OS === 'ios' ? 24 : 0,
  },
});
