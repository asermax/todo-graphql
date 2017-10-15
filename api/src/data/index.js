import { makeExecutableSchema } from 'graphql-tools'
import scalarResolvers from './scalars'
import { listDefinition, listResolver } from './list'

const queryDefinition = `
  type Query {
    lists: [List]
    list(id: ID!): List
  }

  type Mutation {
    createList(name: String!): List
    changeListName(id: ID!, name: String!): List
    deleteList(id: ID!): Boolean
    createItem(listId: ID!, text: String!): Item
    changeItemText(listId: ID!, id: ID!, text: String!): Item
    toggleItem(listId: ID!, id: ID!, done: Boolean): Item
    deleteItem(listId: ID!, id: ID!): Boolean
  }
`

const scalarDefinitions = `
  scalar Date
`

const typeDefs = [
  scalarDefinitions,
  queryDefinition,
  listDefinition,
]

const resolvers = {
  ...scalarResolvers,
  Query: {
    ...listResolver.root.Query,
  },
  Mutation: {
    ...listResolver.root.Mutation,
  },
  ...listResolver.nested,
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema }
