import { Modal, StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AuthTemplate from '@template/AuthTemplate';
import Typography from '@components/Core/Typography';
// @ts-ignore
import { resetPasswordValidation } from '@validations';
import Input from '@components/Core/Input';
import Button from '@components/Core/Button';
import { Formik, FormikHelpers } from 'formik';
import { changePassword } from '@api/auth';
import { ALERT_TYPE } from 'react-native-alert-notification';
import { ShowAlert } from '@components/ShowAlert';

type FormValues = {
  password: string;
  confirmPassword: string;
};

type ResetPasswordScreenProps = {
  route: { params?: { token?: string } };
};

const ResetPassword = ({ route }: ResetPasswordScreenProps) => {
  const { token } = route.params ?? {};
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const handleResetPassword = async (
    values: FormValues,
    _helpers: FormikHelpers<FormValues>,
  ) => {
    const payload = {
      newPassword: values.password,
      cPassword: values.confirmPassword,
    };

    if (!token) return;
    try {
      setLoading(true);
      await changePassword(payload, token);
      setVisible(true);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      ShowAlert({ textBody: message, type: ALERT_TYPE.DANGER });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>ResetPassword</Text>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
