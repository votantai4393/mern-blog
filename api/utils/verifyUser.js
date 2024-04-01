import jwt from 'jsonwebtoken'
import errorHandler from './errorHandler.js'

function verifyUser(req, res, next) {
	const token = req.cookies.access_token

	if (!token) {
		return next(errorHandler(401, 'Please login first'))
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return next(errorHandler(401, 'Unauthorized'))
		req.user = user
		next()
	})
}

export default verifyUser
