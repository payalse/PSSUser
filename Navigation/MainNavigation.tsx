import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import SetupStack from './SetupStack';
import Home from '@screens/Main/Home';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const { isAuthenticated, user, address, isAuthFlow } = useSelector(
    (s: RootState) => s.auth,
  );
  console.log(user?.profile_setup, isAuthFlow);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="Setup" component={SetupStack} />
        </>
      ) : (
        <>
          {!user?.profile_setup ? (
            <Stack.Screen name="Setup" component={SetupStack} />
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigation;
