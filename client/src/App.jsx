import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Layout from './components/Layout'
import Users from './pages/Users'
import ActivityTracker from './components/ActivityTracker'
import InactivityWarning from './components/InactivityWarning'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* Public route for login */}
			<Route path="/" element={<Login />} />

			{/* Protected routes */}
			<Route element={<ProtectedRoute />}>
				<Route path="dashboard" element={<Layout />} />
				<Route path="users" element={<Users />} />
			</Route>
		</>
	)
)

export default function App() {
	return (
		<AuthProvider>
			<ActivityTracker />
			<RouterProvider router={router} />
			<InactivityWarning />
		</AuthProvider>
	)
}
