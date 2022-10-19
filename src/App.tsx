import { createGlobalStyle } from 'styled-components';

import LoginSvg from './assets/icons/log-in.svg';
import { Button } from './components/Button';

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
  </>
);

export default App;
