import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useState } from 'react';
//@ts-ignore
import { Color } from '@project-types/enum';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Img from '@components/Core/Img';
// import HeaderLogo from '@assets/Images/Icons/HeaderLogo.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Typography from '@components/Core/Typography';
//@ts-ignore
import { HeaderProps } from '@project-types/index';
import {
  useFocusEffect,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import SearchModal from '@components/SearchModal';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { ScrollView } from 'react-native-gesture-handler';

const Header = (props: HeaderProps) => {
  const {
    title,
    variant = 'Primary',
    showTitle,
    showBack = false,
    showSearch = true,
    showWelcome = true,
    color,
    onBack,
    overContent = false,
    type,
    margin,
  } = props;
  const [showSearchModal, setshowSearchModal] = useState(false);
  const [searchValue, setsearchValue] = useState('');
  const navigation = useNavigation<any>();
  const notifications = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const authUser = useSelector((s: RootState) => s.auth.user);

  //   useFocusEffect(
  //   useCallback(() => {
  //     const onBeforeRemove = async (e: any) => {
  //       e.preventDefault();
  //       if(onBack) onBack();
  //       else navigation.goBack();
  //     };
  //     navigation.addListener('beforeRemove', onBeforeRemove);

  //     return () => {
  //       navigation.removeListener('beforeRemove', onBeforeRemove);
  //     };
  //   }, [navigation, ])
  // );

  const getHeaders = () => {
    switch (variant) {
      case 'Primary':
        return (
          <View style={styles.container}>
            <View style={styles.round_B} />
            <View style={styles.round_Y} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 6,
              }}
            >
              <Img
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                type="svg"
                containerStyle={{ marginRight: 'auto', opacity: 0.9 }}
                source={''}
                style={{ width: 150, height: 60 }}
              />
              {/* <Ionicons
                name="chatbubbles"
                size={24}
                color="#fff"
                style={{ marginRight: 12 }}
                onPress={() => navigation.navigate('Conversations')}
              /> */}
              <View
                style={{
                  position: 'relative',
                }}
              >
                {notifications.length > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      borderWidth: 2.4,
                      borderColor: Color.Primary,
                      backgroundColor: Color.Red,
                      width: 11.5,
                      height: 11.5,
                      right: 2.6,
                      top: -1,
                      zIndex: 1,
                      borderRadius: 50,
                    }}
                  />
                )}
                <Ionicons
                  onPress={() => navigation.navigate('Notifications')}
                  name="notifications"
                  size={24}
                  color="#fff"
                />
              </View>
            </View>
            {showWelcome && (
              <View
                style={{
                  display: 'flex',
                  marginTop: 18,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography
                  style={{
                    fontFamily: 'Georgia',
                    fontSize: 20,
                    color: Color.White,
                    lineHeight: 24,
                    opacity: 0.9,
                  }}
                >
                  👋 Hi! Welcome,
                </Typography>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 22,
                    color: Color.White,
                    lineHeight: 24,
                    marginLeft: 4,
                  }}
                >
                  {authUser?.name}
                </Text>
              </View>
            )}

            {showSearch && (
              // <ScrollView keyboardShouldPersistTaps="always">
                <View style={{ marginTop: 15, marginBottom: 10, position : 'relative', zIndex: 0 }}>
                  <SearchModal
                    onChangeText={text => setsearchValue(text)}
                    value={searchValue}
                    topMargin={margin}
                    type={type}
                    title={title}
                  />
                </View>
              // </ScrollView>
            )}
            {showTitle && title && (
              <Typography
                style={{
                  fontFamily: 'Georgia',
                  fontSize: 20,
                  color: Color.White,
                  lineHeight: 24,
                  opacity: 0.9,
                  marginVertical: 14,
                }}
              >
                {title}
              </Typography>
            )}
          </View>
        );
      case 'Secondary':
        return (
          <View
            style={[
              styles.container,
              {
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 20,
              },
              overContent && {
                position: 'absolute',
                top: 0,
                zIndex: 1,
              },
            ]}
          >
            {showBack && (
              <Typography
                onPress={() => {
                  onBack && onBack();
                  if (!onBack) navigation.goBack();
                }}
                containerStyle={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
                style={{
                  fontSize: 14,
                  opacity: 0.8,
                }}
              >
                Back
              </Typography>
            )}
            <Typography
              containerStyle={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '80%',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              style={{
                fontSize: 18,
                fontFamily: 'Georgia Bold',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {title}
            </Typography>
          </View>
        );
      default:
        break;
    }
  };

  return getHeaders();
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Primary,
    width: wp('100%'),
    padding: 16,
    paddingHorizontal: 20,
  },
  round_B: {
    backgroundColor: '#FFE20A',
    width: 280,
    height: 280,
    position: 'absolute',
    top: -hp('17%'),
    left: -wp('13%'),
    transform: [{ rotate: '28deg' }],
    borderRadius: 150,
    zIndex: -1,
    opacity: 0.09,
  },
  round_Y: {
    backgroundColor: '#FFE20A',
    width: 208,
    height: 208,
    position: 'absolute',
    top: -hp('12%'),
    left: -wp('10%'),
    transform: [{ rotate: '68deg' }],
    borderRadius: 150,
    zIndex: -1,
    opacity: 0.04,
  },
});
