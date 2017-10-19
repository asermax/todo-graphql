import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import { goToList, goToAddList } from 'data/route/actions'
import {
  FETCH_LISTS_REQUEST, fetchListsSuccess, fetchListsFailure,
  FETCH_LIST_REQUEST, fetchListSuccess, fetchListFailure,
  ADD_LIST_REQUEST, addListSuccess, addListFailure,
  REMOVE_LIST_REQUEST, removeListSuccess, removeListFailure,
} from './actions'
import { getAddingList, getCurrentListId, getSortedLists } from './selectors'
import { listsQuery, listQuery } from './queries'
import { createListMutation, deleteListMutation } from './mutations'

function* fetchLists() {
  try {
    const response = yield call(api.query, listsQuery)
    yield put(fetchListsSuccess(response.lists))
  } catch (e) {
    yield put(fetchListsFailure(e.message))
  }
}

function* fetchList() {
  const id = yield select(getCurrentListId)

  try {
    const response = yield call(api.query, listQuery, { id })
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

function* removeList() {
  const id = yield select(getCurrentListId)

  try {
    const { deleted } = yield call(api.mutate, deleteListMutation, { id })

    if (deleted) {
      const lists = yield select(getSortedLists)

      if (lists.length > 1) {
        let index = lists.indexOf(lists.find((list) => list._id === id))
        index = index - 1 >= 0 ? index - 1 : index + 1

        yield put(goToList(lists[index]._id))
      } else {
        yield put(goToAddList())
      }

      yield put(removeListSuccess(id))
    } else {
      yield put(removeListFailure('The list couldn\'t be deleted'))
    }
  } catch(error) {
    yield put(removeListFailure(error.message))
  }
}

function* listSaga() {
  yield [
    takeLatest(FETCH_LISTS_REQUEST, fetchLists),
    takeLatest(FETCH_LIST_REQUEST, fetchList),
    takeLatest(ADD_LIST_REQUEST, addList),
    takeLatest(REMOVE_LIST_REQUEST, removeList),
  ]
}

export default listSaga
