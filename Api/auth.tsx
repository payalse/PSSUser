import { BASE_URL, API_URLS } from '@utils/appGlobal';

export const signUp = (user: any) => {
  const uri = `${BASE_URL}${API_URLS.singUp}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.data === null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data?.data.new_user);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const googleSignUp = (user: any) => {
  const uri = `${BASE_URL}${API_URLS.googleSignIn}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.data === null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data?.data.new_user);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const verifyOTP = (otp: any) => {
  const uri = `${BASE_URL}${API_URLS.otp}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(otp),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.data === null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const completeProfileData = (formData: FormData, token: string) => {
  const uri = `${BASE_URL}${API_URLS.updateProfile}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: formData,
      headers: {
        authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.data === null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};


export const loginUser = (user: any) => {
  const uri = `${BASE_URL}${API_URLS.login}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (!data || data.data === null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};


export const forgotPassword = (email: any) => {
  const uri = `${BASE_URL}${API_URLS.forgotPassword}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(email),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data === null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const resendOtp = (data: any) => {
  const uri = `${BASE_URL}${API_URLS.resendOtp}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data === null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const verifyOtpForPassword = (user: any) => {
  const uri = `${BASE_URL}${API_URLS.verifyOtpForPassword}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (!data?.data || data?.data == null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const changePassword = (user: any, token: string) => {
  const uri = `${BASE_URL}${API_URLS.changePassword}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        authorization: token,
       'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data === null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const addAddress = (address: any, token: string) => {
  const uri = `${BASE_URL}${API_URLS.addAddress}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(address),
      headers: {
        authorization: token,
       'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data === null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data?.data?.saved_address);
      })
      .catch(err => {
        reject(err);
      });
  });
};
