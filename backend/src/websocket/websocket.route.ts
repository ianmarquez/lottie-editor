import express from 'express'
import Pusher from 'pusher'
import { WSPostBody } from '../../../types/messages'
import { StatusCodes } from 'http-status-codes'
import corsMiddleware from '../middleware/corsMiddleware'

const router = express.Router()

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: true,
})

router.post('/event', corsMiddleware, (req, res) => {
  const payload = req.body as WSPostBody
  console.log(payload)
  pusher.trigger(process.env.PUSHER_CHANNEL_NAME, payload.event, payload.json)
  res.status(StatusCodes.ACCEPTED).send()
})

export default router
