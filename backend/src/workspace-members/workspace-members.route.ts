import express from 'express'

import validateData from '../middleware/validationMiddleware'

const router = express.Router()

router.get('/', async (req, res) => {})

router.post('/', async (req, res) => {})

router
  .route('/:id')
  .get(async (req, res) => {})
  .put(async (req, res) => {})
  .delete(async (req, res) => {})

export default router
