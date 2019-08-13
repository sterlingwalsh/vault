import { takeLatest, call, put, all } from 'redux-saga/effects';
import INVENTORY_TYPES from './inventory.types';

import { getGameData } from '../../util/steamapi';

import {
  fetchInventorySuccess,
  fetchInventoryFailure,
  setCurrentGamesDisplaySuccess
} from './inventory.actions';

import { inventory_trimmed } from '../../data/inventory_trimmed';
import { hydrateInventory } from './inventory.utils';

export function* fetchInventory() {
  try {
    const itemsList = Object.values(hydrateInventory(inventory_trimmed));
    yield put(fetchInventorySuccess(itemsList));
  } catch (err) {
    yield put(fetchInventoryFailure(err));
  }
}

export function* fetchGamesData({ payload }) {
  try {
    if (!payload.length) return;
    const response = yield getGameData(payload);
    const gamesData = response.map(game => Object.values(game)[0].data);
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
