import { put, take, select, fork, takeLatest } from 'redux-saga/effects'
import {
  allRoutes, MAIN_ROUTE, LIST_ROUTE, routesInitialized , goToList, goToAddList,
} from './actions'
import { isInit, getCurrentRoute } from './selectors'
import { fetchLists, fetchList, FETCH_LISTS_SUCCESS } from 'data/list/actions'
import { getSortedLists } from 'data/list/selectors'

function* onInit() {
  const initialized = yield select(isInit)

  if (!initialized) {
    yield put(fetchLists())
    yield* onRoute()
    yield put(routesInitialized())
  }
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
  yield put(fetchList())
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
    takeLatest(allRoutes, onRoute),
  ]
}

export default routeSaga
