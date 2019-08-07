import styled from 'styled-components';
import {
  backgroundColor,
  borderRadius,
  textColor,
  dropShadow
} from '../../global.styles';

export const FilterContainer = styled.div`
  margin: 0.5rem;
  background: ${backgroundColor};
  border-radius: ${borderRadius};
  color: ${textColor};
  height: 90vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  box-shadow: ${dropShadow};
`;

export const FilterCategory = styled.div`
  margin: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  min-height: 0px;
  flex-basis: 0px;
  flex-grow: 1;
  max-height: fit-content;

  &:first-of-type {
    margin-top: 0.5rem;
  }
  &:last-of-type {
    margin-bottom: 0.5rem;
  }

  * {
    white-space: nowrap;
  }
`;

export const FilterScrollContainer = styled.div`
  padding-left: 0.5rem;
  border-top: 1px solid ${textColor};
  overflow-y: auto;
  box-shadow: inset 0 -10px 10px 0px ${backgroundColor};
`;

export const CheckBoxContainer = styled.div`
  padding: 0.1rem 0;
`;
