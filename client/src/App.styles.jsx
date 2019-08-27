import styled from 'styled-components';

const headerHeight = 48;

export const Body = styled.div`
  height: 100vh;
  .header {
    height: ${headerHeight + 'px'};
  }
`;

export const MainSection = styled.div`
  height: calc(100vh - ${headerHeight + 'px'});
`;
