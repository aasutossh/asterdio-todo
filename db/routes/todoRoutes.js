const express = require('express')
const model = require('../models/todo')
const router = express.Router()
const URL = "/todo"

router.get(`${URL}`, async (req, res) => {
  const item = await model.find().sort({ updatedAt: -1 })

  try {
    res.send(item)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post(URL, async (req, res) => {
  const item = new model(req.body)
  try {
    await item.save()
    res.send(item)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.patch(`${URL}/:id`, async (req, res) => {
  try {
    const id = req.params.id
    const item = await model.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.send(item)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete(`${URL}/:id`, async (req, res) => {
  const item = await model.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).send('No item found')

  return res.status(200).send(item)
})

module.exports = router
