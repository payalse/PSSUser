import { Alert, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AuthTemplate from '@template/AuthTemplate';
import Typography from '@components/Core/Typography';
// @ts-ignore
import { forgetPasswordValidation } from '@validations';
import Input from '@components/Core/Input';
import Button from '@components/Core/Button';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Formik } from 'formik';
import { forgotPassword, loginUser } from '@api/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { login } from '@redux/Auth/authSlice';
import { ShowAlert } from '@components/ShowAlert';
import { ALERT_TYPE } from 'react-native-alert-notification';

type FormValues = {
  email: string;
};

const ForgetPassword = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const sendOtp = async (values: FormValues) => {
    const payload = {
      email: values.email,
    };

    try {
      setLoading(true);
      const res = (await forgotPassword(payload)) as any;
      ShowAlert({ textBody: 'Reset Password Otp sent successfully, Please check you email', type: ALERT_TYPE.SUCCESS});
      navigation.navigate('Verification', {
        screenType: 'ForgetPassword',
        email: payload.email
      });
    } catch (error: any) {
      ShowAlert({ textBody: error.message, type: ALERT_TYPE.DANGER });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthTemplate
      bottomImageStyle={{
        right: -60,
        bottom: -60,
      }}
      style={{
        marginTop: heightPercentageToDP('6%'),
      }}
      isLoading={loading}
    >
      <View
        style={{
          padding: 20,
          zIndex: 999999
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
          Forgot Password?
        </Typography>

        <Typography
          style={{
            fontSize: 14,
            opacity: 0.5,
            fontWeight: '500',
            marginTop: 2,
          }}
        >
          Enter your mail we will send you a Code
        </Typography>

        <Formik
          validationSchema={forgetPasswordValidation}
          initialValues={{
            email: '',
          }}
          onSubmit={sendOtp}
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
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                containerStyle={{
                  marginTop: 40,
                }}
                hasError={Boolean(errors.email && touched.email)}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                error={errors.email}
                value={values.email}
              />

              <Button
                onPress={handleSubmit}
                labelStyle={{
                  fontFamily: 'Georgia',
                  fontSize: 16,
                  textTransform: 'uppercase',
                }}
                style={{
                  marginVertical: 12,
                }}
              >
                Send Code
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
    </AuthTemplate>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({});
