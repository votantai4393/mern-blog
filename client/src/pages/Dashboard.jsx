import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DashSidebar from '../components/Dashboard/DashSidebar'
import DashProfile from '../components/Dashboard/DashProfile'
import DashPosts from '../components/Dashboard/DashPosts'
import DashUsers from '../components/Dashboard/DashUsers'
import DashComments from '../components/Dashboard/DashComments'
import DashboardComp from '../components/Dashboard/DashboardComp'

function Dashboard() {
	const location = useLocation()
	const [tab, setTab] = useState('profile')

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search)
		const tabUrl = urlParams.get('tab')
		tabUrl ?? setTab(tabUrl)
	}, [location.search])

	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			<div className="md:w-56">
				<DashSidebar />
			</div>
			{tab === 'profile' && <DashProfile />}
			{tab === 'posts' && <DashPosts />}
			{tab === 'users' && <DashUsers />}
			{tab === 'comments' && <DashComments />}
			{tab === 'dash' && <DashboardComp />}
		</div>
	)
}

export default Dashboard
