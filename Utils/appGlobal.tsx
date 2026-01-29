export const BASE_URL = `https://dev-premierstaffingsolution-api.flynautstaging.com/api/v1/`;
export const BUILD_Media_URL = (name: string) =>
  name
    ? `https://delw8ygir1042.cloudfront.net/users/cmienybwy0003e0on6zl9mh3b/${name}`
    : 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
export const API_URLS = {
  singUp: 'user/sign-up',
  otp: 'user/verify-sign-up-otp',
  updateProfile: 'user/complete-profile',
  login: 'user/local-user-login',
  forgotPassword: 'user/forget-password-send-otp',
  resendOtp: 'user/signup/otp/resend',
  verifyOtpForPassword: 'user/verify-forget-password-otp',
  changePassword: 'user/change-password',
  editProfile: 'profile/edit',
  deleteUser: 'user/delete',
  dashboard: 'user/dashboard',
};
