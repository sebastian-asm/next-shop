import { useReducer, useEffect } from 'react';

import { isAxiosError } from 'axios';
import Cookies from 'js-cookie';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { IUser } from '../../interfaces';
import { shopApi } from '../../api';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, []);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await shopApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookies.set('token', token);

      dispatch({
        type: '[Auth] - Login',
        payload: user,
      });

      return true;
    } catch {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await shopApi.post('/user/register', {
        email,
        password,
        name,
      });
      const { token, user } = data;
      Cookies.set('token', token);

      dispatch({
        type: '[Auth] - Login',
        payload: user,
      });

      return {
        hasError: false,
      };
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.msg,
        };
      }
      return {
        hasError: true,
        message: 'Hubo un error al crear la cuenta',
      };
    }
  };

  const checkToken = async () => {
    try {
      const { data } = await shopApi.get('/user/validate-token');
      const { token, user } = data;
      Cookies.set('token', token);

      dispatch({
        type: '[Auth] - Login',
        payload: user,
      });
    } catch {
      Cookies.remove('token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
