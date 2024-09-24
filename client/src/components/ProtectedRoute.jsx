import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) {
		// You might want to show a loading spinner here
		return <div>Loading...</div>
	}

	if (!isAuthenticated) {
		// Redirect to login page if not authenticated
		return <Navigate to="/" replace />
	}

	// Render child routes if authenticated
	return <Outlet />
}

export default ProtectedRoute
