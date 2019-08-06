import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  * {
  }
`;

const Check = styled.input.attrs(props => ({
  type: 'checkbox'
}))``;

const Text = styled.span``;

const CheckBox = ({ children, ...otherProps }) => (
  <Container {...otherProps}>
    <span>
      <Check />
    </span>
    <Text>{children}</Text>
  </Container>
);

export default CheckBox;
