import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import { FETCH_LISTS_REQUEST, fetchListsSuccess, fetchListsFailure } from './actions'
import { listsQuery } from './queries'

function* fetchLists() {
  try {
    const response = yield call(api.query, listsQuery)
    yield put(fetchListsSuccess(response.lists))
  } catch (e) {
    yield put(fetchListsFailure(e.message))
  }
}

function* listSaga() {
  yield [
    takeLatest(FETCH_LISTS_REQUEST, fetchLists),
  ]
}

export default listSaga
