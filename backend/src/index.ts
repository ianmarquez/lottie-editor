import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'

import logger from './middleware/logger'
import V1Router from './routes/v1router'
import corsMiddleware from './middleware/corsMiddleware'

const port = process.env.PORT
dotenv.config()

const app = express()

if (!port) process.exit(1)

app.use(corsMiddleware)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger)

app.use('/v1', V1Router)
app.get('/healthz', (req, res) => {
  res.send('server is running')
})

app.listen(port, () => {
  console.log(`now listening on port ${port}`)
})
