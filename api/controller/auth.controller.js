import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'
import errorHandler from '../utils/errorHandler.js'

const signIn = async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		next(errorHandler(400, 'All fields are required'))
	}
	try {
		const user = await User.findOne({ email })

		if (!user) {
			next(errorHandler(404, 'User not found'))
		}

		const isMatch = await bcryptjs.compare(password, user.password)
		if (!isMatch) {
			next(errorHandler(401, 'Invalid password'))
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
		const { password: pass, ...others } = user._doc

		res
			.status(200)
			.cookie('access_token', token, { httpOnly: true })
			.json({ message: 'User logged in successfully', userInfo: others })
	} catch (error) {
		next(error)
	}
}

const signUp = async (req, res, next) => {
	const { email, password, username } = req.body

	if (!email || !password || !username) {
		next(errorHandler(400, 'All fields are required'))
	}

	try {
		const user = await User.findOne({ email })
		if (user) {
			next(errorHandler(409, 'User already exists'))
		}

		const hashedPassword = await bcryptjs.hash(password, 10)
		await new User({
			email,
			password: hashedPassword,
			username
		}).save()

		res.status(201).json({ message: 'User created successfully' })
	} catch (error) {
		next(error)
	}
}

const google = async (req, res, next) => {
	const { email, name, image } = req.body

	try {
		const user = await User.findOne({ email })
		if (user) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
			const { password: pass, ...others } = user._doc

			res
				.status(200)
				.cookie('access_token', token, { httpOnly: true })
				.json({ message: 'User logged in successfully', userInfo: others })
		} else {
			const newUser = new User({
				email,
				username: name,
				avatar
			})
			await newUser.save()
			const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
			const { password: pass, ...others } = newUser._doc
			res
				.status(200)
				.cookie('access_token', token, { httpOnly: true })
				.json({ message: 'User logged in successfully', userInfo: others })
		}
	} catch (error) {
		next(error)
	}
}

export { signIn, signUp, google }
