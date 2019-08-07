import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentFilter } from '../../redux/filter/filter.selectors';

import CheckBox from '../checkbox/checkbox.component';

import {
  FilterContainer,
  FilterCategory,
  CheckBoxContainer,
  FilterScrollContainer
} from './filter.styles.jsx';

const Filter = ({ currentFilter: { filters }, dispatch, ...otherProps }) => {
  const handleClick = (evt, categoryName, item) => {
    console.log({ clicked: evt.target.checked, categoryName, item });
  };

  return (
    <FilterContainer {...otherProps}>
      {Object.keys(filters).map((categoryName, i) => {
        return (
          <FilterCategory key={i}>
            <div>{categoryName}</div>
            <FilterScrollContainer>
              {Object.keys(filters[categoryName]).map((item, j) => (
                <CheckBoxContainer key={j}>
                  <CheckBox
                    onChange={evt => handleClick(evt, categoryName, item)}
                    checkProps={{ categoryName, item }}
                  >
                    {item}
                  </CheckBox>
                </CheckBoxContainer>
              ))}
            </FilterScrollContainer>
          </FilterCategory>
        );
      })}
    </FilterContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentFilter: selectCurrentFilter
});

export default connect(
  mapStateToProps,
  null
)(Filter);
