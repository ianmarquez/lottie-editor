import express from 'express'
import StatusCodes from 'http-status-codes'

import validateData from '../middleware/validationMiddleware'
import { userRegisterSchema, userUpdateSchema } from './user.schema'
import {
  createUser,
  deleteUserById,
  findUserById,
  getAllUsers,
  updateUserByEmail,
} from './user.service'
import { createWorkspace } from '../workspace/workspace.service'

const router = express.Router()

router.get('/', async (_, res) => {
  try {
    const users = await getAllUsers()
    users.forEach((user) => {
      delete user.password
    })
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
})

router.post('/', validateData(userRegisterSchema), async (req, res) => {
  const body = req.body
  try {
    delete body.passwordConfirm
    const newUser = await createUser(body)
    delete newUser.password
    await createWorkspace({
      name: `${newUser.firstName}'s Workspace`,
      userId: newUser.id,
    })
    res.json(newUser)
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
})

router
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id
    const user = await findUserById(parseInt(id))
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(`User with id:${id} not found`)
    }
    return res.json(user)
  })
  .put(validateData(userUpdateSchema), async (req, res) => {
    const body = req.body
    try {
      const id = parseInt(req.params.id)
      const user = await updateUserByEmail(body, id)
      delete user.password
      res.json(user)
    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id
    try {
      await deleteUserById(parseInt(id))
      return res.status(StatusCodes.ACCEPTED).send()
    } catch (err) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(`User with id ${id} not found`)
    }
  })

export default router
