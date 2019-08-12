import { createSelector } from 'reselect';

export const selectInventory = state => state.inventory;

export const selectGameData = createSelector(
  [selectInventory],
  inventory => inventory.gameData
);

export const selectFilteredGames = createSelector(
  [selectInventory],
  inventory => inventory.filteredGames
);

export const selectCurrentGamesData = createSelector(
  [selectInventory],
  inventory => inventory.currentGamesData
);
