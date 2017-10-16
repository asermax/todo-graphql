export const MAIN_ROUTE = 'MAIN_ROUTE'
export const LIST_ROUTE = 'LIST_ROUTE'
export const ADD_LIST_ROUTE = 'ADD_LIST_ROUTE'
export const allRoutes = [ MAIN_ROUTE, LIST_ROUTE, ADD_LIST_ROUTE ]

export const goToMain = () => ({
  type: MAIN_ROUTE,
})

export const goToList = (id) => ({
  type: LIST_ROUTE,
  payload: {
    id,
  },
})

export const goToAddList = () => ({
  type: ADD_LIST_ROUTE,
})
