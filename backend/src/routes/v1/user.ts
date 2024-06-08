import express from 'express'
import { createUser } from '../../controller/user'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('user list')
})

router.post('/', async (req, res) => {
  const body = req.body
  try {
    const newUser = await createUser(
      body.firstName,
      body.lastName,
      body.birthday,
      body.password
    )
    res.json(newUser)
  } catch (error) {
    res.send({
      status: 500,
      mesge: JSON.stringify(error),
    })
  }
  res.send('new user')
})

router
  .route('/:id')
  .get((req, res) => {
    res.send(`Get user with ${req.params.id}`)
  })
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
