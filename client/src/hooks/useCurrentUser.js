import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const useCurrentUser = () => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const { isAuthenticated } = useAuth()

	const fetchCurrentUser = async () => {
		setLoading(true)
		try {
			const response = await fetch('http://localhost:5000/api/current-user', {
				credentials: 'include',
			})
			if (response.ok) {
				const userData = await response.json()
				setCurrentUser(userData)
				localStorage.setItem('currentUser', JSON.stringify(userData))
			} else {
				setError('Failed to fetch user data')
				localStorage.removeItem('currentUser')
			}
		} catch (error) {
			setError('Could not fetch current user: ' + error.message)
			localStorage.removeItem('currentUser')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (isAuthenticated) {
			fetchCurrentUser()
		} else {
			setCurrentUser(null)
			localStorage.removeItem('currentUser')
			setLoading(false)
		}
	}, [isAuthenticated])

	return { currentUser, loading, error, refetchUser: fetchCurrentUser }
}

export default useCurrentUser
