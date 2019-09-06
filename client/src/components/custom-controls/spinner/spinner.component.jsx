import React, { useReducer, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { textColor, textColorCode } from '../../../global.styles';

const InputContainer = styled.div`
  position: relative;
  border-right: 1px solid rgba(${textColorCode}, 0.3);
  > * {
    padding: 0.25rem;
    font-size: inherit;
  }
`;

const Input = styled.input.attrs(props => ({
  type: 'number'
}))`
  position: relative;
  background: none;
  border: none;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const firstBaseTransform = { translate: 6, rotate: -135, direction: -1 };
const lastBaseTransform = { translate: 0, rotate: 45, direction: 1 };

const getArrow = ({ translate, rotate, direction }) => {
  const getBounce = () => keyframes`
  from{
    transform: translateY(${translate}px) rotate(${rotate}deg);
  }
  to{
    transform: translateY(${translate + 3 * direction}px) rotate(${rotate}deg);
  }
`;
  return css`
    &:after {
      transform: translateY(${translate}px) rotate(${rotate}deg);
    }
    &:hover:after {
      animation: ${getBounce(firstBaseTransform)} 0.75s ease-in-out infinite;
      animation-direction: alternate;
    }
  `;
};

const Arrow = styled.div`
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    left: 50%;
    margin-left: -3.53px;
    border: solid ${textColor};
    border-width: 0 2px 2px 0;
    transition: transform 0.25s ease-in-out;
  }

  &:first-of-type {
    ${getArrow(firstBaseTransform)}
  }

  &:last-of-type {
    ${getArrow(lastBaseTransform)}
  }
`;

const ArrowContainer = styled.div`
  width: 22px;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease-in-out;
  > * {
    flex-grow: 1;
  }
`;

const ControlContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border-bottom: 1px solid ${textColor};
  > ${InputContainer} {
    flex-grow: 1;
  }
  > ${ArrowContainer} {
    flex-grow: 0;
  }
`;

const ACTION = { INCREMENT: 'INCREMENT', DECREMENT: 'DECREMENT', SET: 'SET' };
const valueReducer = (value, action) => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return value + 1;
    case ACTION.DECREMENT:
      return value - 1;
    case ACTION.SET:
      return action.payload;
    default:
      return value;
  }
};

const Spinner = ({
  min = -100,
  max = 100,
  step = 1,
  value = 0,
  onChange = () => {},
  ...otherProps
}) => {
  const [inputValue, inputDispatch] = useReducer(valueReducer, value);

  const handleChange = useCallback(
    evt => {
      inputDispatch({ type: ACTION.SET, payload: evt.target.value });
      onChange(evt);
    },
    [onChange]
  );

  const increment = useCallback(() => {
    inputDispatch({ type: ACTION.INCREMENT });
  }, []);

  const decrement = useCallback(() => {
    inputDispatch({ type: ACTION.DECREMENT });
  }, []);

  const handleScroll = useCallback(evt => {
    const d = evt.deltaY;
    if (d > 0) {
      inputDispatch({ type: ACTION.DECREMENT });
    } else if (d < 0) {
      inputDispatch({ type: ACTION.INCREMENT });
    }
  }, []);

  return (
    <ControlContainer {...otherProps}>
      <InputContainer>
        <Input
          min={min}
          max={max}
          step={step}
          value={inputValue}
          onChange={handleChange}
          onWheel={handleScroll}
        ></Input>
      </InputContainer>
      <ArrowContainer>
        <Arrow onClick={increment}></Arrow>
        <Arrow onClick={decrement}></Arrow>
      </ArrowContainer>
    </ControlContainer>
  );
};

export default Spinner;
