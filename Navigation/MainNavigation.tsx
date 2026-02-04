import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import SetupStack from './SetupStack';
import Home from '@screens/Main/Home';

const Stack = createStackNavigator();

const MainNavigation = () => {
  const { isAuthenticated, user, address, isAuthFlow } = useSelector(
    (s: RootState) => s.auth,
  );

  // Determine initial route based on auth state
  const getInitialRouteName = () => {
    if (!isAuthenticated) return 'Auth';
    if (!user?.profile_setup) return 'Setup';
    return 'Home';
  };

  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Setup" component={SetupStack} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
