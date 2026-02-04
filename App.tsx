import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from '@navigation/MainNavigation';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from './Redux/store';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { getUserAddress, getUserFromLocal } from '@redux/Auth/helper';
import { AuthUser, UserAddress } from '@project-types/index';
import {
  addUserAddress,
  login,
  setIsAuthenticated,
  setNotification,
  updateUserSettings,
} from '@redux/Auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addNotificationToken, getDropDownList, getUserSettingsData } from '@api/user';
import { addDropDownItem } from '@redux/Common/dropDownSlice';

const AppInit = () => {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  // const firebaseConfig = {
  //   apiKey: 'AIzaSyDh07LMqtLA5DgnKUKUdIIb5ZmPQ9Ja9Kc',
  //   authDomain: 'flourish-9846f.firebaseapp.com',
  //   projectId: 'flourish-9846f',
  //   storageBucket: 'flourish-9846f.appspot.com',
  //   messagingSenderId: '370251750839',
  //   appId: '1:370251750839:ios:4997ba1491246bb7969c32',
  // };
  
 
  const run = async () => {
    try {
      // if (!firebase.apps.length) {
      //   firebase.initializeApp(firebaseConfig);
      // }
      const localUserData = (await getUserFromLocal()) as AuthUser;
      const localUserAddress = (await getUserAddress()) as UserAddress;
      if (localUserData) {
        dispatch(login(localUserData));
        dispatch(setIsAuthenticated(true));
        let fcmToken: any = await AsyncStorage.getItem('fcmToken');
        if (fcmToken) {
          const body = {
            notification_token: fcmToken,
          };
          const data = (await addNotificationToken(body, localUserData?.token!)) as any;
          console.log(data);
          dispatch(setNotification(data))
        }
       
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsReady(true);
    }
  };
  useEffect(() => {
    run();
  }, []);

  if (!isReady) {
    return null;
  }
  return <MainNavigation />;
};

const App = () => {
  // useEffect(() => {
  //   requestUserPermission().then((result: any) => {
  //     if(result) {
  //       AsyncStorage.setItem('fcmToken', result);
  //     }
  //   }).catch((error: any) => {
  //     console.log(error);
  //   })
  // }, []);
  return (
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <NavigationContainer>
            <AlertNotificationRoot>
              <AppInit />
            </AlertNotificationRoot>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
  );
};

export default App;
