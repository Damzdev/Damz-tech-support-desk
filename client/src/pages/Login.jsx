import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../assets/damztech-logo.svg'
import { useAuth } from '../context/AuthContext'
import { CircularProgress } from '@mui/material'
import useCurrentUser from '../hooks/useCurrentUser'

export default function Login() {
	const [inputs, setInputs] = useState({ email: '', password: '' })
	const [error, setError] = useState('')
	const { login, isLoginLoading, isAuthenticated } = useAuth()
	const navigate = useNavigate()
	const {
		currentUser,
		loading,
		error: userError,
		refetchUser,
	} = useCurrentUser()

	const handleChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await login(inputs.email, inputs.password)
			await refetchUser()
			navigate('/home')
		} catch (err) {
			setError(err.response?.data?.message || 'Invalid email or password')
		}
	}

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/home')
		}
	}, [isAuthenticated, navigate])

	return (
		<div className="flex items-center justify-center min-h-screen bg-white">
			<div className="flex flex-col items-center w-full max-w-[1000px] 2xl:max-w-[1200px] px-4 sm:px-6">
				<img
					src={logo}
					alt="damztech-logo"
					className="w-24 sm:w-28 md:w-32 lg:w-36 2xl:w-48 h-auto mb-4 2xl:mb-6"
				/>
				<h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold mb-4 2xl:mb-6 text-center">
					Support Desk
				</h1>
				<div className="w-full max-w-md 2xl:max-w-lg bg-gradient-to-b from-[#D9D9D9] to-[#737373] rounded-xl p-6 sm:p-8 2xl:p-12 flex flex-col items-center">
					<h2 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-semibold mb-6 2xl:mb-8 text-center">
						Login
					</h2>
					<div className="w-full mb-4 2xl:mb-6">
						<h3 className="text-base sm:text-lg md:text-xl 2xl:text-2xl mb-2">
							Email
						</h3>
						<input
							type="email"
							name="email"
							value={inputs.email}
							onChange={handleChange}
							required
							placeholder="admin@admin.com"
							className="w-full h-10 sm:h-12 md:h-14 2xl:h-16 bg-white rounded-lg text-sm sm:text-base md:text-lg 2xl:text-xl px-4"
						/>
					</div>
					<div className="w-full mb-4 2xl:mb-6">
						<h3 className="text-base sm:text-lg md:text-xl 2xl:text-2xl mb-2">
							Password
						</h3>
						<input
							type="password"
							name="password"
							value={inputs.password}
							onChange={handleChange}
							required
							placeholder="*********************"
							className="w-full h-10 sm:h-12 md:h-14 2xl:h-16 bg-white rounded-lg text-sm sm:text-base md:text-lg 2xl:text-xl px-4"
						/>
					</div>
					{error && (
						<p className="text-red-500 text-xs sm:text-sm md:text-base 2xl:text-lg mb-4">
							{error}
						</p>
					)}
					<div className="w-full flex font-semibold justify-between text-xs sm:text-sm 2xl:text-lg text-[#D9D9D9] mb-4 2xl:mb-6">
						<p>Forgot password?</p>
						<a href="#" className="text-black font-semibold">
							Reset password
						</a>
					</div>
					<button
						onClick={handleSubmit}
						disabled={isLoginLoading}
						className="w-full h-10 sm:h-12 md:h-14 2xl:h-16 bg-[#D9D9D9] hover:bg-[#C0C0C0] text-sm sm:text-base md:text-lg 2xl:text-xl font-bold rounded-lg flex items-center justify-center"
					>
						{isLoginLoading ? (
							<CircularProgress size={24} color="inherit" />
						) : (
							'Login'
						)}
					</button>
				</div>
			</div>
		</div>
	)
}
