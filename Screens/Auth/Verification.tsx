import { Alert, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import AuthTemplate from '@template/AuthTemplate';
import Typography from '@components/Core/Typography';
import { useNavigation } from '@react-navigation/native';
import Button from '@components/Core/Button';
import OTPInput from '@components/OtpInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
//@ts-ignore
import { Color } from '@project-types/enum';
import { AuthUser } from '@project-types/index';
import { resendOtp, verifyOTP, verifyOtpForPassword } from '@api/auth';
import { login, setNotification, updateUserSettings } from '@redux/Auth/authSlice';
import { AppDispatch } from '@redux/store';
import { useDispatch } from 'react-redux';
import { ShowAlert } from '@components/ShowAlert';
import { ALERT_TYPE } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addNotificationToken, getDropDownList, getUserSettingsData } from '@api/user';
import { addDropDownItem } from '@redux/Common/dropDownSlice';

const Verification = ({ route }: any) => {
  const { screenType, email, _id } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setotp] = useState('');
  const [otpValue, setotpValue] = useState(['', '', '', '']);
 

  const handleVerify = async () => {
    if (!otp) {
      ShowAlert({
        textBody: 'Please Enter the valid Code',
        type: ALERT_TYPE.DANGER,
      });
      return;
    }
    try {
      setLoading(true);
      if (screenType && screenType === 'Register') {
        verifyOtpForRegister();
      }
      if (screenType && screenType === 'ForgetPassword') {
        verifyOtpForgotPassword();
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpForRegister = async () => {
    try {
      setLoading(true);
      const payload = {
        refId: _id,
        otp: otp,
      };
      const res = (await verifyOTP(payload)) as any;
      let fcmToken: any = await AsyncStorage.getItem('fcmToken');

      if (fcmToken) {
        const body = {
          notification_token: fcmToken,
        };
        const data = (await addNotificationToken(body, res?.token!)) as any;
        console.log(data);
        dispatch(setNotification(data));
      }
      const getDropDownData = (await getDropDownList(res?.token)) as any;
      console.log(res?.token, 'token')
      const getNotificationSettings = (await getUserSettingsData(res?.token)) as any;
      dispatch(addDropDownItem(getDropDownData));
      dispatch(login(res));
      dispatch(updateUserSettings(getNotificationSettings));
      ShowAlert({
        textBody: 'Otp verified successfully',
        type: ALERT_TYPE.SUCCESS,
      });
      navigation.navigate('Setup');
    } catch (error: any) {
      console.log('opt error')
      ShowAlert({
        textBody: error?.message,
        type: ALERT_TYPE.DANGER,
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpForgotPassword = async () => {
    try {
      if (!email) return;
      setLoading(true);
      const payload = {
        email: email,
        otp: otp,
      };
      const res = (await verifyOtpForPassword(payload)) as any;
      ShowAlert({
        textBody: 'Otp verified successfully',
        type: ALERT_TYPE.SUCCESS,
      });
      navigation.navigate('ResetPassword', {
        token: res?.token
      });
    } catch (error: any) {
      ShowAlert({
        textBody: error?.message,
        type: ALERT_TYPE.DANGER,
      });
    } finally {
      setLoading(false);
    }
  };

  const onResendOtp = async () => {
    try {
      setLoading(true);
      const data = {
        email: email,
      };
      const res = (await resendOtp(data)) as any;
      console.log(res);
      ShowAlert({
        textBody: 'OTP resent successfully',
        type: ALERT_TYPE.SUCCESS,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeText = (text: string, index: number) => {
    const newValues = [...otpValue];
    newValues[index] = text;
    setotpValue(newValues);
    setotp(newValues.join(''));
  };

  return (
    <AuthTemplate
      bottomImageStyle={{
        right: -60,
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
          Enter Verification Code
        </Typography>

        <Typography
          style={{
            fontSize: 14,
            opacity: 0.5,
            fontWeight: '500',
            marginTop: 2,
          }}
        >
          We have sent a verification code to your email
        </Typography>

        <View>
          <OTPInput
            value={otpValue}
            onChangeText={handleChangeText}
            onPress={onResendOtp}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            color="Primary"
            onPress={() => {
              if (screenType && screenType === 'Register') {
                navigation.navigate('Register');
              } else {
                navigation.navigate('ForgetPassword');
              }
            }}
            style={{
              fontWeight: 'bold',
              marginLeft: 20,
            }}
          >
            Change Email
          </Typography>
          <Button
            onPress={handleVerify}
            showIconShadow={false}
            variant="icon"
            style={{
              alignSelf: 'flex-end',
              width: 52,
              height: 52,
              backgroundColor: '#ffe20a',
            }}
          >
            <AntDesign name="arrowright" size={22} color={Color.Tertiary} />
          </Button>
        </View>
      </View>
    </AuthTemplate>
  );
};

export default Verification;

const styles = StyleSheet.create({});
