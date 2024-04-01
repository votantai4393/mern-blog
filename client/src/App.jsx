import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Search from './pages/Search'
import PostPage from './pages/PostPage'
import UpdatePost from './pages/UpdatePost'
import CreatePost from './pages/CreatePost'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivate from './components/OnlyAdminPrivate'
import ScrollToTop from './components/ScrollToTop'

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route element={<PrivateRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
				<Route element={<OnlyAdminPrivate />}>
					<Route path="/create-post" element={<CreatePost />} />
					<Route path="/update-post/:id" element={<UpdatePost />} />
				</Route>
				<Route path="/search" element={<Search />} />
				<Route path="/post/:slug" element={<PostPage />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App
