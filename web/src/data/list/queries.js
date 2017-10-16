import gql from 'graphql-tag'

export const listsQuery = gql`
  query list {
    lists {
      _id
      name
    }
  }
`
