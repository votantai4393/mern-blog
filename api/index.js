import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import cookieParser from 'cookie-parser'
import userRouter from './router/user.router.js'
import authRouter from './router/auth.router.js'
import postRouter from './router/post.router.js'
import commentRouter from './router/comment.router.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use(morgan('combined'))

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err))

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`)
})

app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)
app.use('/api/auth', authRouter)

app.use((error, req, res, next) => {
	const statusCode = error.statusCode || 500
	const message = error.message || 'Something went wrong'

	res.status(statusCode).json({
		success: false,
		statusCode,
		message
	})
})
