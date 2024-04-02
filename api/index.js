import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import userRouter from './routes/user.router.js'
import authRouter from './routes/auth.router.js'
import postRouter from './routes/post.router.js'
import commentRouter from './routes/comment.router.js'

dotenv.config()

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err))

const app = express()

const __dirname = path.resolve()

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`)
})

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)
app.use('/api/auth', authRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})

app.use((error, req, res, next) => {
	const statusCode = error.statusCode || 500
	const message = error.message || 'Internal Server Error'
	res.status(statusCode).json({
		success: false,
		statusCode,
		message
	})
})
