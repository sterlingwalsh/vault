import styled from 'styled-components';

const headerHeight = 48;

export const Body = styled.div`
  height: 100vh;
  .header {
    height: ${headerHeight + 'px'};
  }
`;

export const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - ${headerHeight + 'px'});
  overflow: hidden;

  > * {
    height: 100%;
  }
`;

export const FilterContainer = styled.aside``;
