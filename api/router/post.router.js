import { Router } from 'express'
import verifyUser from '../utils/verifyUser.js'
import {
	getPosts,
	createPost,
	updatePost,
	deletePost
} from '../controller/post.controller.js'

const router = new Router()

router.post('/create', verifyUser, createPost)
router.put('/update/:postId/:userId', verifyUser, updatePost)
router.delete('/delete/:postId/:userId', verifyUser, deletePost)
router.get('/posts', getPosts)

export default router
