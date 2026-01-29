import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthUser, UserAddress } from '../../Types/index';

// Utility function to handle AsyncStorage operations with error handling
const handleAsyncStorage = async (operation: Promise<any>, action: string) => {
  try {
    return await operation;
  } catch (error) {
    console.error(`Failed to ${action}:`, error);
    return null;
  }
};

export const saveUserToLocal = async (user: AuthUser) => {
  await handleAsyncStorage(
    AsyncStorage.setItem('AUTH', JSON.stringify(user)),
    'save user to local storage',
  );
};

export const getUserFromLocal = async (): Promise<AuthUser | null> => {
  const user = await handleAsyncStorage(
    AsyncStorage.getItem('AUTH'),
    'get user from local storage',
  );
  return user ? JSON.parse(user) : null;
};

export const removeUserFromLocal = async () => {
  await handleAsyncStorage(
    AsyncStorage.removeItem('AUTH'),
    'remove user from local storage',
  );
};

export const saveUserAddress = async (user: UserAddress) => {
  await handleAsyncStorage(
    AsyncStorage.setItem('Address', JSON.stringify(user)),
    'save user to local storage',
  );
};

export const getUserAddress = async (): Promise<UserAddress | null> => {
  const user = await handleAsyncStorage(
    AsyncStorage.getItem('Address'),
    'get user from local storage',
  );
  return user ? JSON.parse(user) : null;
};

export const removeAddressFromLocal = async () => {
  await handleAsyncStorage(
    AsyncStorage.removeItem('Address'),
    'remove user from local storage',
  );
};
