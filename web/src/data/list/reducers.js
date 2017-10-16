import { combineReducers } from 'redux'
import { FETCH_LISTS_SUCCESS } from './actions'

const allDefault = []
const all = (state = allDefault, action) => {
  switch(action.type) {
    case FETCH_LISTS_SUCCESS:
      return action.lists
    default:
      return state
  }
}

export default combineReducers({
  all,
})
