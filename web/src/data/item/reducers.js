import { combineReducers } from 'redux'
import { FETCH_LIST_SUCCESS } from 'data/list/actions'
import { TOGGLE_ITEM_SUCCESS } from 'data/item/actions'

const all = (state = null, action) => {
  switch(action.type) {
    case FETCH_LIST_SUCCESS:
      return [
        ...action.list.items,
      ]
    case TOGGLE_ITEM_SUCCESS:
      return [
        ...state.filter((item) => item._id !== action.item._id),
        {
          ...state.find((item) => item._id === action.item._id),
          ...action.item,
        },
      ]
    default:
      return state
  }
}

export default combineReducers({
  all,
})
