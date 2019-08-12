import FILTERS from '../../data/vault_filters';
// import FilterActionTypes from './filter.types';
import { toProperCase } from './filter.utils';

const currentFilter = { all: 1, filters: {} };

for (let section in FILTERS) {
  const sectionObject = {};
  let sectionFormat = section.replace('list', '');
  sectionFormat = sectionFormat
    .split('_')
    .map(word => toProperCase(word))
    .join(' ');
  FILTERS[section].forEach(item => {
    if (item) {
      item = toProperCase(item);
      sectionObject[item] = 0;
    }
  });
  currentFilter.filters[sectionFormat] = sectionObject;
}

const INITIAL_STATE = { currentFilter: currentFilter };

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default filterReducer;
