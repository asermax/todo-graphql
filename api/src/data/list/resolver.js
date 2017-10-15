import List from './model'

const resolver = {
  root: {
    Query: {
      lists() {
        return List.find().exec()
      },
      list(_, { id }) {
        return List.findById(id).exec()
      },
    },
    Mutation: {
      createList(_, { name }) {
        return List.create({ name })
      },
      changeListName(_, { id, name }) {
        return List.findOneAndUpdate({ _id: id }, { name }, { new: true })
      },
      deleteList(_, { id }) {
        return List.remove({ _id: id })
      },
      async createItem(_, { listId, text }) {
        // find the list and create the item
        const list = await List.findById(listId).exec()
        const item = list.items.create({ text })
        list.items.push(item)

        await list.save()

        return item
      },
      async changeItemText(_, { listId, id, text }) {
        // find the list and update the item
        const list = await List.findById(listId).exec()
        const item = list.items.id(id)

        item.text = text
        await list.save()

        return item
      },
      async toggleItem(_, { listId, id, done }) {
        // find the list and update the item
        const list = await List.findById(listId).exec()
        const item = list.items.id(id)

        // if done is not defined, toggle to the opposite of the current one
        if (done == null) {
          done = !item.done
        }

        item.done = done
        await list.save()

        return item
      },
      async deleteItem(_, { listId, id }) {
        // find the list and remove the item
        const list = await List.findById(listId).exec()
        list.items.id(id).remove()

        try {
          await list.save()
          return true
        } catch(_) {
          return false
        }
      },
    },
  },
  nested: {
    List: {
      items(list) {
        return list.items
      },
    },
  },
}

export default resolver
