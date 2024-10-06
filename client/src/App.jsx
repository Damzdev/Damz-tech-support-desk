import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Navigate,
} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Tickets from './pages/Tickets'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ActivityTracker from './components/ActivityTracker'
import InactivityWarning from './components/InactivityWarning'
import NotFound from './components/NotFound'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path="/"
				element={
					<AuthWrapper>
						{(isAuthenticated) =>
							isAuthenticated ? (
								<Navigate to="/home" replace />
							) : (
								<Navigate to="/login" replace />
							)
						}
					</AuthWrapper>
				}
			/>
			<Route path="/login" element={<Login />} />

			{/* Protected routes */}
			<Route element={<ProtectedRoute />}>
				<Route element={<Layout />}>
					<Route path="home" element={<Dashboard />} />
					<Route path="users" element={<Users />} />
					<Route path="tickets" element={<Tickets />} />
					<Route path="orders" element={<Orders />} />
					<Route path="products" element={<Products />} />
					<Route path="profile" element={<Profile />} />
					<Route path="settings" element={<Settings />} />
					<Route path="tickets/:ticketId" element={<Tickets />} />
				</Route>
			</Route>

			<Route path="*" element={<NotFound />} />
		</>
	)
)

function AuthWrapper({ children }) {
	const { isAuthenticated } = useAuth()
	return children(isAuthenticated)
}

export default function App() {
	return (
		<AuthProvider>
			<ActivityTracker />
			<RouterProvider router={router} />
			<InactivityWarning />
		</AuthProvider>
	)
}
