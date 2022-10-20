import LoginSvg from '../../assets/icons/log-in.svg';
import LeftSvg from '../../assets/images/left.svg';
import LogoSvg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import { InputBlock } from '../../components/Input';

import { AutorizationWrapper, LeftCol, RightCol } from './Autorization.elements';

const Autorization = () => (
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
        <img src={LogoSvg} alt="" />
        <InputBlock>
          <p>Login</p>
          <input placeholder="Type your login here" type="text" />
        </InputBlock>
        <InputBlock>
          <p>Password</p>
          <input placeholder="Type your password here" type="password" />
        </InputBlock>
        <button className="changeAuthMethod">Sign up</button>
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
      </form>
    </RightCol>
  </AutorizationWrapper>
);

export default Autorization;
