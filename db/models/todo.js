const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema(
  {
    text: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo
