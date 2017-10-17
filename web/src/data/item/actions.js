export const TOGGLE_ITEM_REQUEST = 'TOGGLE_ITEM_REQUEST'
export const TOGGLE_ITEM_SUCCESS = 'TOGGLE_ITEM_SUCCESS'
export const TOGGLE_ITEM_FAILURE = 'TOGGLE_ITEM_FAILURE'

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
