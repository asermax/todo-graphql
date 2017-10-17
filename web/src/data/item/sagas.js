import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import { TOGGLE_ITEM_REQUEST, toggleItemSuccess, toggleItemFailure } from './actions'
import { toggleItemMutation } from './mutations'

function* toggleItem(action) {
  try {
    const { item } = yield call(api.mutate, toggleItemMutation, {
      listId: action.listId,
      id: action.id,
    })
    yield put(toggleItemSuccess(item))
  } catch(error) {
    yield put(toggleItemFailure(error.message))
  }
}

function* itemSaga() {
  yield [
    takeLatest(TOGGLE_ITEM_REQUEST, toggleItem),
  ]
}

export default itemSaga
