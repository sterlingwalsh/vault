import INVENTORY_TYPES from './inventory.types';

export const fetchInventoryStart = () => ({
  type: INVENTORY_TYPES.FETCH_INVENTORY_START
});

export const fetchInventorySuccess = inventory => ({
  type: INVENTORY_TYPES.FETCH_INVENTORY_SUCCESS,
  payload: inventory
});

export const fetchInventoryFailure = err => ({
  type: INVENTORY_TYPES.FETCH_INVENTORY_FAILURE,
  payload: err
});

export const fetchGameDataStart = gameId => ({
  type: INVENTORY_TYPES.FETCH_GAME_DATA_START,
  payload: gameId
});

export const fetchGameDataSuccess = gameData => ({
  type: INVENTORY_TYPES.FETCH_GAME_DATA_SUCCESS,
  payload: gameData
});

export const fetchGameDataFailure = err => ({
  type: INVENTORY_TYPES.FETCH_GAME_DATA_FAILURE,
  payload: err
});

export const setCurrentGamesDisplayStart = gameIds => ({
  type: INVENTORY_TYPES.SET_CURRENT_GAMES_DISPLAY_START,
  payload: gameIds
});

export const setCurrentGamesDisplaySuccess = gamesData => ({
  type: INVENTORY_TYPES.SET_CURRENT_GAMES_DISPLAY_SUCCESS,
  payload: gamesData
});

export const setCurrentGamesDisplayFailure = err => ({
  type: INVENTORY_TYPES.SET_CURRENT_GAMES_DISPLAY_FAILURE,
  payload: err
});
