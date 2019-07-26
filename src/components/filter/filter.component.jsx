import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFilterOptions } from '../../redux/filter/filter.selectors';

import './filter.styles.scss';

const Filter = ({ filterOptions, dispatch, ...otherProps }) => {
  console.log(filterOptions);
  return <div {...otherProps}>Filter</div>;
};

const mapStateToProps = createStructuredSelector({
  filterOptions: selectFilterOptions
});

export default connect(
  mapStateToProps,
  null
)(Filter);
