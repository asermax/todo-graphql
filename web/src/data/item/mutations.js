import gql from 'graphql-tag'

export const toggleItemMutation = gql`
  mutation toggleItem($listId: ID!, $id: ID!) {
    item: toggleItem(listId: $listId, id: $id) {
      _id
      done
    }
  }
`

export const createItemMutation = gql`
  mutation createItem($listId: ID!, $text: String!) {
    item: createItem(listId: $listId, text: $text) {
      _id
      text
      creationDate
      done
    }
  }
`
