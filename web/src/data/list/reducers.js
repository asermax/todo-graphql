import { combineReducers } from 'redux'
import {
  FETCH_LISTS_SUCCESS, FETCH_LIST_SUCCESS, CHANGE_ADDING_LIST, ADD_LIST_SUCCESS,
  REMOVE_LIST_SUCCESS,
} from './actions'
import { ADD_ITEM_SUCCESS, REMOVE_ITEM_SUCCESS } from 'data/item/actions'
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
    case ADD_ITEM_SUCCESS: {
      const list = state.find((list) => list._id === action.listId)

      return [
        ...state.filter((list) => list._id !== action.listId),
        {
          ...list,
          items: [
            ...list.items,
            action.item._id,
          ],
        },
      ]
    }
    case REMOVE_ITEM_SUCCESS: {
      const list = state.find((list) => list._id === action.listId)

      return [
        ...state.filter((list) => list._id !== action.listId),
        {
          ...list,
          items: list.items.filter((id) => id !== action.id),
        },
      ]
    }
    case ADD_LIST_SUCCESS:
      return [
        ...state,
        {
          ...action.list,
        },
      ]
    case REMOVE_LIST_SUCCESS:
      return state.filter((list) => list._id !== action.id)
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

const defaultAdding = ''
const adding = (state = defaultAdding, action) => {
  switch(action.type) {
    case CHANGE_ADDING_LIST:
      return action.text
    case ADD_LIST_SUCCESS:
      return defaultAdding
    default:
      return state
  }
}

export default combineReducers({
  all,
  currentId,
  adding,
})
