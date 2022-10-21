import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import LoginSvg from '../../assets/icons/log-in.svg';
import LeftSvg from '../../assets/images/left.svg';
import LogoSvg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import { InputBlock } from '../../components/Input';

import { AutorizationWrapper, LeftCol, RightCol } from './Autorization.elements';

const Autorization = () => {
  const [loginLayout, setLoginLayout] = useState<boolean>(true);

  const changeFormLayout = (e: any) => {
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
        <form>
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
                <>
                  <img src={LogoSvg} alt="" />
                  <InputBlock>
                    <p>Login</p>
                    <input placeholder="Type your login here" type="text" />
                  </InputBlock>
                  <InputBlock>
                    <p>Password</p>
                    <input placeholder="Type your password here" type="password" />
                  </InputBlock>
                  <button className="changeAuthMethod" onClick={changeFormLayout}>
                    Sign up
                  </button>
                  <Button green>
                    <img src={LoginSvg} alt="" />
                    <span>Sign in</span>
                  </Button>
                  <div className="decoration">
                    <span className="left" />
                    <span className="main">or join anonymously</span>
                    <span className="right" />
                  </div>
                  <Button>
                    <img src={LoginSvg} alt="" />
                    <span>Join anonymously</span>
                  </Button>
                </>
              ) : (
                <>
                  <img src={LogoSvg} alt="" />
                  <InputBlock>
                    <p>Name</p>
                    <input placeholder="Type your name here" type="text" />
                  </InputBlock>
                  <InputBlock>
                    <p>Email</p>
                    <input placeholder="Type your email here" type="text" />
                  </InputBlock>
                  <InputBlock>
                    <p>Password</p>
                    <input placeholder="Type your password here" type="password" />
                  </InputBlock>
                  <button className="changeAuthMethod" onClick={changeFormLayout}>
                    Sign up
                  </button>
                  <Button green>
                    <img src={LoginSvg} alt="" />
                    <span>Sign in</span>
                  </Button>
                  <div className="decoration">
                    <span className="left" />
                    <span className="main">or join anonymously</span>
                    <span className="right" />
                  </div>
                  <Button>
                    <img src={LoginSvg} alt="" />
                    <span>Join anonymously</span>
                  </Button>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </form>
      </RightCol>
    </AutorizationWrapper>
  );
};

export default Autorization;
