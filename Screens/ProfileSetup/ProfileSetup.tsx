import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AuthTemplate from '@template/AuthTemplate';
import * as ImagePicker from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
//@ts-ignore
import { Color } from '@project-types/enum';
import Input from '@components/Core/Input';
import Button from '@components/Core/Button';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { authFlow, updateUser } from '@redux/Auth/authSlice';
import { Formik } from 'formik';
import { completeProfile } from '../../Validations';
import { completeProfileData } from '@api/auth';
import { ShowAlert } from '@components/ShowAlert';
import { ALERT_TYPE } from 'react-native-alert-notification';

const ProfileSetup = () => {
  const [data, setdata] = useState<any>({
    pfp: null,
  });
  const [isImageLoading, setisImageLoading] = useState(false);
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const { token, user } = useSelector((s: RootState) => s.auth);
  const {
    genderIdentity,
    racialIdentity,
    sexualOrientation,
    faith,
    whoAreYou,
  } = useSelector((s: RootState) => s.dropdown);
  const dispatch = useDispatch<AppDispatch>();

  type FormValues = {
    name: string;
    bio: string;
    date_of_birth: string;
    gender_identity: string;
    racial_identity: string;
    sexual_orientation: string;
    who_you_are: string;
    your_company: string;
    school: string;
    denomination: string;
    faith: string;
  };

  const profileSetup = async (values: FormValues) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('bio', values.bio);
    formData.append('gender_identity', values.gender_identity);
    formData.append('date_of_birth', values.date_of_birth);
    formData.append('racial_identity', values.racial_identity);
    formData.append('sexual_orientation', values.sexual_orientation);
    formData.append('who_you_are', values.who_you_are);
    formData.append('your_company', values.your_company);
    formData.append('school', values.school);
    formData.append('uid', user?._id);
    formData.append('denomination', values.denomination);
    formData.append('faith', values.faith);

    if (data && data.pfp) {
      const uri = data.pfp?.uri;
      const imgData = {
        uri: uri?.uri,
        name: uri?.fileName,
        type: uri?.type,
        fileSize: uri?.fileSize,
      };

      formData.append('profile_pic', imgData);
    }

    try {
      setLoading(true);
      const res = (await completeProfileData(formData, token!)) as any;
      ShowAlert({
        textBody: 'Profile Completed',
        type: ALERT_TYPE.SUCCESS,
      });
      dispatch(updateUser({ ...res.new_user_profile, profile_setup: true }));
      dispatch(authFlow({ auth: true }));
    } catch (error: any) {
      ShowAlert({
        textBody: error.message,
        type: ALERT_TYPE.DANGER,
      });
    } finally {
      setLoading(false);
      navigation.navigate('Address');
    }
  };

  const pickImage = () => {
    setisImageLoading(true);
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          ShowAlert({
            textBody: response.error,
            type: ALERT_TYPE.DANGER,
          });
        } else {
          const source: any = { uri: response.assets[0] };
          console.log(source);
          setdata({ ...data, pfp: source });
          setTimeout(() => {
            setisImageLoading(false);
          }, 1200);
        }
      },
    );
  };

  return (
    <AuthTemplate
      title="Complete Profile"
      style={{
        marginBottom: 80,
      }}
      showBack={true}
      isLoading={loading}
      showBackText={false}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          // marginBottom: 80,
          // paddingBottom: 80,
          zIndex: 120,
        }}
      >
        <View
          style={{
            padding: 20,
            zIndex: 120,
          }}
        >
          <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: '#fff',
              width: 128,
              height: 128,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              padding: 4,
              borderWidth: 1,
              borderColor: Color.Primary,
              position: 'relative',
            }}
          >
            {isImageLoading ? (
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 100,
                  backgroundColor: '#f0f0f0',
                }}
              />
            ) : (
              <View>
               
              </View>
            )}
            <TouchableOpacity
              onPress={pickImage}
              style={{
                position: 'absolute',
                bottom: 4,
                right: 4,
                padding: 8,
                backgroundColor: '#fff',
                borderRadius: 100,
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 5 },
                shadowOpacity: 0.1,
                shadowRadius: 15,
                elevation: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather
                onPress={pickImage}
                name="upload"
                size={18}
                color={Color.Primary}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          <Formik
            validationSchema={completeProfile}
            initialValues={{
              name: '',
              bio: '',
              date_of_birth: '',
              gender_identity: '',
              racial_identity: '',
              sexual_orientation: '',
              who_you_are: '',
              your_company: '',
              school: '',
              denomination: '',
              faith: '',
            }}
            onSubmit={profileSetup}
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
                  label="Name"
                  placeholder="Enter your name"
                  hasError={Boolean(errors.name && touched.name)}
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                  error={errors.name}
                  value={values.name}
                />
                <Input
                  label="Bio"
                  placeholder="Enter here"
                  multiline
                  numberOfLines={4}
                  hasError={Boolean(errors.bio && touched.bio)}
                  onBlur={handleBlur('bio')}
                  onChangeText={handleChange('bio')}
                  error={errors.bio}
                  value={values.bio}
                  type='text'
                />
                <Input
                  label="Date of birth"
                  placeholder="DD/MM/YYYY"
                  type="date"
                  hasError={Boolean(
                    errors.date_of_birth && touched.date_of_birth,
                  )}
                  onBlur={handleBlur('date_of_birth')}
                  onChangeText={handleChange('date_of_birth')}
                  error={errors.date_of_birth}
                  value={values.date_of_birth}
                />
                <Input
                  label="Gender Identity"
                  placeholder="Select here"
                  type="select"
                  options={genderIdentity}
                  hasError={Boolean(
                    errors.gender_identity && touched.gender_identity,
                  )}
                  onBlur={handleBlur('gender_identity')}
                  onChangeText={handleChange('gender_identity')}
                  error={errors.gender_identity}
                  value={values.gender_identity}
                />

                <Input
                  label="Racial Identity"
                  placeholder="Select here"
                  type="select"
                  options={racialIdentity}
                  hasError={Boolean(
                    errors.racial_identity && touched.racial_identity,
                  )}
                  onBlur={handleBlur('racial_identity')}
                  onChangeText={handleChange('racial_identity')}
                  error={errors.racial_identity}
                  value={values.racial_identity}
                />

                <Input
                  label="Sexual Orientation"
                  placeholder="Enter here"
                  type="select"
                  options={sexualOrientation}
                  hasError={Boolean(
                    errors.sexual_orientation && touched.sexual_orientation,
                  )}
                  onBlur={handleBlur('sexual_orientation')}
                  onChangeText={handleChange('sexual_orientation')}
                />

                <Input
                  label="Select who you are"
                  placeholder="Select here"
                  type="select"
                  options={whoAreYou}
                  hasError={Boolean(errors.who_you_are && touched.who_you_are)}
                  onBlur={handleBlur('who_you_are')}
                  onChangeText={handleChange('who_you_are')}
                />

                <Input
                  label="Faith"
                  placeholder="Select here"
                  type="select"
                  options={faith}
                  hasError={Boolean(errors.faith && touched.faith)}
                  onBlur={handleBlur('faith')}
                  onChangeText={handleChange('faith')}
                />

                <Input
                  label="Denomination"
                  placeholder="Denomination"
                  hasError={Boolean(
                    errors.denomination && touched.denomination,
                  )}
                  onBlur={handleBlur('denomination')}
                  onChangeText={handleChange('denomination')}
                />

                <Input
                  label="Your Company"
                  placeholder="Select here"
                  hasError={Boolean(
                    errors.your_company && touched.your_company,
                  )}
                  onBlur={handleBlur('your_company')}
                  onChangeText={handleChange('your_company')}
                />

                <Input
                  label="School"
                  placeholder="Select here"
                  hasError={Boolean(errors.school && touched.school)}
                  onBlur={handleBlur('school')}
                  onChangeText={handleChange('school')}
                />

                <Button
                  onPress={handleSubmit}
                  variant="royal"
                  style={{
                    marginVertical: 12,
                  }}
                >
                  Next
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </AuthTemplate>
  );
};

export default ProfileSetup;

const styles = StyleSheet.create({});
function skippedAddress(arg0: boolean): any {
  throw new Error('Function not implemented.');
}
