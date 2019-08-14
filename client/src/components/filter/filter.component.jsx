import React, { useContext } from 'react';

import CheckBox from '../checkbox/checkbox.component';

import { FilterContext } from '../../contexts/filter/filter.provider';

import {
  FilterContainer,
  FilterCategory,
  CheckBoxContainer,
  FilterScrollContainer
} from './filter.styles.jsx';

const Filter = ({ ...otherProps }) => {
  const { currentFilter, updateFilter } = useContext(FilterContext);

  const handleClick = (evt, category, item) => {
    updateFilter(category, item, evt.target.checked);
  };

  return (
    <FilterContainer {...otherProps}>
      {Object.keys(currentFilter).map((category, i) => (
        <FilterCategory key={i}>
          <div>{category}</div>
          <FilterScrollContainer>
            {Object.keys(currentFilter[category]).map((item, j) => (
              <CheckBoxContainer key={j}>
                <CheckBox onChange={evt => handleClick(evt, category, item)}>
                  {item}
                </CheckBox>
              </CheckBoxContainer>
            ))}
          </FilterScrollContainer>
        </FilterCategory>
      ))}
    </FilterContainer>
  );
};

export default Filter;
