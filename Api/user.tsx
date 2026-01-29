import { BASE_URL, API_URLS } from '@utils/appGlobal';

export const editUserProfile = (formData: FormData, token: string) => {
  const uri = `${BASE_URL}${API_URLS.editProfile}`;
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
        resolve(data.data?.updated_user);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const editAddress = (address: any, token: string) => {
  const uri = `${BASE_URL}${API_URLS.editAddress}`;
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
        if (data === null || data?.data === null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data.data?.updated_address);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const editUserPassword = (address: any, token: string) => {
  const uri = `${BASE_URL}${API_URLS.editPassword}`;
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
        if (data === null) {
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

export const deleteUserAccount = (token: string) => {
  const uri = `${BASE_URL}${API_URLS.deleteUser}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
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
        resolve(data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getProfileDetail = (token: string) => {
  const uri = `${BASE_URL}${API_URLS.userProfile}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'GET',
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
        resolve(data.data?.profile);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getProfileAddress = (token: string) => {
  const uri = `${BASE_URL}${API_URLS.userAddress}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'GET',
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
        resolve(data.data?.address);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getMyCertificate = (limit: number, page: number, token: any) => {
  const uri = `${BASE_URL}${API_URLS.userCertificate}?limit=${limit}&page=${page}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'GET',
      headers: {
        authorization: token,
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
        resolve(data?.data.ongoingCourses);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const sendUserFeedback = (payload: any, token: any) => {
  console.log(token);
  const uri = `${BASE_URL}${API_URLS.sendFeedback}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.data === null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data?.data?.feedback);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const addNotificationToken = (payload: any, token: any) => {
  console.log(token);
  const uri = `${BASE_URL}${API_URLS.saveNotificationToken}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.data === null) {
          throw new Error(
            data.message || data.error || 'something went wrong!',
          );
        }
        resolve(data?.data?.userSetting);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getNotifications = (token: any) => {
  const uri = `${BASE_URL}${API_URLS.getNotification}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'GET',
      headers: {
        authorization: token,
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
        resolve(data?.data.notifications);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getDropDownList = (token: any) => {
  const uri = `${BASE_URL}${API_URLS.dropdown}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'GET',
      headers: {
        authorization: token,
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
        let values: any = [];
        if (data?.data?.dropdownItems.length)
          data?.data?.dropdownItems.forEach((element: any) => {
            values.push({
              ...element,
              value: element?.spelling,
              label: element?.spelling.charAt(0).toUpperCase() + element?.spelling.slice(1),
            });
          });
        resolve(values);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const userSettings = (token: string, payload: any) => {
  const uri = `${BASE_URL}${API_URLS.deleteUser}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(payload),
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
        resolve(data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const updateNotificationSetting = (token: string, payload: any) => {
  const uri = `${BASE_URL}${API_URLS.notificationSetting}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'PUT',
      body: JSON.stringify(payload),
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
        resolve(data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getUserSettingsData = (token: any) => {
  const uri = `${BASE_URL}${API_URLS.getNotificationSetting}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: 'GET',
      headers: {
        authorization: token,
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
