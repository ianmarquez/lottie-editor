import express from 'express'

import validateData from '../middleware/validationMiddleware'
import { createUser, findUserById } from './user.service'
import { userMutateSchema } from './user.schema'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('user list')
})

router.post('/', validateData(userMutateSchema), async (req, res) => {
  const body = req.body
  try {
    body.delete('passwordConfirm')
    console.log(body)
    const newUser = await createUser(body)
    res.json(newUser)
  } catch (error) {
    res.send(error).status(500)
  }
})

router
  .route('/:id')
  .get(async (req, res) => {})
  .put((req, res) => {
    res.send(`update user with ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`delete user with ${req.params.id}`)
  })

router.param('id', (req, res, next, id) => {
  // run something
  next()
})

export default router
