import { Link, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Spinner, Alert } from 'flowbite-react'
import OAuth from '../components/OAuth'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signInFailure, signInSuccess, signInStart } from '../redux/userSlice'

export default function SignIn() {
	const [formData, setFormData] = useState({})
	const { loading, error } = useSelector(state => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleChange = e => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if (!formData.email || !formData.password) {
			return dispatch(signInFailure('All fields are required'))
		}

		try {
			dispatch(signInStart())
			const response = await fetch('/api/auth/sign-in', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			})
			const data = await response.json()
			if (response.ok) {
				dispatch(signInSuccess(data))
				navigate('/')
			} else {
				dispatch(signInFailure(data.message))
				console.log(data.message)
			}
		} catch (error) {
			dispatch(signInFailure(error.message))
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
								'Sign in'
							)}
						</Button>
						<OAuth />
					</form>
					<div className="flex gap-2 text-sm mt-5">
						<span>Not have an account?</span>
						<Link className="text-blue-500" to="/sign-up">
							Sign up
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
