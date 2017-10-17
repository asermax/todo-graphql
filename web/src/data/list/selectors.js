import { createSelector } from 'reselect'
import { getItems } from 'data/item/selectors'

export const getLists = (state) => state.list.all
export const getSortedLists = createSelector(
  [ getLists ],
  (lists) => {
    if (lists != null) {
      lists = lists.slice(0).sort((a, b) => (a.creationDate - b.creationDate))
    }

    return lists
  },
)
export const getCurrentListId = (state) => state.list.currentId
export const getCurrentList = createSelector(
  [ getLists, getCurrentListId, getItems ],
  (lists, id, items) => {
    let list = null

    if (lists == null || id != null) {
      list = lists.find((list) => list._id === id)
      list = {
        ...list,
        items: items != null ? list.items.map((id) => items.find((item) => item._id === id)) : [],
      }
    }

    return list
  } ,
)
