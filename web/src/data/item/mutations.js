import gql from 'graphql-tag'

export const toggleItemMutation = gql`
  mutation toggleItem($listId: ID!, $id: ID!) {
    item: toggleItem(listId: $listId, id: $id) {
      _id
      done
    }
  }
`
