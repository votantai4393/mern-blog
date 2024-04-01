import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		avatar: {
			type: String,
			default: 'https://th.bing.com/th/id/OIP.OesLvyzDO6AvU_hYUAT4IAHaHa'
		},
		isAdmin: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
)

export default mongoose.model('User', userSchema)
