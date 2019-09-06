import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import {
  textColor,
  textColorCode,
  backgroundColor,
  backgroundColorCode,
  StyledContainerInverted
} from '../../../global.styles';

const Container = styled.div``;
const ControlContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border-bottom: 1px solid ${textColor};
`;

const InputContainer = styled.div`
  position: relative;
  border-right: 1px solid rgba(${textColorCode}, 0.3);
  > * {
    padding: 0.25rem;
    font-size: inherit;
  }
`;

const Input = styled.input.attrs(props => ({
  type: 'text'
}))`
  position: relative;
  background: none;
  border: none;

  &:focus {
    outline: none;
  }
`;

const TextSuggestion = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: rgba(${textColorCode}, 0.3);
  user-select: none;
  white-space: nowrap;
  width: 100%;
`;

const bounce = keyframes`
  from{
    transform: translateY(-3.5px) rotate(45deg);
  }
  to{
    transform: translateY(-.5px) rotate(45deg);
  }
`;

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  margin: auto;
  border: solid ${textColor};
  border-width: 0 2px 2px 0;
  transition: transform 0.25s ease-in-out;
  transform: translateY(-3.5px) rotate(45deg);
`;

const ArrowContainer = styled.div`
  cursor: pointer;
  width: 22px;
  display: flex;
  transition: transform 0.25s ease-in-out;

  &:hover ${Arrow} {
    animation: ${bounce} 0.75s ease-in-out infinite;
    animation-direction: alternate;
  }

  &.open {
    transform: rotate(-180deg);
  }
`;

const ListContainer = styled.div`
  width: 0;
  height: 0;
  position: relative;
`;

const List = styled(StyledContainerInverted)`
  padding: 0;
  margin-left: 0;
  overflow-y: scroll;
  position: absolute;
  height: 0px;
  z-index: 99;
  transition: height 0.25s ease-in-out;
  width: max-content;

  &.open {
    height: 200px;
  }
`;
const ListItem = styled.div`
  background: ${textColor};
  color: ${backgroundColor};
  padding: 0.5rem;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-image: linear-gradient(
      to right,
      rgba(${backgroundColorCode}, 0),
      rgba(${backgroundColorCode}, 100) 50%,
      rgba(${backgroundColorCode}, 0)
    )
    1;

  &.highlight {
    background: ${backgroundColor};
    color: ${textColor};
  }
  &:last-of-type {
    border: none;
  }
`;

const DropDown = ({
  values = {},
  placeholder = '',
  maxDisplay = 10,
  sort = true,
  onSelectionChange = () => {},
  ...otherProps
}) => {
  const [open, setOpen] = useState(false);
  const [valuesMap, setValuesMap] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedValues, setDisplayedValues] = useState([]);
  const [suggestion, setSuggestion] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const highlightedRef = useRef();
  const [selection, setSelection] = useState(undefined);
  const self = useRef();

  useEffect(() => {
    // console.log(values);
    let keys = Object.keys(values);
    if (sort) keys = keys.sort();
    const map = keys.map(key => [key, values[key]]);
    setValuesMap(map);
  }, [values, sort]);

  useEffect(() => {
    let toDisplay = [];
    if (searchQuery) {
      const search = escapeRegExp(searchQuery);
      const findPattern = new RegExp(`${search}`, 'i');
      for (let i = 0, j = 0; i < valuesMap.length && j < maxDisplay; i++) {
        if (valuesMap[i][0].match(findPattern)) {
          toDisplay.push(valuesMap[i]);
          j++;
        }
      }
      const suggestionPattern = new RegExp(`^${search}`, 'i');
      if (toDisplay[0] && toDisplay[0][0].match(suggestionPattern)) {
        setSuggestion(toDisplay[0][0]);
        setHighlightedIndex(0);
      } else {
        setSuggestion('');
      }
    } else {
      toDisplay = valuesMap.slice(0, maxDisplay);
    }
    setDisplayedValues(toDisplay);
  }, [valuesMap, maxDisplay, searchQuery]);

  const onSearchChange = useCallback(evt => {
    setSearchQuery(evt.target.value);
  }, []);

  const onKeyPress = useCallback(
    evt => {
      const key = evt.keyCode;

      switch (key) {
        case 38:
          setHighlightedIndex(Math.max(-1, highlightedIndex - 1));
          break;
        case 40:
          setHighlightedIndex(
            Math.min(displayedValues.length - 1, highlightedIndex + 1)
          );
          break;
        case 13:
          if (
            highlightedIndex > -1 &&
            highlightedIndex < displayedValues.length
          ) {
            setSelection(highlightedIndex);
          }
          break;
        default:
          break;
      }
    },
    [highlightedIndex, displayedValues.length]
  );

  useEffect(() => {
    if (displayedValues[highlightedIndex]) {
      setSuggestion(displayedValues[highlightedIndex][0]);
    }
  }, [displayedValues, highlightedIndex]);

  useEffect(() => {
    if (highlightedRef.current) {
      highlightedRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedRef.current]);

  useEffect(() => {
    const item = displayedValues[selection];
    if (item) {
      setSearchQuery(item[0]);
      onSelectionChange(displayedValues[selection]);
      setOpen(false);
    }
  }, [selection]);

  const handleItemClick = useCallback(evt => {
    setSelection(evt.target.dataset.value);
  }, []);

  const handleMouseOver = useCallback(evt => {
    setHighlightedIndex(Number(evt.target.dataset.value));
  }, []);

  const handleInputFocus = useCallback(evt => {
    setOpen(true);
  }, []);

  useEffect(() => {
    const testCloseDropdown = evt => {
      if (self.current.contains(evt.target)) return;
      setOpen(false);
    };
    document.addEventListener('click', testCloseDropdown);
    return () => {
      document.removeEventListener('click', testCloseDropdown);
    };
  }, []);

  return (
    <Container ref={self}>
      <ControlContainer>
        <InputContainer onFocus={handleInputFocus}>
          <TextSuggestion>
            {open
              ? `${suggestion}`
                ? `${suggestion}`
                : `${placeholder}`
              : searchQuery
              ? ''
              : `${placeholder}`}
          </TextSuggestion>
          <Input
            onChange={onSearchChange}
            onKeyDown={onKeyPress}
            value={searchQuery}
          ></Input>
        </InputContainer>

        <ArrowContainer
          className={open ? 'open' : ''}
          onClick={() => setOpen(!open)}
        >
          <Arrow />
        </ArrowContainer>
      </ControlContainer>

      <ListContainer>
        <List className={open ? 'open' : ''}>
          {displayedValues.map((item, index) => (
            <ListItem
              className={index === highlightedIndex ? 'highlight' : ''}
              ref={index === highlightedIndex ? highlightedRef : undefined}
              key={index}
              data-value={index}
              onClick={handleItemClick}
              onMouseOver={handleMouseOver}
            >{`${item[0]}`}</ListItem>
          ))}
        </List>
      </ListContainer>
    </Container>
  );
};
export default DropDown;

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
