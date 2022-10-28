import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import closeSvg from '../../assets/icons/close.svg';
import LeftSvg from '../../assets/images/left.svg';
import Login from '../../components/Login';
import Register from '../../components/Register';
import { AuthParams, Inputs } from '../../types/types';

import { AutorizationWrapper, Error, LeftCol, RightCol } from './Autorization.elements';

interface AutorazationProps {
  fetchLogin: (params: AuthParams) => void;
  fetchRegister: (params: AuthParams) => void;
  closeError: () => void;
  joinAnonymously: () => void;
  error: null | string;
}

const Autorization: React.FC<AutorazationProps> = ({
  fetchLogin,
  fetchRegister,
  error,
  closeError,
  joinAnonymously
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const [loginLayout, setLoginLayout] = useState<boolean>(true);

  const onLoginSubmit: SubmitHandler<Inputs> = (data) => {
    const values = {
      email: data.loginEmail,
      password: String(data.loginPass)
    };
    fetchLogin(values);
  };

  const onRegisterSubmit: SubmitHandler<Inputs> = (data) => {
    const values = {
      username: data.registerName,
      email: data.registerEmail,
      password: data.registerPass
    };
    fetchRegister(values);
  };

  const changeFormLayout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoginLayout(!loginLayout);
    closeError();
  };

  return (
    <AutorizationWrapper>
      <LeftCol>
        <div>
          <img src={LeftSvg} alt="" />
          <h1>Keep life simple</h1>
          <p>
            Store all your notes in a simple and intuitive app that helps you enjoy what is most
            important in life.
          </p>
        </div>
      </LeftCol>
      <RightCol>
        <AnimatePresence mode="wait">
          <motion.div
            key={Number(loginLayout)}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="formContent"
          >
            {loginLayout ? (
              <Login
                errors={errors}
                handleSubmit={handleSubmit}
                register={register}
                onLoginSubmit={onLoginSubmit}
                changeFormLayout={changeFormLayout}
                joinAnonymously={joinAnonymously}
              />
            ) : (
              <Register
                errors={errors}
                handleSubmit={handleSubmit}
                register={register}
                onRegisterSubmit={onRegisterSubmit}
                changeFormLayout={changeFormLayout}
                joinAnonymously={joinAnonymously}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </RightCol>
      <AnimatePresence mode="wait">
        {error && (
          <Error
            as={motion.div}
            initial={{ y: '-5rem' }}
            animate={{ y: '1.563rem' }}
            exit={{ y: '-5rem' }}
          >
            <div>
              <span>{error}</span>
              <input type="image" src={closeSvg} alt="" onClick={closeError} />
            </div>
          </Error>
        )}
      </AnimatePresence>
    </AutorizationWrapper>
  );
};

export default Autorization;
