import { Button, Navbar, TextInput, Avatar, Dropdown } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/themeSlice'
import { signOutSuccess } from '../redux/userSlice'

export default function Header() {
	const dispatch = useDispatch()
	const { currentUser } = useSelector(state => state.user)
	const theme = useSelector(state => state.theme.theme)
	const location = useLocation().pathname
	const navigate = useNavigate()

	const handleSignOut = async () => {
		try {
			const res = await fetch('/api/user/sign-out', {
				method: 'POST'
			})
			const data = await res.json()
			if (!res.ok) {
				console.log(data.message)
			} else {
				dispatch(signOutSuccess())
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	return (
		<Navbar className="border-b-2">
			<Link
				className="self-center whitespace-nowrap text-sm sm:text-xl
			font-semibold dark:text-white"
			>
				<span
					className="px-2 py-1 bg-gradient-to-r from-indigo-500
				 via-purple-500 to-pink-500 text-white rounded-lg"
				>
					Hiusahald&apos;s
				</span>
				Blog
			</Link>
			<form>
				<TextInput
					type="text"
					placeholder="search..."
					rightIcon={AiOutlineSearch}
					className="hidden lg:inline"
				></TextInput>
			</form>
			<Button className="w-12 h-10 lg:hidden" color="gray" pill>
				<AiOutlineSearch />
			</Button>
			<div className="flex gap-2 md:order-2">
				<Button
					onClick={() => dispatch(toggleTheme())}
					className="w-12 h-10 hidden sm:inline"
					color="gray"
					pill
				>
					{theme === 'dark' ? <FaMoon /> : <FaSun />}
				</Button>
				{currentUser ? (
					<Dropdown
						arrowIcon={false}
						inline
						label={<Avatar alt="user" img={currentUser.avatar} rounded />}
					>
						<Dropdown.Header>
							<span className="block text-sm">@{currentUser.username}</span>
							<span className="block text-sm font-medium truncate">
								{currentUser.email}
							</span>
						</Dropdown.Header>
						<Link to={'/dashboard?tab=profile'}>
							<Dropdown.Item>Profile</Dropdown.Item>
						</Link>
						<Dropdown.Divider />
						<Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
					</Dropdown>
				) : (
					<Link to="/sign-in">
						<Button gradientDuoTone="purpleToBlue" outline>
							Sign In
						</Button>
					</Link>
				)}
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link active={location === '/'} as={'div'}>
					<Link to="/">Home</Link>
				</Navbar.Link>
				<Navbar.Link active={location === '/about'} as={'div'}>
					<Link to="/about">About</Link>
				</Navbar.Link>
				<Navbar.Link active={location === '/projects'} as={'div'}>
					<Link to="/projects">Projects</Link>
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	)
}
