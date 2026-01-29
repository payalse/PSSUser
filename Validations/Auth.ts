import * as yup from 'yup';

export const loginValidation = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const registrationValidation = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required').oneOf([yup.ref('confirmPassword'), ''], 'Passwords must match'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const forgetPasswordValidation = yup.object().shape({
  email: yup.string().email().required('Email is required'),
});

export const resetPasswordValidation = yup.object().shape({
  password: yup.string().required('Password is required').oneOf([yup.ref('confirmPassword'), ''], 'Passwords must match'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const otpValidation = yup.object().shape({
  otp: yup.string().required('OTP is required'),
});

export const completeProfile = yup.object().shape({
  name: yup.string().min(4, ({min}) => `Name must be at least ${min} characters`)
  .required('Required')
  .required('Name is Required!'),
  bio: yup.string(),
  date_of_birth: yup.string()
  .required('Required')
  .required('Birthday is Required!'),
  gender_identity: yup.string()
  .required('Required')
  .required('Please select a gender identity'),
  racial_identity: yup.string(),
  sexual_orientation: yup.string().min(5, ({min}) => `Sexual orientation must be at least ${min} characters`),
  who_you_are: yup.string(),
  your_company: yup.string(),
  school: yup.string(),
  denomination: yup.string(),
  faith: yup.string(),
});

export const completeProfileAddress = yup.object().shape({
  address: yup.string().min(8, ({min}) => `Address must be at least ${min} characters`)
  .required('Required')
  .required('Name is Required!'),
  city: yup.string()
  .required('Required')
  .required('City is Required!'),
  state: yup.string()
  .required('Required')
  .required('Please select a city'),
  country: yup.string()
  .required('Required')
  .required('Please select a country'),
  zip_code: yup.string()
  .required('Required').min(5, ({min}) => `Address must be at least ${min} characters`).max(10, ({max}) => `Address must be at max ${max} characters`)
  .required('Zipcode is Required!'),
});

export const changePasswordValidation = yup.object().shape({
  currentPassword: yup.string().required('Password is required'),
  newPassword: yup.string().required('Password is required').oneOf([yup.ref('cPassword'), ''], 'Passwords must match'),
  cPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const addSchedule = yup.object().shape({
  title: yup.string().min(3, ({min}) => `Title must be at least ${min} characters`)
  .required('Required')
  .required('Title is Required!'),
  description: yup.string().min(8, ({min}) => `Description must be at least ${min} characters`)
  .required('Required')
  .required('Description is Required!'),
  date: yup.string()
  .required('Required')
  .required('Please add a valid date'),
  time: yup.string()
  .required('Required')
  .required('Please add a start time'),
  remind_me: yup.boolean()
  .required('Required'),
});
