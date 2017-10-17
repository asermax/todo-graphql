import { put, take, select, fork, takeLatest } from 'redux-saga/effects'
import { allRoutes, MAIN_ROUTE, LIST_ROUTE, goToList, goToAddList } from './actions'
import { getCurrentRoute } from './selectors'
import { fetchLists, fetchList, FETCH_LISTS_SUCCESS } from 'data/list/actions'
import { getSortedLists, getCurrentListId } from 'data/list/selectors'

function* onInit() {
  yield put(fetchLists())
}

function* onMainRoute() {
  yield take(FETCH_LISTS_SUCCESS)
  const lists = yield select(getSortedLists)

  if (lists.length > 0) {
    yield put(goToList(lists[0]._id))
  } else {
    yield put(goToAddList())
  }
}

function* onListRoute() {
  const currentListId = yield select(getCurrentListId)
  yield put(fetchList(currentListId))
}

const routesMap = {
  [MAIN_ROUTE]: onMainRoute,
  [LIST_ROUTE]: onListRoute,
}

function* onRoute() {
  const currentRoute = yield select(getCurrentRoute)

  if (routesMap[currentRoute] != null) {
    yield* routesMap[currentRoute]()
  }
}

function* routeSaga() {
  yield [
    fork(onInit),
    fork(onRoute),
    takeLatest(allRoutes, onRoute),
  ]
}

export default routeSaga
