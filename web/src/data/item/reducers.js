import { combineReducers } from 'redux'
import { FETCH_LIST_SUCCESS } from 'data/list/actions'
import {
  TOGGLE_ITEM_SUCCESS, CHANGE_ADDING_ITEM, ADD_ITEM_SUCCESS, REMOVE_ITEM_SUCCESS,
} from 'data/item/actions'

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
    case ADD_ITEM_SUCCESS:
      return [
        ...state,
        {
          ...action.item,
        },
      ]
    case REMOVE_ITEM_SUCCESS:
      return state.filter((item) => item._id !== action.id)
    default:
      return state
  }
}

const defaultAdding = ''
const adding = (state = defaultAdding, action) => {
  switch(action.type) {
    case CHANGE_ADDING_ITEM:
      return action.text
    case ADD_ITEM_SUCCESS:
      return defaultAdding
    default:
      return state
  }
}

export default combineReducers({
  all,
  adding,
})
