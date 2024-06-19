import axios from 'axios';
import { SERVER } from './constants';

export const signIn = async (username, password) => {
  try {
    localStorage.setItem('email', username);
    const response = await axios('/auth/sign-in', {
      method: 'POST',
      baseURL: SERVER,
      data: {
        Username: username,
        Password: password,
      },
    });
    if (response.data.statusCode == 401) {
      alert(response.data.body);
    }
    const {
      data: {
        AuthenticationResult,
        ChallengeName,
        Session,
        ChallengeParameters,
      },
    } = response;

    if (AuthenticationResult) {
      localStorage.setItem(
        'accessToken',
        AuthenticationResult.AccessToken || ''
      );
      localStorage.setItem('idToken', AuthenticationResult.IdToken || '');

      return AuthenticationResult;
    } else if (ChallengeName == 'NEW_PASSWORD_REQUIRED') {
      sessionStorage.setItem('Session', Session);
      sessionStorage.setItem('Username', username);
      sessionStorage.setItem('UserId', ChallengeParameters.USER_ID_FOR_SRP);
      return ChallengeName;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status == 401) {
      alert('Incorrect credentials. Try again');
      return 401;
    }
  }
};

export const changePassword = async (password) => {
  try {
    const response = await axios('/auth/reset-password', {
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
    const response = await axios('/auth/validate-auth-token', {
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
