import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  removeAddressFromLocal,
  removeUserFromLocal,
  saveUserAddress,
  saveUserToLocal,
} from './helper';
import { AuthUser, Notification, NotificationSettings, UserAddress } from '../../Types/index';

interface AuthStateType {
  token: string | null;
  isAuthenticated: boolean;
  profile_setup: boolean | false;
  user: AuthUser | null;
  address: UserAddress | null;
  notification: Notification | null;
  isAuthFlow: boolean | false;
  notificationSettings: NotificationSettings | null;
}

const initialState: AuthStateType = {
  token: null,
  user: null,
  isAuthenticated: false,
  profile_setup: false,
  address: null,
  notification: null,
  isAuthFlow: false,
  notificationSettings: null
};

const updateLocalStorage = (state: any) => {
  const { user, isAuthenticated } = state;
  if (isAuthenticated && user) {
    saveUserToLocal(state);
  } else {
    removeUserFromLocal();
  }
};

const updateLocalStorageAddress = (state: any) => {
  const { user, isAuthenticated, address } = state;
  if (isAuthenticated && user) {
    saveUserAddress(address);
  } else {
    removeAddressFromLocal();
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: any, action: PayloadAction<AuthUser>) => {
      const user: any = action.payload;
      state.user = user.user;
      state.isAuthenticated = true;
      state.token = user.token;
      state.profile_setup = user.profile_setup;
      saveUserToLocal(state);
    },
    updateUser: (state: any, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        const payload = action.payload;
        state.user = { ...state.user, ...payload };
        state.profile_setup = payload.profile_setup;
        updateLocalStorage(state);
      }
    },
    updateUserSettings: (state: any, action: PayloadAction<Partial<NotificationSettings>>) => {
      if (state.user) {
        const payload = action.payload;
        state.notificationSettings = { ...state.notificationSettings, ...payload };
      }
    },
    addUserAddress: (
      state: any,
      action: PayloadAction<Partial<UserAddress>>,
    ) => {
      state.address = action.payload;
      updateLocalStorageAddress(state);
    },
    authFlow: (
      state: any,
      action: PayloadAction<any>,
    ) => {
      state.isAuthFlow = action.payload?.auth;
      console.log(state.isAuthFlow, 'success');
    },
    setIsAuthenticated: (state: any, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      updateLocalStorage(state);
    },
    setNotification: (state: any, action: PayloadAction<Notification>) => {
      const payload = action.payload;
      state.notification = { ...state.notification, ...payload };
    },
    logout: (state: any) => {
      state.user = null;
      state.profile_setup = false;
      state.token = null;
      state.isAuthenticated = false;
      state.isAuthFlow = false;
      state.notification = null;
      removeUserFromLocal();
      removeAddressFromLocal();
    },
  },
});

export const { login, logout, setIsAuthenticated, updateUser, addUserAddress, setNotification, authFlow, updateUserSettings } =
  authSlice.actions;
export default authSlice.reducer;
