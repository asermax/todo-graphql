import { fork } from 'redux-saga/effects'
import listSaga from './list/sagas'

const sagas = [
  listSaga,
]

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga))
}
