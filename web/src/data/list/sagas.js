import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import {
  FETCH_LISTS_REQUEST, fetchListsSuccess, fetchListsFailure,
  FETCH_LIST_REQUEST, fetchListSuccess, fetchListFailure,
} from './actions'
import { listsQuery, listQuery } from './queries'

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

function* listSaga() {
  yield [
    takeLatest(FETCH_LISTS_REQUEST, fetchLists),
    takeLatest(FETCH_LIST_REQUEST, fetchList),
  ]
}

export default listSaga
