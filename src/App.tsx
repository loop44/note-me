import axios from 'axios';
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

import axiosInctance from './api/axios';
import Autorization from './pages/Autorization';
import Notes from './pages/Notes';
import { AuthParams } from './types/types';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font: inherit;
  }

  html,
  body {
    font-family: 'Ubuntu', sans-serif;
    height: 100%;
  }

  #root {
    height: 100%;
  }
`;

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const fetchLogin = async (params: AuthParams) => {
    try {
      const { data } = await axiosInctance.post('/users/login', params);

      if (data.token) {
        window.localStorage.setItem('note-me-token', data.token);
        setIsAuth(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.msg);
      } else {
        setError('Oops! Something went wrong. Try again later');
      }
    }
  };

  const fetchRegister = async (params: AuthParams) => {
    try {
      const { data } = await axiosInctance.post('/users/register', params);
      if (data.token) {
        window.localStorage.setItem('note-me-token', data.token);
        setIsAuth(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.msg);
      } else {
        setError('Oops! Something went wrong. Try again later');
      }
    }
  };

  const closeError = () => {
    setError(null);
  };

  const fetchAuthMe = async () => {
    const { data } = await axiosInctance.get('/users/verify');
    return data;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await fetchAuthMe();
      if (auth) {
        setIsAuth(true);
      }
    };

    checkAuth();
  }, []);

  const logOut = () => {
    localStorage.removeItem('note-me-token');
    setIsAuth(false);
  };

  return (
    <>
      <GlobalStyle />
      {isAuth ? (
        <Notes logOut={logOut} />
      ) : (
        <Autorization
          fetchLogin={fetchLogin}
          fetchRegister={fetchRegister}
          error={error}
          closeError={closeError}
        />
      )}
    </>
  );
};

export default App;
