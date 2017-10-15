const definition = `
  type List {
    _id: ID!
    name: String!
    items: [ Item! ]
    creationDate: Date!
  }

  type Item {
    _id: ID!
    text: String!
    done: Boolean!
    note: String
    creationDate: Date!
  }
`

export default definition
