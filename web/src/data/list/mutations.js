import gql from 'graphql-tag'

export const createListMutation = gql`
  mutation createList($name: String!) {
    list: createList(name: $name) {
      _id
      name
      creationDate
    }
  }
`

export const deleteListMutation = gql`
  mutation deleteList($id: ID!) {
    deleted: deleteList(id: $id)
  }
`
