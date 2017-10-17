import { combineReducers } from 'redux'
import { FETCH_LISTS_SUCCESS, FETCH_LIST_SUCCESS } from './actions'
import { allRoutes, LIST_ROUTE } from 'data/route/actions'

const all = (state = null, action) => {
  switch(action.type) {
    case FETCH_LISTS_SUCCESS:
      return [
        ...action.lists,
      ]
    case FETCH_LIST_SUCCESS:
      return [
        ...state.filter((list) => list._id !== action.list._id),
        {
          ...state.find((list) => list._id === action.list._id),
          items: action.list.items.map((item) => item._id),
        },
      ]
    default:
      return state
  }
}

const currentId = (state = null, action) => {
  switch(action.type) {
    case LIST_ROUTE:
      return action.payload.id
    default:
      if (allRoutes.includes(action.type)) {
        return null
      } else {
        return state
      }
  }
}

export default combineReducers({
  all,
  currentId,
})
