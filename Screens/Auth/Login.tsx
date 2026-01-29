import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Typography from '@components/Core/Typography';
import { loginValidation } from '@validations/Auth';
import Input from '@components/Core/Input';
import Button from '@components/Core/Button';
import { Formik } from 'formik';
import { loginUser } from '@api/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import {
  login,
  setNotification,
  updateUser,
} from '@redux/Auth/authSlice';
import { ShowAlert } from '@components/ShowAlert';
import { ALERT_TYPE } from 'react-native-alert-notification';
import {
  addNotificationToken,
  getDropDownList,
  getProfileDetail,
} from '@api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDropDownItem } from '@redux/Common/dropDownSlice';
import ScreenLoader from '@components/ScreenLoader';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const onGooglePress = async () => {
    try {
      console.log('Google Press');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (values: FormValues) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      setLoading(true);
      const res = (await loginUser(payload)) as any;
      if (res && res.type === 1) {
        ShowAlert({ textBody: 'Incorrect Password', type: ALERT_TYPE.WARNING });
      } else if (res && !res.profile_setup) {
        dispatch(login(res));
        navigation.navigate('Setup');
      } else {
        const userData = (await getProfileDetail(res?.token)) as any;
        const getDropDownData = (await getDropDownList(res?.token)) as any;
        let fcmToken: any = await AsyncStorage.getItem('fcmToken');
        if (fcmToken) {
          const body = { notification_token: fcmToken };
          const data = (await addNotificationToken(body, res?.token!)) as any;
          dispatch(setNotification(data));
        }
        dispatch(login(res));
        dispatch(updateUser({ ...userData, profile_setup: true }));
        dispatch(addDropDownItem(getDropDownData));
        navigation.navigate('AppDrawer');
      }
    } catch (error: any) {
      ShowAlert({ textBody: error.message, type: ALERT_TYPE.DANGER });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top header image */}
        <View style={styles.headerSection}>
          <Image
            source={require('@assets/Images/login-top.png')}
            style={styles.topImage}
            resizeMode="cover"
          />
        </View>

        {/* Login form card */}
        <View style={styles.card}>
          <Typography
            color="Primary"
            style={[styles.title, { fontFamily: 'Georgia' }]}
          >
            Login Here!
          </Typography>
          <Typography style={styles.subtitle}>
            Glad to see you here again. Welcome!
          </Typography>

          <Formik
            validationSchema={loginValidation}
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.form}>
                <Input
                  label="Email Address"
                  placeholder="abcd123@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  hasError={Boolean(errors.email && touched.email)}
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                  value={values.email}
                  containerStyle={styles.inputContainer}
                />

                <Input
                  label="Password"
                  placeholder="Enter your password"
                  hasError={Boolean(errors.password && touched.password)}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  error={errors.password}
                  value={values.password}
                  secureTextEntry
                  containerStyle={styles.inputContainer}
                />

                <Typography
                  color="Secondary"
                  onPress={() => navigation.navigate('ForgetPassword')}
                  style={styles.forgotLink}
                >
                  Forgot Password ?
                </Typography>

                <Button
                  onPress={() => handleSubmit({} as any)}
                  variant="primary"
                  style={{
                    marginVertical: 12,
                    width: '100%',
                  }}
                >
                  Login
                </Button>
              </View>
            )}
          </Formik>

          <Typography style={styles.orText}>Or Continue with</Typography>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onGooglePress}
            style={styles.googleButton}
          >
            <Image
              source={require('@assets/Images/Icons/google.png')}
              style={styles.googleIcon}
            />
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Typography style={styles.signupLabel}>
              Don&apos;t have an Account?{' '}
            </Typography>
            <Typography
              onPress={() => navigation.navigate('Register')}
              style={styles.signupLink}
            >
              Signup
            </Typography>
          </View>
        </View>
      </ScrollView>

      <ScreenLoader open={loading} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    paddingTop: Platform.OS === 'ios' ? 24 : 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerSection: {
    width: '100%',
    height: heightPercentageToDP('28%'),
    minHeight: 200,
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    marginTop: -24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 4,
  },
  forgotLink: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 20,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E84A5F',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  orText: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  googleButton: {
    alignSelf: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signupLabel: {
    fontSize: 14,
    color: '#4B5563',
  },
  signupLink: {
    fontSize: 14,
    color: '#E84A5F',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  bottomSection: {
    width: '100%',
    height: heightPercentageToDP('22%'),
    minHeight: 160,
    marginTop: 24,
  },
  bottomImage: {
    width: '100%',
    height: '100%',
  },
});
