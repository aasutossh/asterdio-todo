const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const todoRouter = require('./db/routes/todoRoutes')
const app = express()

app.use(cors())
app.use(express.json())

mongoose.set('strictQuery', false)
mongoose.connect(
  'mongodb+srv://asterdio-user:JThxePWz7tJiwjR@todo.hblictq.mongodb.net/?retryWrites=true&w=majority'
)

app.use(todoRouter)


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
