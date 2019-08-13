import { createSelector } from 'reselect';

export const selectInventory = state => state.inventory;

export const selectItemsList = createSelector(
  [selectInventory],
  inventory => inventory.itemsList
);

export const selectGameData = createSelector(
  [selectInventory],
  inventory => inventory.gameData
);

export const selectCurrentGamesDisplay = createSelector(
  [selectInventory],
  inventory => inventory.currentGamesDisplay
);
