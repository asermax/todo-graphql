import mongoose from 'mongoose'

const ItemSchema = mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, required: true, default: false },
  creationDate: { type: Date, default: Date.now },
})

const ListSchema = mongoose.Schema({
  name: { type: String, required: true },
  items: [ ItemSchema ],
  creationDate: { type: Date, default: Date.now },
})

const List = mongoose.model('List', ListSchema)

export default List
