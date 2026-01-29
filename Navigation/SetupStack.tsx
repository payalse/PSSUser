import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProfileSetup from '@screens/ProfileSetup/ProfileSetup';

const Stack = createNativeStackNavigator();

const SetupStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
    </Stack.Navigator>
  );
};

export default SetupStack;
