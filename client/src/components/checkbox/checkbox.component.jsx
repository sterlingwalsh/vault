import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  * {
    cursor: pointer;
  }
`;

const Check = styled.input.attrs(props => ({
  type: 'checkbox'
}))``;

const Text = styled.span``;

const CheckBox = ({
  children,
  checked,
  onChange,
  ...otherProps
}) => {
  const ref = React.createRef();
  const handleTextClick = event => {
    ref.current.click();
  };
  return (
    <Container {...otherProps}>
      <span>
        <Check
          ref={ref}
          checked={checked}
          onChange={onChange}
        />
      </span>
      <Text onClick={handleTextClick}>{children}</Text>
    </Container>
  );
};

export default CheckBox;
