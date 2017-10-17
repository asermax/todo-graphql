import { fork } from 'redux-saga/effects'
import listSaga from './list/sagas'
import itemSaga from './item/sagas'
import routeSaga from './route/sagas'

const sagas = [
  listSaga,
  itemSaga,
  routeSaga,
]

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga))
}
