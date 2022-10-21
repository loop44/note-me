import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import LoginSvg from '../../assets/icons/log-in.svg';
import LeftSvg from '../../assets/images/left.svg';
import LogoSvg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import { InputBlock } from '../../components/Input';

import { AutorizationWrapper, LeftCol, RightCol } from './Autorization.elements';

type Inputs = {
  registerName: string;
  registerEmail: string;
  registerPass: string;
  loginEmail: string;
  loginPass: string;
};

const Autorization = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const onLoginSubmit: SubmitHandler<Inputs> = (data, e) => console.log('Login', data, e);
  const onRegisterSubmit: SubmitHandler<Inputs> = (data, e) => console.log('Register', data, e);

  const [loginLayout, setLoginLayout] = useState<boolean>(true);

  const changeFormLayout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoginLayout(!loginLayout);
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
                <button className="changeAuthMethod" onClick={changeFormLayout}>
                  Sign up
                </button>
                <Button green name="sign-in">
                  <img src={LoginSvg} alt="" />
                  <span>Sign in</span>
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
            ) : (
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
                <button className="changeAuthMethod" onClick={changeFormLayout}>
                  Sign ip
                </button>
                <Button green name="sign-up">
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
            )}
          </motion.div>
        </AnimatePresence>
      </RightCol>
    </AutorizationWrapper>
  );
};

export default Autorization;
