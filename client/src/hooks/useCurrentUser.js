import { useState, useEffect } from 'react'

const useCurrentUser = () => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				const cachedUser = localStorage.getItem('currentUser')
				if (cachedUser) {
					setCurrentUser(JSON.parse(cachedUser))
					setLoading(false)
					return
				}

				const response = await fetch('http://localhost:5000/api/current-user', {
					credentials: 'include',
				})
				if (response.ok) {
					const userData = await response.json()
					setCurrentUser(userData)
					localStorage.setItem('currentUser', JSON.stringify(userData))
				} else {
					setError('Failed to fetch user data')
				}
			} catch (error) {
				setError('Could not fetch current user: ' + error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchCurrentUser()
	}, [])

	return { currentUser, loading, error }
}

export default useCurrentUser
