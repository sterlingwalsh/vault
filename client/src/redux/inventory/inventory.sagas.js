import { takeLatest, call, put, all } from 'redux-saga/effects';
import INVENTORY_TYPES from './inventory.types';

import { getGameData } from '../../util/steamapi';

import {
  fetchInventorySuccess,
  fetchInventoryFailure,
  setFilteredGames,
  setCurrentGamesDisplaySuccess
} from './inventory.actions';

import { inventory_trimmed } from '../../data/inventory_trimmed';
import { hydrateInventory } from './inventory.utils';

import {
  selectFilteredGames,
  selectCurrentGamesData
} from './inventory.selectors';

export function* fetchInventory() {
  try {
    const inventory = hydrateInventory(inventory_trimmed);
    yield put(fetchInventorySuccess(inventory));
    if (!selectFilteredGames.length) {
      yield put(setFilteredGames(Object.keys(inventory)));
    }
  } catch (err) {
    yield put(fetchInventoryFailure(err));
  }
}

export function* fetchGamesData({ payload }) {
  try {
    if (!payload.length) return;
    const response = yield getGameData(payload);
    console.log({ response });
    const gamesData = response.map(game => Object.values(game)[0].data);
    console.log({ gamesData });
    yield put(setCurrentGamesDisplaySuccess(gamesData));
  } catch (err) {}
}

export function* fetchInventoryStart() {
  yield takeLatest(INVENTORY_TYPES.FETCH_INVENTORY_START, fetchInventory);
}

export function* setCurrentGamesDisplayStart() {
  yield takeLatest(
    INVENTORY_TYPES.SET_CURRENT_GAMES_DISPLAY_START,
    fetchGamesData
  );
}

export function* inventorySagas() {
  yield all([call(fetchInventoryStart), call(setCurrentGamesDisplayStart)]);
}
