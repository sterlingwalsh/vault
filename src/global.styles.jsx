import { createGlobalStyle } from 'styled-components';
import vaultImage from './resources/vault.jpg';

export const backgroundColor = `#1b2838`;
export const textColor = `rgb(230, 230, 230)`;
export const borderRadius = `0.5rem;`;
export const dropShadow = `0 0.33rem 0.67rem 0 black`;

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

body,
html {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

body {
  background-color: ${backgroundColor};
  background-image:url(${vaultImage});
  background-attachment: fixed;
  background-position-x: right;
  background-position-y: center;
  background-repeat: no-repeat;
}
`;

export default GlobalStyle;
