import React from 'react';
import {
  FieldErrorsImpl,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister
} from 'react-hook-form';

import LoginSvg from '../assets/icons/log-in.svg';
import LogoSvg from '../assets/images/logo.svg';
import { Inputs } from '../types/types';

import { Button } from './Button';
import { InputBlock } from './Input';

interface LoginProps {
  errors: Partial<
    FieldErrorsImpl<{
      registerName: string;
      registerEmail: string;
      registerPass: string;
      loginEmail: string;
      loginPass: string;
    }>
  >;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  register: UseFormRegister<Inputs>;
  onLoginSubmit: (data: Inputs) => SubmitHandler<Inputs>;
  changeFormLayout: (e: React.MouseEvent<HTMLButtonElement>) => void;
  joinAnonymously: () => void;
}

const Login: React.FC<LoginProps> = ({
  errors,
  handleSubmit,
  register,
  onLoginSubmit,
  changeFormLayout,
  joinAnonymously
}) => (
  <form onSubmit={handleSubmit(onLoginSubmit)}>
    <img src={LogoSvg} alt="" />
    <InputBlock className={errors.loginEmail && 'error'}>
      <p>{errors.loginEmail ? errors.loginEmail?.message : 'Login'}</p>
      <input
        {...register('loginEmail', {
          required: 'Login is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Entered value does not match email format'
          },
          maxLength: {
            value: 60,
            message: 'Email must be lower than 60 characters'
          }
        })}
        placeholder="Type your login here"
        type="email"
      />
    </InputBlock>
    <InputBlock className={errors.loginPass && 'error'}>
      <p>{errors.loginPass ? errors.loginPass?.message : 'Password'}</p>
      <input
        {...register('loginPass', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be greater than 8 characters'
          },
          maxLength: {
            value: 20,
            message: 'Password must be lower than 20 characters'
          }
        })}
        placeholder="Type your password here"
        type="password"
      />
    </InputBlock>
    <button className="changeAuthMethod" onClick={changeFormLayout} type="button">
      Sign up
    </button>
    <Button green name="sign-in" type="submit">
      <img src={LoginSvg} alt="" />
      <span>Sign in</span>
    </Button>
    <div className="decoration">
      <span className="left" />
      <span className="main">or join anonymously</span>
      <span className="right" />
    </div>
    <Button
      name="anonymously"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        joinAnonymously();
      }}
    >
      <img src={LoginSvg} alt="" />
      <span>Join anonymously</span>
    </Button>
  </form>
);

export default Login;
