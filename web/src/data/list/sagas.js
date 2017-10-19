import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import { goToList } from 'data/route/actions'
import {
  FETCH_LISTS_REQUEST, fetchListsSuccess, fetchListsFailure,
  FETCH_LIST_REQUEST, fetchListSuccess, fetchListFailure,
  ADD_LIST_REQUEST, addListSuccess, addListFailure,
} from './actions'
import { getAddingList } from './selectors'
import { listsQuery, listQuery } from './queries'
import { createListMutation } from './mutations'

function* fetchLists() {
  try {
    const response = yield call(api.query, listsQuery)
    yield put(fetchListsSuccess(response.lists))
  } catch (e) {
    yield put(fetchListsFailure(e.message))
  }
}

function* fetchList(action) {
  try {
    const response = yield call(api.query, listQuery, { id: action.id })
    yield put(fetchListSuccess(response.list))
  } catch (e) {
    yield put(fetchListFailure(e.message))
  }
}

function* addList() {
  const name = yield select(getAddingList)

  try {
    const { list } = yield call(api.mutate, createListMutation, { name })
    yield put(addListSuccess(list))
    yield put(goToList(list._id))
  } catch(error) {
    yield put(addListFailure(error.message))
  }
}

function* listSaga() {
  yield [
    takeLatest(FETCH_LISTS_REQUEST, fetchLists),
    takeLatest(FETCH_LIST_REQUEST, fetchList),
    takeLatest(ADD_LIST_REQUEST, addList),
  ]
}

export default listSaga
