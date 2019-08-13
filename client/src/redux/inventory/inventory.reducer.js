import INVENTORY_TYPES from './inventory.types';

const INITIAL_STATE = {
  gameData: {},
  itemsList: [],
  filteredGames: [],
  currentGamesDisplay: []
};

const inventoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INVENTORY_TYPES.FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        itemsList: action.payload
      };
    case INVENTORY_TYPES.FETCH_GAME_DATA_SUCCESS:
      return {
        ...state,
        gameData: {
          ...state.gameData,
          [action.payload.steam_appid]: action.payload
        }
      };
    case INVENTORY_TYPES.SET_CURRENT_GAMES_DISPLAY_SUCCESS:
      return {
        ...state,
        currentGamesDisplay: action.payload
      };
    default:
      return state;
  }
};

export default inventoryReducer;
