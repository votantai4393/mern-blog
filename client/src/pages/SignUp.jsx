import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

export default function SignUp() {
	const [formData, setFormData] = useState({})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleChange = e => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if (!formData.username || !formData.email || !formData.password) {
			setError('All fields are required')
			return
		}

		try {
			setLoading(true)
			setError(null)

			const response = await fetch('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			})
			const data = await response.json()
			if (data.success === false) {
				return setError(data.message)
			}
			setLoading(false)
			if (response.ok) {
				navigate('/sign-in')
			}
		} catch (error) {
			setError(error.message)
			setLoading(false)
		}
	}

	return (
		<div className="mt-20 min-h-screen">
			<div className="flex mx-auto max-w-3xl p-3 flex-col md:flex-row md:items-center gap-5">
				{/* left side */}
				<div className="flex-1">
					<Link className="text-4xl font-semibold dark:text-white">
						<span
							className="px-2 py-1 bg-gradient-to-r from-indigo-500
								 via-purple-500 to-pink-500 text-white rounded-lg"
						>
							Hiusahald&apos;s
						</span>
						Blog
					</Link>
					<div className="text-sm mt-5">
						This is a demo project. You can sign up with your email and password
						or with Google.
					</div>
				</div>

				{/* right side */}
				<div className="flex-1">
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<div>
							<Label value="Your username" />
							<TextInput
								id="username"
								onChange={handleChange}
								placeholder="Username"
								type="text"
							/>
						</div>
						<div>
							<Label value="Your email" />
							<TextInput
								id="email"
								onChange={handleChange}
								placeholder="Email"
								type="email"
							/>
						</div>
						<div>
							<Label value="Your password" />
							<TextInput
								id="password"
								onChange={handleChange}
								placeholder="Password"
								type="password"
							/>
						</div>
						<Button
							type="submit"
							disabled={loading}
							gradientDuoTone="purpleToPink"
						>
							{loading ? (
								<>
									<Spinner size={'md'} />{' '}
									<span className="pl-3">Loading...</span>
								</>
							) : (
								'Sign up'
							)}
						</Button>
						<OAuth />
					</form>
					<div className="flex gap-2 text-sm mt-5">
						<span>Have an account?</span>
						<Link className="text-blue-500" to="/sign-in">
							Sign in
						</Link>
					</div>
					{error && (
						<Alert className="mt-5" color={'failure'}>
							{error}
						</Alert>
					)}
				</div>
			</div>
		</div>
	)
}
