import Post from '../model/post.model.js'
import errorHandler from '../utils/errorHandler.js'

const getPosts = async (req, res, next) => {
	let { startIndex, limit, sort, category, search, slug, userId, postId } =
		req.query

	startIndex = parseInt(startIndex) || 0
	limit = parseInt(limit) || 9
	sort = sort === 'asc' ? 1 : -1

	const template = {
		...(userId && { userId }),
		...(category && { category }),
		...(slug && { slug }),
		...(postId && { _id: postId }),
		...(search && {
			$or: [
				{ title: { $regex: search, $options: 'i' } },
				{ content: { $regex: search, $options: 'i' } }
			]
		})
	}

	const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))

	try {
		const posts = await Post.find(template)
			.sort({ updateAt: sort })
			.skip(startIndex)
			.limit(limit)

		const totalPosts = await Post.countDocuments()

		const lastMonthPosts = await Post.countDocuments({
			createdAt: {
				$gte: lastMonth
			}
		})

		res.status(200).json({
			posts,
			totalPosts,
			lastMonthPosts,
			message: 'Posts fetched successfully'
		})
	} catch (error) {
		next(error)
	}
}

const createPost = async (req, res, next) => {
	const { id, isAdmin } = req.user
	const { title, content } = req.body

	if (!isAdmin) {
		return next(
			errorHandler(403, 'You are not authorized to perform this action')
		)
	}

	if (!title || !content) {
		return next(errorHandler(400, 'Please provide title and content'))
	}

	const slug = title
		.split(' ')
		.join('')
		.toLowerCase()
		.replace(/[^a-zA-Z0-9-]/g, '')

	const post = new Post({
		...req.body,
		userId: id,
		slug
	})

	try {
		await post.save()
		res.status(201).json({ message: 'Post created successfully', post })
	} catch (error) {
		next(error)
	}
}
const updatePost = async (req, res, next) => {
	const { id, isAdmin } = req.user
	const { title, content, image, category } = req.body
	if (!isAdmin || id !== req.params.id) {
		return next(
			errorHandler(403, 'You are not authorized to perform this action')
		)
	}

	try {
		const post = await Post.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					title,
					content,
					image,
					category
				}
			},
			{ new: true }
		)
		res.status(200).json({ message: 'Post updated successfully', post })
	} catch (error) {
		next(error)
	}
}
const deletePost = async (req, res, next) => {
	const { id, isAdmin } = req.user

	if (!isAdmin || id !== req.params.userId) {
		return next(errorHandler(403, 'You are not allowed to delete this post'))
	}

	try {
		await Post.findByIdAndDelete(req.params.postId)

		res.status(200).json('The post has been deleted')
	} catch (error) {
		next(error)
	}
}

export { getPosts, createPost, updatePost, deletePost }
