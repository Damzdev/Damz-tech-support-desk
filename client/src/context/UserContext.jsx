import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

const CACHE_EXPIRATION = 5 * 60 * 1000 // 5 minutes in milliseconds

export const UserProvider = ({ children }) => {
	const [users, setUsers] = useState([])
	const [employees, setEmployees] = useState([])

	useEffect(() => {
		fetchUsers()
		fetchEmployees()
	}, [])

	const fetchUsers = async () => {
		try {
			const cachedData = JSON.parse(localStorage.getItem('cachedUsers'))
			if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
				setUsers(cachedData.data)
			} else {
				const response = await fetch('http://localhost:5000/api/customers')
				if (!response.ok) throw new Error('Failed to fetch users')
				const data = await response.json()
				setUsers(data)
				localStorage.setItem(
					'cachedUsers',
					JSON.stringify({ data, timestamp: Date.now() })
				)
			}
		} catch (error) {
			console.error('Error fetching users:', error)
		}
	}

	const fetchEmployees = async () => {
		try {
			const cachedData = JSON.parse(localStorage.getItem('cachedEmployees'))
			if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
				setEmployees(cachedData.data)
			} else {
				const response = await fetch('http://localhost:5000/api/users')
				if (!response.ok) throw new Error('Failed to fetch employees')
				const data = await response.json()
				setEmployees(data)
				localStorage.setItem(
					'cachedEmployees',
					JSON.stringify({ data, timestamp: Date.now() })
				)
			}
		} catch (error) {
			console.error('Error fetching employees:', error)
		}
	}

	return (
		<UserContext.Provider value={{ users, employees, setUsers, setEmployees }}>
			{children}
		</UserContext.Provider>
	)
}
