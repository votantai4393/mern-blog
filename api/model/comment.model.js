import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true
		},
		userId: {
			type: String,
			required: true
		},
		postId: {
			type: String,
			required: true
		},
		likedUsers: {
			type: Array,
			default: []
		},
		likes: {
			type: Number,
			default: 0
		}
	},
	{
		timestamps: true
	}
)

export default mongoose.model('Comment', commentSchema)
