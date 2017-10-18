export const TOGGLE_ITEM_REQUEST = 'TOGGLE_ITEM_REQUEST'
export const TOGGLE_ITEM_SUCCESS = 'TOGGLE_ITEM_SUCCESS'
export const TOGGLE_ITEM_FAILURE = 'TOGGLE_ITEM_FAILURE'
export const CHANGE_ADDING_ITEM = 'CHANGE_ADDING_ITEM'
export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST'
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE'

export const toggleItem = (listId, id) => ({
  type: TOGGLE_ITEM_REQUEST,
  listId,
  id,
})

export const toggleItemSuccess = (item) => ({
  type: TOGGLE_ITEM_SUCCESS,
  item,
})

export const toggleItemFailure = (reason) => ({
  type: TOGGLE_ITEM_FAILURE,
  reason,
})

export const changeAddingItem = (text) => ({
  type: CHANGE_ADDING_ITEM,
  text,
})

export const addItem = () => ({
  type: ADD_ITEM_REQUEST,
})

export const addItemSuccess = (listId, item) => ({
  type: ADD_ITEM_SUCCESS,
  listId,
  item,
})

export const addItemFailure = (reason) => ({
  type: ADD_ITEM_FAILURE,
  reason,
})
