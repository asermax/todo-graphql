export const FETCH_LISTS_REQUEST = 'FETCH_LISTS_REQUEST'
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS'
export const FETCH_LISTS_FAILURE = 'FETCH_LISTS_FAILURE'
export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
export const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE'

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
