import { combineReducers } from 'redux';
import filterReducer from './filter/filter.reducer';
import inventoryReducer from './inventory/inventory.reducer';

const rootReducer = combineReducers({
  filter: filterReducer,
  inventory: inventoryReducer
});

export default rootReducer;
