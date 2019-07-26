import { inventory_trimmed } from '../../data/inventory_trimmed';

const INITIAL_STATE = inventory_trimmed;

const inventoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default inventoryReducer;
