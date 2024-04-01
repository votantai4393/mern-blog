import { Router } from 'express'
import verifyUser from '../utils/verifyUser.js'
import {
	signOut,
	updateUser,
	deleteUser,
	getUsers,
	getUser
} from '../controller/user.controller.js'

const router = new Router()

router.post('/sign-out', signOut)
router.put('/update/:id', verifyUser, updateUser)
router.delete('/delete/:id', verifyUser, deleteUser)
router.get('/users', verifyUser, getUsers)
router.get('/:id', getUser)

export default router
