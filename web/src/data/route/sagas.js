import { select, put, takeLatest } from 'redux-saga/effects'
import { MAIN_ROUTE, goToList, goToAddList } from './actions'
import { getCurrentRoute } from './selectors'
import { FETCH_LISTS_SUCCESS } from 'data/list/actions'
import { getSortedLists } from 'data/list/selectors'

function* goToFirstList() {
  const currentRoute = yield select(getCurrentRoute)

  if (currentRoute === MAIN_ROUTE) {
    const lists = yield select(getSortedLists)

    if (lists.length > 0) {
      yield put(goToList(lists[0]._id))
    } else {
      yield put(goToAddList())
    }
  }
}

function* routeSaga() {
  yield [
    takeLatest(FETCH_LISTS_SUCCESS, goToFirstList),
  ]
}

export default routeSaga
