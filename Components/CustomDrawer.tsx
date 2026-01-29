import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  DrawerContentScrollView,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
//@ts-ignore
import { Color, FontSize } from '@project-types/enum';
import Typography from './Core/Typography';
import { useNavigationState } from '@react-navigation/native';
import SuccessModal from './SuccessModal';
import Button from './Core/Button';
import { AppDispatch, RootState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { BUILD_Media_URL } from '@utils/appGlobal';
import { logout } from '@redux/Auth/authSlice';

const getActiveRouteName = (state: any) => {
  const route: any = state.routes[state.index];

  if (route?.state) {
    return getActiveRouteName(route?.state);
  }

  return route?.name;
};

const CustomDrawer = (props: any) => {
  const { navigation } = props;
  const isDrawerOpen = useDrawerStatus() === 'open';
  const state = useNavigationState(state => state);
  const currentRouteName = getActiveRouteName(state);
  const user = useSelector((s: RootState) => s.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [prompt, setprompt] = useState({
    visible: false,
    title: 'Are you Sure that you want to Logged out',
    message:
      'Are you sure you want to log out? You will need to sign in again to access your account.',
  });

  const renderIcon = (icon: any, type?: string) => {
    return (
      <View
        style={{
          position: 'relative',
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginEnd: 10
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: 40,
            height: 40,
            backgroundColor: type === 'Logout' ? Color.Red : 'transparent',
            opacity: 0.1,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: -1,
          }}
        />
        <View
          style={{
            position: 'absolute',
          }}
        >
          {icon}
        </View>
      </View>
    );
  };

  const DrawerItems = [
    {
      label: 'Edit Profile',
      key: 'Profile',
      icon: (
        <>
          {currentRouteName === 'Profile' ? (
            <Image
              source={require('')}
              style={{
                width: 40,
                height: 40,
              }}
            />
          ) : (
            <Image
              source={require('')}
              style={{
                width: 40,
                height: 40,
              }}
            />
          )}
        </>
      ),
    },
    {
      label: 'My Certificates',
      key: 'Certificates',
      icon: (
        <>
        {currentRouteName === 'Certificates' ? (
          <Image
            source={require('')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        ) : (
          <Image
            source={require('')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        )}
      </>
      ),
    },
   
    {
      label: 'Notifications',
      key: 'NotificationSetting',
      icon: (
        <>
        {currentRouteName === 'Notifications' ? (
          <Image
            source={require('')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        ) : (
          <Image
            source={require('')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        )}
      </>
      ),
    },
    {
      label: 'FAQs',
      key: 'Help',
      icon: (
        <>
        {currentRouteName === 'Help' ? (
          <Image
            source={require('')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        ) : (
          <Image
            source={require('')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        )}
      </>
      ),
    },
    {
      label: 'Feedback',
      key: 'Feedback',
      icon: (
        <>
        {currentRouteName === 'Feedback' ? (
          <Image
            source={require('')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        ) : (
          <Image
            source={require('')} 
            style={{
              width: 40,
              height: 40,
            }}
          />
        )}
      </>
      ),
    },
    {
      label: 'About',
      key: 'About',
      icon: (
        <>
        {currentRouteName === 'About' ? (
          <Image
            source={require('')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        ) : (
          <Image
            source={require('')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        )}
      </>
      ),
    },
  ];

  const logoutUser = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'transparent' }}>
      {isDrawerOpen && (
        <TouchableOpacity
          onPress={() => props.navigation.closeDrawer()}
          style={{
            backgroundColor: Color.Red,
            borderRadius: 50,
            width: 45,
            height: 45,
            alignItems: 'center',
            borderColor: 'transparent',
            borderWidth: 2,
            position: 'absolute',
            right: -20,
            top: 40,
            zIndex: 999999,
            elevation: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                padding: 8,
                color: 'black',
              }}
            >
              X
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <DrawerContentScrollView
        contentContainerStyle={{
          paddingTop: 0,
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        {...props}
      >
        <ImageBackground
          source={require('')}
          resizeMode="cover"
          style={{
            width: 'auto',
            height: hp('100%'),
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            backgroundColor: Color.Secondary,
          }}
        >
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: 'transparent',
            }}
          >
            <View
              style={{
                width: '84%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginHorizontal: '8%',
                marginVertical: 24,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 24,
                }}
              >
                <Image
                  source={{
                    uri: user?.profile_pic
                      ? BUILD_Media_URL(user?.profile_pic)
                      : 'https://www.w3schools.com/howto/img_avatar.png',
                  }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 100,
                  }}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginLeft: 10,
                  }}
                >
                  <Typography
                    variant="royal"
                    color="White"
                    style={{
                      fontSize: FontSize['xl'],
                    }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography
                    auto
                    color="White"
                    style={{
                      marginTop: 2,
                      opacity: 0.6,
                      fontSize: FontSize['base'],
                    }}
                  >
                    {user?.email}
                  </Typography>
                </View>
              </View>

              <View
                style={{
                  height: hp('72%'),
                }}
              >
                {DrawerItems.map((item, index) => (
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginVertical: 8,
                      opacity: currentRouteName === item.key ? 1 : 0.7,
                    }}
                    key={index}
                    onPress={() => {
                      navigation.navigate(item.key);
                    }}
                  >
                    {renderIcon(item.icon)}
                    <Typography
                      auto
                      onPress={() => {
                        navigation.navigate(item.key);
                      }}
                      style={{
                        fontSize: FontSize['lg'],
                        marginLeft: 10,
                        fontFamily: 'Georgia',
                        color:
                          currentRouteName === item.key
                            ? Color.Red
                            : Color.White,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => setprompt({ ...prompt, visible: true })}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 'auto',
                  }}
                >
                  {renderIcon(
                    <Image
                      source={require('')}
                      resizeMode="contain"
                    />,
                    'Logout',
                  )}
                  <Typography
                    onPress={() => setprompt({ ...prompt, visible: true })}
                    auto
                    variant="royal"
                    style={{
                      fontSize: FontSize['lg'],
                      marginLeft: 10,
                      color: Color.Red,
                      textTransform: 'uppercase',
                    }}
                  >
                    Logout
                  </Typography>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
        {prompt.visible && (
          <SuccessModal
            visible={prompt.visible}
            title={prompt.title}
            message={prompt.message}
            onClose={() => {
              setprompt({ visible: false, title: '', message: '' });
            }}
            showClose={true}
            showImage={false}
            align="bottom-center"
            style={{
              height: 260,
            }}
            customButton={
              <Button
                onPress={logoutUser}
                style={{
                  marginTop: 20,
                }}
              >
                <Image
                  source={require('')}
                  resizeMode="contain"
                />
                <Typography
                  auto
                  variant="royal"
                  style={{
                    fontSize: FontSize['xl'],
                    marginLeft: 4,
                    color: Color.White,
                  }}
                >
                  Logout
                </Typography>
              </Button>
            }
          />
        )}
      </DrawerContentScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default CustomDrawer;
