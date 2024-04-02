import { AiFillGoogleCircle } from 'react-icons/ai'
import { Button } from 'flowbite-react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess, signInFailure } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleClick = async () => {
		const auth = getAuth(app)
		const provider = new GoogleAuthProvider()
		provider.setCustomParameters({
			prompt: 'select_account'
		})

		try {
			const result = await signInWithPopup(auth, provider)
			const { displayName, email, photoURL } = result.user

			const res = await fetch('/api/auth/google', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: displayName,
					email: email,
					avatar: photoURL
				})
			})
			const data = await res.json()
			if (res.ok) {
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
		<Button
			type="button"
			gradientDuoTone="pinkToOrange"
			outline
			onClick={handleClick}
		>
			<AiFillGoogleCircle className="w-6 h-6 mr-2 " />
			Continue with Google
		</Button>
	)
}
