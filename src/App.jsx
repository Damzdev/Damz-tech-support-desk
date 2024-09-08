import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './pages/Dashboard' // Assuming you have a Dashboard page
import { AuthProvider } from './context/AuthContext'
import ProtectedRouteWrapper from './utils/ProtectedRouteWrapper'

const ProtectedDashboard = ProtectedRouteWrapper(Dashboard)

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Login />}>
			<Route path="dashboard" element={<ProtectedDashboard />} />
		</Route>
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
