import { combineReducers } from 'redux'
import { FETCH_LIST_SUCCESS } from 'data/list/actions'

const all = (state = null, action) => {
  switch(action.type) {
    case FETCH_LIST_SUCCESS:
      return [
        ...action.list.items,
      ]
    default:
      return state
  }
}

export default combineReducers({
  all,
})
