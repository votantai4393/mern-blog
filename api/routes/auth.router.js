import express from 'express'
import { signUp, signIn, googleSignIn } from '../controllers/auth.controller.js'

const router = new express.Router()

router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/google', googleSignIn)

export default router
