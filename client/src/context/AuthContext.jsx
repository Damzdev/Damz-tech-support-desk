import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
} from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [timeRemaining, setTimeRemaining] = useState(60)
	const [isWarningActive, setIsWarningActive] = useState(false)
	const logoutTimerRef = useRef()
	const warningTimerRef = useRef()

	useEffect(() => {
		checkAuthStatus()
		return () => {
			if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current)
			if (warningTimerRef.current) clearInterval(warningTimerRef.current)
		}
	}, [])

	const checkAuthStatus = async () => {
		try {
			const response = await axios.get('http://localhost:5000/api/check-auth', {
				withCredentials: true,
			})
			setIsAuthenticated(response.data.isAuthenticated)
			if (response.data.isAuthenticated) {
				resetLogoutTimer()
			}
		} catch (error) {
			console.error('Auth check failed:', error)
			setIsAuthenticated(false)
		} finally {
			setIsLoading(false)
		}
	}

	const login = async (email, password) => {
		try {
			const response = await axios.post(
				'http://localhost:5000/api/login',
				{ email, password },
				{ withCredentials: true }
			)
			setIsAuthenticated(true)
			resetLogoutTimer()
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
			setIsWarningActive(false)
			if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current)
		} catch (error) {
			console.error('Logout failed:', error)
		}
	}

	const resetLogoutTimer = () => {
		if (isWarningActive) return

		if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current)
		if (warningTimerRef.current) clearInterval(warningTimerRef.current)

		const totalTime = 10 * 60
		const warningTime = 60

		setTimeRemaining(totalTime)
		setIsWarningActive(false)

		logoutTimerRef.current = setTimeout(() => {
			logout()
		}, totalTime * 1000)

		warningTimerRef.current = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev <= warningTime && !isWarningActive) {
					setIsWarningActive(true)
				}
				if (prev <= 0) {
					clearInterval(warningTimerRef.current)
					return 0
				}
				return prev - 1
			})
		}, 1000)
	}

	const extendSession = () => {
		setIsWarningActive(false)
		resetLogoutTimer()
	}

	const value = {
		isAuthenticated,
		isLoading,
		login,
		logout,
		resetLogoutTimer,
		extendSession,
		timeRemaining,
		isWarningActive,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
