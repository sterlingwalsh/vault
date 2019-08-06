import { createGlobalStyle } from 'styled-components';

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
`;

export default GlobalStyle;

export const backgroundColor = `#1b2838`;
export const textColor = `rgb(230, 230, 230)`;
export const borderRadius = `0.5rem;`;
