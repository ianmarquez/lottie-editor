import express from 'express'
import userRouter from '../user/user.route'
import workspaceRouter from '../workspace/workspace.route'
import workspaceMembersRouter from '../workspace-members/workspace-members.route'
import lottieRouter from '../lottie/lottie.route'
import lottieLayerRouter from '../lottie-layer/lottie-layer.route'

const router = express.Router()

router.use('/users', userRouter)
router.use('/workspaces', workspaceRouter)
router.use('/workspace-members', workspaceMembersRouter)
router.use('/lottie', lottieRouter)
router.use('/lottie-layer', lottieLayerRouter)

export default router
