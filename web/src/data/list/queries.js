import gql from 'graphql-tag'

export const listsQuery = gql`
  query lists {
    lists {
      _id
      name
      creationDate
    }
  }
`

export const listQuery = gql`
  query list($id: ID!) {
    list(id: $id) {
      _id

      items {
        _id
        text
        done
        creationDate
      }
    }
  }
`
