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

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	)
}

export default App
