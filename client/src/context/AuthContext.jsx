import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await axios.get(
					'http://localhost:5000/api/check-auth',
					{
						withCredentials: true,
					}
				)
				setIsAuthenticated(response.data.isAuthenticated)
			} catch (error) {
				console.error('Auth check failed:', error)
				setIsAuthenticated(false)
			} finally {
				setIsLoading(false)
			}
		}

		checkAuthStatus()
	}, [])

	const login = async (email, password) => {
		try {
			const response = await axios.post(
				'http://localhost:5000/api/login',
				{ email, password },
				{ withCredentials: true }
			)
			setIsAuthenticated(true)
			return response.data
		} catch (error) {
			console.error('Login failed:', error)
			throw error
		}
	}

	const logout = async () => {
		try {
			await axios.post(
				'http://localhost:5000/api/logout',
				{},
				{ withCredentials: true }
			)
			setIsAuthenticated(false)
		} catch (error) {
			console.error('Logout failed:', error)
		}
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
