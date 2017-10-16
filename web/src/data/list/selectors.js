import { createSelector } from 'reselect'

export const getLists = (state) => state.list.all
export const getSortedLists = createSelector(
  [ getLists ],
  (lists) => lists.slice(0).sort((a, b) => (a.creationDate - b.creationDate)),
)
