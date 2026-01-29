import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AuthTemplate from '@template/AuthTemplate';
import Typography from '@components/Core/Typography';
// @ts-ignore
import { resetPasswordValidation } from '@validations';
import Input from '@components/Core/Input';
import Button from '@components/Core/Button';
import { Formik } from 'formik';
import { changePassword, forgotPassword, loginUser } from '@api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { ALERT_TYPE } from 'react-native-alert-notification';
import { ShowAlert } from '@components/ShowAlert';

type FormValues = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = ({ route }: any) => {
  const { token } = route.params;
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const resetPassword = async (values: FormValues) => {
    const payload = {
      newPassword: values.password,
      cPassword: values.confirmPassword,
    };

    try {
      setLoading(true);
      const res = (await changePassword(payload, token!)) as any;
      setVisible(true);
    } catch (error: any) {
      ShowAlert({ textBody: error.message, type: ALERT_TYPE.DANGER });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthTemplate isLoading={loading}>
      <View
        style={{
          padding: 20,
          zIndex: 999999,
        }}
      >
        <Typography
          color="Primary"
          style={{
            fontFamily: 'Georgia',
            fontSize: 24,
            marginTop: 16,
          }}
        >
          Change Password
        </Typography>

        <Typography
          style={{
            fontSize: 14,
            opacity: 0.5,
            fontWeight: '500',
            marginTop: 2,
          }}
        >
          Enter New Password and Confirm Password
        </Typography>

        <Formik
          validationSchema={resetPasswordValidation}
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          onSubmit={resetPassword}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
             
              <Input
                label="Enter New Password"
                placeholder="Enter your new password"
                keyboardType="default"
                hasError={Boolean(errors.password && touched.password)}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                error={errors.password}
                value={values.password}
                secureTextEntry={true}
              />

              <Input
                label="Confirm Password"
                placeholder="Enter your confirm password"
                keyboardType="default"
                hasError={Boolean(
                  errors.confirmPassword && touched.confirmPassword,
                )}
                onBlur={handleBlur('confirmPassword')}
                onChangeText={handleChange('confirmPassword')}
                error={errors.confirmPassword}
                value={values.confirmPassword}
                secureTextEntry={true}
              />

              <Button
                labelStyle={{
                  fontFamily: 'Georgia',
                  fontSize: 16,
                  textTransform: 'uppercase',
                }}
                style={{
                  marginVertical: 12,
                }}
                onPress={handleSubmit}
              >
                Set New Password
              </Button>
            </View>
          )}
        </Formik>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            zIndex: 2,
          }}
        >
          <Typography
            style={{
              fontWeight: 'bold',
            }}
          >
            Back to
          </Typography>
          <Typography
            onPress={() => {
              navigation.navigate('Register');
            }}
            color="Secondary"
            style={{
              marginLeft: 6,
              opacity: 0.5,
            }}
          >
            Signup page
          </Typography>
        </View>
      </View>
      <Modal transparent={true} animationType="slide" visible={visible}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            flex: 1,
            justifyContent: 'center', // Center vertically
            alignItems: 'center', // Center horizontally
          }}
        >
          <View
            style={{
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10, // Optional: to add rounded corners
            }}
          >
            {/* <FastImage
        source={require('../Assets/Videos/success.gif')}
        style={{ width: 160, height: 160, marginVertical: 'auto' }}
        resizeMode="contain"
      /> */}

            <Typography
              variant="body"
              style={{
                fontSize: 22,
                fontWeight: '700',
                marginTop: 2,
                textAlign: 'center',
                color: '#120B1C',
                fontFamily: 'Georgia',
              }}
            >
              Password Changed successfully
            </Typography>

            <Typography
              style={{
                fontSize: 12,
                opacity: 0.5,
                marginTop: 10,
                textAlign: 'center',
              }}
            >
              Your Password is successfully changed, go to login page and try
              the new password!
            </Typography>

            <Button
              labelStyle={{
                fontFamily: 'Georgia',
                fontSize: 14,
                width: '100%',
                textTransform: 'uppercase',
              }}
              style={{
                marginVertical: 16,
                width: '80%',
              }}
              onPress={() => {
                setVisible(false);
                navigation.navigate('Login');
              }}
            >
              Sign in now
            </Button>
          </View>
        </View>
      </Modal>
    </AuthTemplate>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
