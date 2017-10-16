export const FETCH_LISTS_REQUEST = 'FETCH_LISTS_REQUEST'
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS'
export const FETCH_LISTS_FAILURE = 'FETCH_LISTS_FAILURE'

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
