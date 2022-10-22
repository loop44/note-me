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

interface RegisterProps {
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
  onRegisterSubmit: (data: Inputs) => SubmitHandler<Inputs>;
  changeFormLayout: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Register: React.FC<RegisterProps> = ({
  errors,
  handleSubmit,
  register,
  onRegisterSubmit,
  changeFormLayout
}) => (
  <form onSubmit={handleSubmit(onRegisterSubmit)}>
    <img src={LogoSvg} alt="" />
    <InputBlock className={errors.registerName && 'error'}>
      <p>{errors.registerName ? errors.registerName?.message : 'Name'}</p>
      <input
        {...register('registerName', {
          required: 'Name is required',
          maxLength: {
            value: 20,
            message: 'Name must be lower than 20 characters'
          }
        })}
        placeholder="Type your name here"
        type="text"
      />
    </InputBlock>
    <InputBlock className={errors.registerEmail && 'error'}>
      <p>{errors.registerEmail ? errors.registerEmail?.message : 'Email'}</p>
      <input
        {...register('registerEmail', {
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
        placeholder="Type your email here"
        type="email"
      />
    </InputBlock>
    <InputBlock className={errors.registerPass && 'error'}>
      <p>{errors.registerPass ? errors.registerPass?.message : 'Password'}</p>
      <input
        {...register('registerPass', {
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
      Sign in
    </button>
    <Button green name="sign-up" type="submit">
      <img src={LoginSvg} alt="" />
      <span>Sign up</span>
    </Button>
    <div className="decoration">
      <span className="left" />
      <span className="main">or join anonymously</span>
      <span className="right" />
    </div>
    <Button name="anonymously">
      <img src={LoginSvg} alt="" />
      <span>Join anonymously</span>
    </Button>
  </form>
);

export default Register;
