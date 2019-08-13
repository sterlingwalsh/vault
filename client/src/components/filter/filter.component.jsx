import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentFilter } from '../../redux/filter/filter.selectors';
import { changeFilter } from '../../redux/filter/filter.actions';

import CheckBox from '../checkbox/checkbox.component';

import {
  FilterContainer,
  FilterCategory,
  CheckBoxContainer,
  FilterScrollContainer
} from './filter.styles.jsx';

const Filter = ({ currentFilter, dispatch, changeFilter, ...otherProps }) => {
  const handleClick = (evt, categoryName, item) => {
    changeFilter(categoryName, item, evt.target.checked);
  };

  return (
    <FilterContainer {...otherProps}>
      {Object.keys(currentFilter).map((categoryName, i) => {
        return (
          <FilterCategory key={i}>
            <div>{categoryName}</div>
            <FilterScrollContainer>
              {Object.keys(currentFilter[categoryName]).map((item, j) => (
                <CheckBoxContainer key={j}>
                  <CheckBox
                    onChange={evt => handleClick(evt, categoryName, item)}
                    checkProps={{ category: categoryName, item }}
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

const mapDispatchToProps = dispatch => ({
  changeFilter: (category, item, status) =>
    dispatch(changeFilter({ category, item, status }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
