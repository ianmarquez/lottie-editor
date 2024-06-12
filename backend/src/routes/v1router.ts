import express from 'express'
import userRouter from '../user/user.route'
import workspaceRouter from '../workspace/workspace.route'
import lottieRouter from '../lottie/lottie.route'
import lottieLayerRouter from '../lottie-layer/lottie-layer.route'
import websocketRouter from '../websocket/websocket.route'

const router = express.Router()

router.use('/users', userRouter)
router.use('/workspaces', workspaceRouter)
router.use('/lottie', lottieRouter)
router.use('/lottie-layer', lottieLayerRouter)
router.use('/websockets', websocketRouter)

export default router
