import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import authReducer from './Auth/authSlice';
import dropdownReducer from './Common/dropdownSlice';

const logger = createLogger({});

const store = configureStore({
  reducer: {
    auth: authReducer,
    dropdown: dropdownReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
