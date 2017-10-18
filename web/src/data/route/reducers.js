import { combineReducers } from 'redux'
import { allRoutes, ROUTES_INITIALIZED } from './actions'

const current = (state = null, action) => {
  if (allRoutes.includes(action.type)) {
    return action.type
  } else {
    return state
  }
}

const isInit = (state = false, action) => {
  switch(action.type) {
    case ROUTES_INITIALIZED:
      return true
    default:
      return state
  }
}

export default combineReducers({
  current,
  isInit,
})
