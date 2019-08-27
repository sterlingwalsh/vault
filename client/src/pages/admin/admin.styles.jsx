import styled from 'styled-components';

export const AdminContainer = styled.section`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100%;

  .admin-control-panel {
    flex-grow: 0;
  }

  .admin-inventory {
    flex-grow: 1;
  }
`;
