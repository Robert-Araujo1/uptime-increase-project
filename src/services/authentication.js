import axios from 'axios';

const SERVER = 'http://localhost:5000/';

export const signIn = async (username, password) => {
  try {
    localStorage.setItem('email', username);
    const {
      data: {
        AuthenticationResult,
        ChallengeName,
        Session,
        ChallengeParameters: { USER_ID_FOR_SRP },
      },
    } = await axios('/login', {
      method: 'POST',
      baseURL: SERVER,
      data: {
        Username: username,
        Password: password,
      },
    });
    if (AuthenticationResult) {
      localStorage.setItem(
        'accessToken',
        AuthenticationResult.AccessToken || ''
      );

      return AuthenticationResult;
    } else if (ChallengeName == 'NEW_PASSWORD_REQUIRED') {
      sessionStorage.setItem('Session', Session);
      sessionStorage.setItem('Username', username);
      sessionStorage.setItem('UserId', USER_ID_FOR_SRP);
      return ChallengeName;
    }
    return response.data;
  } catch (error) {
    if (error.response.status == 401) {
      alert('Incorrect credentials. Try again');
      return 401;
    }
  }
};

export const changePassword = async (password) => {
  try {
    const response = await axios('/reset-password', {
      method: 'POST',
      baseURL: SERVER,
      data: {
        NewPassword: password,
        Username: sessionStorage.getItem('Username'),
        Session: sessionStorage.getItem('Session'),
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateToken = async (token) => {
  if (token === null) return;

  try {
    const response = await axios('/validate-token', {
      method: 'POST',
      baseURL: SERVER,
      data: {
        AccessToken: localStorage.getItem('accessToken'),
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error processing token: ', error);
  }
};
