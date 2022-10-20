import { createGlobalStyle } from 'styled-components';

import LoginSvg from './assets/icons/log-in.svg';
import { Button } from './components/Button';
import { InputBlock } from './components/Input';

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
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <Button green>
      <img src={LoginSvg} alt="" />
      <span>Sign in</span>
    </Button>
    <Button>
      <img src={LoginSvg} alt="" />
      <span>Join anonymously</span>
    </Button>

    <InputBlock>
      <p>Login</p>
      <input placeholder="Type your login here" type="text" />
    </InputBlock>

    <InputBlock className="error">
      <p>Register</p>
      <input placeholder="Type your password here" type="password" />
    </InputBlock>
  </>
);

export default App;
