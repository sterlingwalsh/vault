import FILTERS from '../../data/vault_filters';

const selectionsObject = {};

for (let section in FILTERS) {
  const sectionObject = {};
  FILTERS[section].forEach(item => {
    if (item) sectionObject[item] = 0;
  });
  selectionsObject[section] = sectionObject;
}

const INITIAL_STATE = { options: FILTERS, selections: selectionsObject };

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default filterReducer;
