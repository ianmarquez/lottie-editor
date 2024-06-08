import express from 'express'

import { Workspace } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import validateData from '../middleware/validationMiddleware'
import { findUserById } from '../user/user.service'
import { workspaceCreateSchema } from './workspace.schema'
import {
  createWorkspace,
  deleteWorkspaceById,
  findWorkspaceById,
  getAllWorkspaces,
  updateWorkspaceById,
} from './workspace.service'

const router = express.Router()

router.get('/', async (_, res) => {
  try {
    const workspaces = await getAllWorkspaces()
    res.json(workspaces)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
})

router.post('/', validateData(workspaceCreateSchema), async (req, res) => {
  const body = req.body as Workspace
  try {
    const owner = await findUserById(body.userId)
    if (!owner) return res.status(StatusCodes.NOT_FOUND).send('Owner not found')
    const newWorkspace = await createWorkspace(body)
    res.json(newWorkspace)
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
})

router
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id
    const workspace = await findWorkspaceById(parseInt(id))
    if (!workspace) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(`Workspace with id ${id} not found`)
    }
    return res.json(workspace)
  })
  .put(validateData(workspaceCreateSchema), async (req, res) => {
    const body = req.body as Workspace
    try {
      const id = parseInt(req.params.id)
      body.id = id
      const workspace = await updateWorkspaceById(body)
      res.json(workspace)
    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id
    try {
      await deleteWorkspaceById(parseInt(id))
      return res.status(StatusCodes.ACCEPTED).send()
    } catch (err) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(`Workspace with id ${id} not found`)
    }
  })

export default router
