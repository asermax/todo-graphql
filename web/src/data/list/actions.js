export const FETCH_LISTS_REQUEST = 'FETCH_LISTS_REQUEST'
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS'
export const FETCH_LISTS_FAILURE = 'FETCH_LISTS_FAILURE'
export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
export const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE'
export const CHANGE_ADDING_LIST = 'CHANGE_ADDING_LIST'
export const ADD_LIST_REQUEST = 'ADD_LIST_REQUEST'
export const ADD_LIST_SUCCESS = 'ADD_LIST_SUCCESS'
export const ADD_LIST_FAILURE = 'ADD_LIST_FAILURE'
export const REMOVE_LIST_REQUEST = 'REMOVE_LIST_REQUEST'
export const REMOVE_LIST_SUCCESS = 'REMOVE_LIST_SUCCESS'
export const REMOVE_LIST_FAILURE = 'REMOVE_LIST_FAILURE'

export const fetchLists = () => ({
  type: FETCH_LISTS_REQUEST,
})

export const fetchListsSuccess = (lists) => ({
  type: FETCH_LISTS_SUCCESS,
  lists,
})

export const fetchListsFailure = (reason) => ({
  type: FETCH_LISTS_FAILURE,
  reason,
})

export const fetchList = (id) => ({
  type: FETCH_LIST_REQUEST,
  id,
})

export const fetchListSuccess = (list) => ({
  type: FETCH_LIST_SUCCESS,
  list,
})

export const fetchListFailure = (reason) => ({
  type: FETCH_LIST_FAILURE,
  reason,
})

export const changeAddingList = (text) => ({
  type: CHANGE_ADDING_LIST,
  text,
})

export const addList = (name) => ({
  type: ADD_LIST_REQUEST,
  name,
})

export const addListSuccess = (list) => ({
  type: ADD_LIST_SUCCESS,
  list,
})

export const addListFailure = (reason) => ({
  type: ADD_LIST_FAILURE,
  reason,
})

export const removeList = () => ({
  type: REMOVE_LIST_REQUEST,
})

export const removeListSuccess = (id) => ({
  type: REMOVE_LIST_SUCCESS,
  id,
})

export const removeListFailure = (reason) => ({
  type: REMOVE_LIST_FAILURE,
  reason,
})
