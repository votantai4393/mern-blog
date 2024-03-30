import { Router } from 'express'
import { signIn, signUp, google } from '../controller/auth.controller.js'

const router = new Router()

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.post('/google', google)

export default router
