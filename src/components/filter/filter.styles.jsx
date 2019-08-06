import styled from 'styled-components';
import { backgroundColor, borderRadius, textColor } from '../../global.styles';

export const FilterContainer = styled.div`
  margin: 0.5rem;
  background: ${backgroundColor};
  border-radius: ${borderRadius};
  color: ${textColor};
  height: 150vh;
  display: flex;
  flex-direction: column;
`;

export const FilterCategory = styled.div`
  margin: 0.5rem;
  padding-top: -0.5em;
  flex: 0 1 0px;
  display: flex;
  flex-direction: column;
`;

export const FilterScrollContainer = styled.div`
  padding-left: 0.5rem;
  border-top: 1px solid ${textColor};
  overflow-y: auto;
`;

export const CheckBoxContainer = styled.div``;
