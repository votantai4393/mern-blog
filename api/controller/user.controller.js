import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import errorHandler from '../utils/errorHandler.js'

const signOut = (req, res, next) => {
	try {
		res
			.clearCookie('access_token')
			.status(200)
			.json({ message: 'User logged out successfully' })
	} catch (error) {
		next(error)
	}
}

const updateUser = async (req, res, next) => {
	const { password, username, avatar, email } = req.body
	const { id } = req.user

	if (req.params.id !== id) {
		return next(errorHandler(403, 'You can only update your own profile'))
	}

	if (password && password.length < 6) {
		return next(errorHandler(400, 'Password must be at least 6 characters'))
	}

	if (
		username &&
		username.length < 3 &&
		username.length > 20 &&
		username.include('') &&
		username !== username.toLowerCase() &&
		!username.match(/^[a-zA-Z0-9]+$/)
	) {
		return next(
			errorHandler(
				400,
				"Username must be between 3 and 20 characters, don't include spaces and must be all lowercase"
			)
		)
	}

	try {
		const hashedPassword = await bcryptjs.hash(password, 10)

		const user = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					username,
					password: hashedPassword,
					email,
					avatar
				}
			},
			{ new: true }
		)

		const { password: pass, ...others } = user._doc

		res
			.status(200)
			.json({ message: 'User updated successfully', userInfo: others })
	} catch (error) {
		next(error)
	}
}

const deleteUser = async (req, res, next) => {
	const { id, isAdmin } = req.user

	if (id !== req.params.id && !isAdmin) {
		return next(errorHandler(403, 'You can only delete your own account'))
	}

	try {
		await User.findByIdAndDelete(req.params.id)

		res.status(200).json({ message: 'User deleted successfully' })
	} catch (error) {
		next(error)
	}
}

const getUsers = async (req, res, next) => {
	const { isAdmin } = req.user
	let { startIndex, limit, sort } = req.query

	startIndex = parseInt(startIndex) || 0
	limit = parseInt(limit) || 9
	sortDirection = sort === 'asc' ? 1 : -1

	const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))

	if (!isAdmin) {
		return next(
			errorHandler(403, 'You are not authorized to perform this action')
		)
	}

	try {
		const users = await User.find()
			.sort({ createdAt: sortDirection })
			.skip(startIndex)
			.limit(limit)

		const usersWithoutPassword = users.map(user => {
			const { password: pass, ...others } = user._doc
			return others
		})

		const totalUsers = await User.countDocuments()

		const lastMonthUsers = await User.countDocuments({
			createdAt: {
				$gte: lastMonth
			}
		})

		res.status(200).json({
			users: usersWithoutPassword,
			totalUsers,
			lastMonthUsers,
			message: 'Users fetched successfully'
		})
	} catch (error) {
		next(error)
	}
}

const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user) {
			return next(errorHandler(404, 'User not found'))
		}
		const { password: pass, ...others } = user._doc
		res.status(200).json({ message: 'User found', userInfo: others })
	} catch (error) {
		next(error)
	}
}

export { signOut, updateUser, deleteUser, getUsers, getUser }
