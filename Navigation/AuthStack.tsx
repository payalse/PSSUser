import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '@screens/Auth/Login';
import Register from '@screens/Auth/Register';
import ForgetPassword from '@screens/Auth/ForgetPassword';
import ResetPassword from '@screens/Auth/ResetPassword';
import Verification from '@screens/Auth/Verification';
import Onboarding from '@screens/Auth/Onboarding';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
