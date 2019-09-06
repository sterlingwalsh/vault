import React, { useContext } from 'react';

import CheckBox from '../../custom-controls/checkbox/checkbox.component';

import { FilterContext } from '../../../contexts/filter/filter.provider';

import {
  FilterContainer,
  FilterCategory,
  CheckBoxContainer,
  FilterScrollContainer
} from './filter.styles.jsx';

import { toProperCase } from '../../../util/general.utils';

const Filter = ({ ...otherProps }) => {
  const { currentFilter, updateFilter } = useContext(FilterContext);

  const handleClick = evt => {
    const {
      checked,
      dataset: { category, item }
    } = evt.target;
    updateFilter(category, item, checked);
  };

  return (
    <FilterContainer className='styled-container' {...otherProps}>
      {Object.keys(currentFilter).map((category, i) => (
        <FilterCategory key={i}>
          <div>{toProperCase(category)}</div>
          <FilterScrollContainer>
            {Object.keys(currentFilter[category]).map((item, j) => (
              <CheckBoxContainer key={j}>
                <CheckBox data={{ category, item }} onChange={handleClick}>
                  {currentFilter[category][item].name}
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
