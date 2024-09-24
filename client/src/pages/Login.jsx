import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/damztech-logo.svg'
import { useAuth } from '../context/AuthContext'

export default function Login() {
	const [inputs, setInputs] = useState({ email: '', password: '' })
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { login } = useAuth()

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
			navigate('/dashboard')
		} catch (err) {
			setError(err.response?.data?.message || 'Login failed. Please try again.')
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-white">
			<div className="flex flex-col items-center w-full max-w-[1200px] px-6">
				<img
					src={logo}
					alt="damztech-logo"
					className="w-32 md:w-40 lg:w-48 h-auto mb-6"
				/>
				<h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
					Support Desk
				</h1>
				<div className="w-full max-w-lg bg-gradient-to-b from-[#D9D9D9] to-[#737373] rounded-xl p-8 lg:p-12 flex flex-col items-center">
					<h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
						Login
					</h2>
					<div className="w-full mb-6">
						<h3 className="text-xl md:text-2xl mb-2">Email</h3>
						<input
							type="email"
							name="email"
							value={inputs.email}
							onChange={handleChange}
							required
							placeholder="admin@admin.com"
							className="w-full h-12 md:h-16 bg-[rgba(217,217,217,0.4)] rounded-lg text-lg md:text-xl px-4"
						/>
					</div>
					<div className="w-full mb-6">
						<h3 className="text-xl md:text-2xl mb-2">Password</h3>
						<input
							type="password"
							name="password"
							value={inputs.password}
							onChange={handleChange}
							required
							placeholder="*********************"
							className="w-full h-12 md:h-16 bg-[rgba(217,217,217,0.4)] rounded-lg text-lg md:text-xl px-4"
						/>
					</div>
					{error && (
						<p className="text-red-500 text-base md:text-lg mb-4">{error}</p>
					)}
					<div className="w-full flex justify-between text-sm md:text-lg text-[#D9D9D9] mb-6">
						<p>Forgot password?</p>
						<a href="#" className="text-gray-200">
							Reset password
						</a>
					</div>
					<button
						onClick={handleSubmit}
						className="w-full h-12 md:h-16 bg-[#D9D9D9] text-lg md:text-xl font-bold rounded-lg"
					>
						Login
					</button>
				</div>
			</div>
		</div>
	)
}
