import React from 'react';
import styled, { keyframes } from 'styled-components';
import { textColor, textColorCode, backgroundColor } from '../../global.styles';

const Container = styled.div``;
const ControlContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${textColor};
`;
const Input = styled.input.attrs(props => ({
  type: 'text'
}))`
  padding: 0.25rem;
  font-size: inherit;
  color: inherit;
  background: none;
  border: none;
  border-right: 1px solid rgba(${textColorCode}, 0.3);

  &:focus {
    outline: none;
  }
`;

const bounce = keyframes`
  from{
    transform: translateY(-3.5px) rotate(45deg);
  }
  to{
    transform: translateY(-.5px) rotate(45deg)
  }
`;

const Arrow = styled.div`
  content: '';
  width: 8px;
  height: 8px;
  border: solid ${textColor};
  border-width: 0 2px 2px 0;
  transform: translateY(-3.5px) rotate(45deg);
`;

const ArrowContainer = styled.div`
  height: 100%;
  width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover ${Arrow} {
    animation: ${bounce} 0.75s ease-in-out infinite;
    animation-direction: alternate;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  height: 0;
`;
const List = styled.div`
  background: ${backgroundColor};
  z-index: 99;
`;
const ListItem = styled.div``;

const items = ['item1', 'item2', 'item3', 'item4', 'item5'];

const DropDown = ({ ...otherProps }) => (
  <Container>
    <ControlContainer>
      <Input></Input>
      <ArrowContainer>
        <Arrow />
      </ArrowContainer>
    </ControlContainer>

    <ListContainer>
      <List>
        {items.map(item => (
          <ListItem>{`${item}`}</ListItem>
        ))}
      </List>
    </ListContainer>
  </Container>
);

export default DropDown;
