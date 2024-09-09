import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'

const ProtectedRouteWrapper = (Component) => {
	return (props) => (
		<ProtectedRoute>
			<Component {...props} />
		</ProtectedRoute>
	)
}

export default ProtectedRouteWrapper
