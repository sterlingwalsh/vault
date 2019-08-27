import styled from 'styled-components';
import { textColor, StyledContainer } from '../../../global.styles';

export const FilterContainer = styled(StyledContainer)`
  height: 90vh;
  display: flex;
  flex-direction: column;
`;

export const FilterCategory = styled.div`
  margin: 0.5rem 0rem;
  display: flex;
  flex-direction: column;
  min-height: 0px;
  flex-basis: 0px;
  flex-grow: 1;
  max-height: fit-content;

  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }

  * {
    white-space: nowrap;
  }
`;

export const FilterScrollContainer = styled.div`
  padding-left: 0.5rem;
  border-top: 1px solid ${textColor};
  overflow-y: auto;
`;

export const CheckBoxContainer = styled.div`
  padding: 0.1rem 0;
`;
