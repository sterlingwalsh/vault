import FILTERS from '../../data/vault_filters';
import { toProperCase } from '../../util/general.utils';

import INVENTORY_TYPES from '../inventory/inventory.types';

import { sortAlpha, applyFilter } from './filter.utils';
import FILTER_TYPES from './filter.types';
import { selectItemsList } from '../inventory/inventory.selectors';

const currentFilter = {};

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
  currentFilter[sectionFormat] = sectionObject;
}

const INITIAL_STATE = { currentFilter, filteredGames: [] };

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INVENTORY_TYPES.FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        filteredGames: sortAlpha([...action.payload])
      };

    case FILTER_TYPES.CHANGE_FILTER:
      const { category, item, status } = action.payload;
      const { currentFilter } = state;
      const newFilter = {
        ...currentFilter,
        [category]: { ...currentFilter[category], [item]: status }
      };
      return {
        ...state,
        currentFilter: newFilter
      };
    default:
      return state;
  }
};

export default filterReducer;
