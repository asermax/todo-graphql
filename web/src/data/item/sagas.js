import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import { getCurrentListId } from 'data/list/selectors'
import {
  TOGGLE_ITEM_REQUEST, toggleItemSuccess, toggleItemFailure,
  ADD_ITEM_REQUEST, addItemSuccess, addItemFailure,
} from './actions'
import { getAddingItem } from './selectors'
import { toggleItemMutation, createItemMutation } from './mutations'

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

function* addItem() {
  const listId = yield select(getCurrentListId)
  const text = yield select(getAddingItem)

  try {
    const { item } = yield call(api.mutate, createItemMutation, {
      listId,
      text,
    })
    yield put(addItemSuccess(listId, item))
  } catch(error) {
    yield put(addItemFailure(error.message))
  }
}

function* itemSaga() {
  yield [
    takeLatest(TOGGLE_ITEM_REQUEST, toggleItem),
    takeLatest(ADD_ITEM_REQUEST, addItem),
  ]
}

export default itemSaga
