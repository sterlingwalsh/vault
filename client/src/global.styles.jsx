import styled, { createGlobalStyle } from 'styled-components';
import vaultImage from './resources/vault.jpg';

export const backgroundColorCode = `27, 40, 56`;
export const backgroundColor = `rgb(${backgroundColorCode})`;
export const textColorCode = `230, 230, 230`;
export const textColor = `rgb(${textColorCode})`;
export const borderRadius = `0.5rem;`;
export const dropShadow = `0 0.33rem 0.67rem 0 black`;

export const scrollBar = color => `

  &:hover{
    &::-webkit-scrollbar-thumb{
      background-color: rgba(${color}, 1);
    }
  }

  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    box-shadow: inset 0 0 0 10px;
    
    color: rgba(0,0,0,0);
    background-color: rgba(${color}, 0);
  }

  ::-webkit-scrollbar-track{
    border-radius: 10px;
  }
  ::-webkit-scrollbar{
    border-radius: 10px;
    width: 5px;
    height: 5px;
    transition: background-color 1s ease-in-out 1s;
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

export const StyledContainerInverted = styled.div`
  background: ${textColor};
  border-radius: ${borderRadius};
  box-shadow: ${dropShadow};
  ${scrollBar(backgroundColorCode)}
  margin: 0.5rem;
  padding: 0.75rem;
`;

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  color: ${textColor};
  scroll-behavior: smooth;
  font-size: 16px;
  ${scrollBar(textColorCode)};
  
  
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
