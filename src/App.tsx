import { createGlobalStyle } from 'styled-components';

import Autorization from './pages/Autorization/Autorization';

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
    <Autorization />
  </>
);

export default App;
