import styled, { createGlobalStyle } from 'styled-components';
import vaultImage from './resources/vault.jpg';

export const backgroundColor = `#1b2838`;
export const textColorCode = `230, 230, 230`;
export const textColor = `rgb(${textColorCode})`;
export const borderRadius = `0.5rem;`;
export const dropShadow = `0 0.33rem 0.67rem 0 black`;

export const scrollBar = `
  
  transition: color 1s ease-in-out 1s;
  color: rgba(${textColorCode}, 0);
  text-shadow: 0 0 ${textColor};

  &:hover{
    transition: color .5s ease-in-out;
    color: rgba(${textColorCode}, 1)}

  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    box-shadow: inset 0 0 0 10px;
  }

  ::-webkit-scrollbar-track{
    border-radius: 10px;
  }
  ::-webkit-scrollbar{
    border-radius: 10px;
    width: 5px;
    height: 5px;
  }
}
`;

export const StyledContainer = styled.div`
  background: ${backgroundColor};
  border-radius: ${borderRadius};
  box-shadow: ${dropShadow};
  margin: 0.5rem;
  padding: 0.75rem;
`;

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  ${scrollBar};
  scroll-behavior: smooth;
  text-size: 14px;
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
