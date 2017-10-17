import { fork } from 'redux-saga/effects'
import routeSaga from './route/sagas'
import listSaga from './list/sagas'

const sagas = [
  listSaga,
  routeSaga,
]

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga))
}
