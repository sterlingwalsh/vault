import React from 'react';
import styled from 'styled-components';

import { textColor } from '../../global.styles';

const CheckBox = styled.input.attrs(props => ({
  type: 'checkbox'
}))`
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const Check = styled.span`
  &:after {
    position: absolute
    content: '';
    opacity: 0;
    left: 5px;
    width: 5px;
    height: 12px;
    border: solid ${textColor};
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

const CheckContainer = styled.span`
  position: relative;
  cursor: pointer;
  margin-right: 0.5rem;
  width: 18px;
  height: 18px;
  border-bottom: 1px solid ${textColor};
  flex-grow: 0;

  > * {
    position: absolute;
  }
  ${CheckBox}:checked ~ ${Check}:after {
    opacity: 1;
  }
`;

const Text = styled.span`
  cursor: pointer;
  flex-grow: 1;
`;

const ComponentContainer = styled.div`
  display: flex;
  align-items: center;
  &:hover ${Check}:after {
    opacity: 0.3;
  }
`;

const CheckBoxComponent = ({
  data = {},
  children,
  checked,
  onChange,
  ...otherProps
}) => {
  const ref = React.createRef();
  const handleTextClick = event => {
    ref.current.click();
  };
  // console.log('check render');
  const dataset = {};
  Object.entries(data).forEach(([key, val]) => {
    dataset['data-' + key] = val;
  });
  return (
    <ComponentContainer onClick={handleTextClick} {...otherProps}>
      <CheckContainer>
        <CheckBox
          ref={ref}
          checked={checked}
          onChange={onChange}
          {...dataset}
        />
        <Check></Check>
      </CheckContainer>
      <Text>{children}</Text>
    </ComponentContainer>
  );
};

export default CheckBoxComponent;
