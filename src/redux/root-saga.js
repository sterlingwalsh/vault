import { all, call } from 'redux-saga/effects';

import { inventorySagas } from './inventory/inventory.sagas';

export default function* rootSaga() {
  yield all([call(inventorySagas)]);
}
