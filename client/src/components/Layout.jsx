import { useState, useEffect } from 'react'
import { useNavigate, Outlet, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/damztech-logo.svg'
import homeIcon from '../assets/home-icon.svg'
import usersIcon from '../assets/users-icon.svg'
import ticketsIcon from '../assets/tickets-icon.svg'
import ordersIcon from '../assets/orders-icon.svg'
import productsIcon from '../assets/products-icon.svg'
import profileIcon from '../assets/profile-icon.svg'
import settingsIcon from '../assets/settings-icon.svg'
import signOutIcon from '../assets/sign-out-icon.svg'
import useCurrentUser from '../hooks/useCurrentUser'

export default function Layout() {
	const { logout, isAuthenticated } = useAuth()
	const { currentUser, loading, error } = useCurrentUser()
	const navigate = useNavigate()

	const navItems = [
		{ icon: homeIcon, label: 'Home' },
		{ icon: usersIcon, label: 'Users' },
		{ icon: ticketsIcon, label: 'Tickets' },
		{ icon: ordersIcon, label: 'Orders' },
		{ icon: productsIcon, label: 'Products' },
		{ icon: profileIcon, label: 'Profile' },
		{ icon: settingsIcon, label: 'Settings' },
	]

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login')
		}
	}, [isAuthenticated, navigate])

	const handleLogout = async () => {
		try {
			await logout()
			navigate('/login')
		} catch (error) {
			console.error('Logout failed:', error)
		}
	}

	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<header className="bg-white flex-shrink-0">
				<div className="mx-auto py-4 pl-0 px-10 flex justify-between items-center">
					<img
						src={logo}
						alt="Logo"
						className="w-24 md:w-32 lg:w-40 xl:w-48 2xl:w-56 max-w-full h-auto"
					/>
					<h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
						Support Desk
					</h1>
					<div className="flex space-x-4">
						<div className="relative">
							<div className="w-10 h-10 md:w-12 md:h-12 bg-[#D9D9D9] flex items-center justify-center rounded-full cursor-pointer">
								<svg
									width="30"
									height="30"
									viewBox="0 0 48 48"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="text-[#1E1E1E]"
								>
									               {' '}
									<path
										d="M27.46 42C27.1084 42.6062 26.6037 43.1093 25.9965 43.4591C25.3892 43.8088 24.7008 43.9929 24 43.9929C23.2992 43.9929 22.6108 43.8088 22.0035 43.4591C21.3963 43.1093 20.8916 42.6062 20.54 42M36 16C36 12.8174 34.7357 9.76516 32.4853 7.51472C30.2348 5.26428 27.1826 4 24 4C20.8174 4 17.7652 5.26428 15.5147 7.51472C13.2643 9.76516 12 12.8174 12 16C12 30 6 34 6 34H42C42 34 36 30 36 16Z"
										stroke="currentColor"
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									             {' '}
								</svg>
							</div>
							<div className="absolute top-1 right-1.5 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white text-xs md:text-sm font-semibold flex items-center justify-center rounded-full cursor-pointer transform translate-x-1/2 -translate-y-1/2">
								3
							</div>
						</div>
						<div className="w-10 h-10 md:w-12 md:h-12 bg-custom-gradient flex items-center justify-center rounded-full">
							<span className="text-white text-lg md:text-xl font-semibold">
								{currentUser
									? currentUser.name
											.split(' ')
											.map((n) => n[0])
											.join('')
									: 'G'}
							</span>
						</div>
					</div>
				</div>
			</header>
			<div className="flex flex-grow">
				<nav className="w-32 md:w-40 lg:w-48 xl:w-52 2xl:w-54 flex-shrink-0 bg-white p-4 hidden md:block">
					{navItems.map((item, index) => (
						<NavLink
							key={index}
							to={`/${item.label.toLowerCase()}`}
							className={({ isActive }) =>
								`flex items-center p-2 rounded-lg cursor-pointer mb-2 ${
									isActive ? 'bg-[#D9D9D9]' : 'hover:bg-[#D9D9D9]'
								}`
							}
						>
							<img
								src={item.icon}
								alt={`${item.label}-icon`}
								className="w-6 mr-3"
							/>
							<span className="font-medium">{item.label}</span>
						</NavLink>
					))}
					<div
						className="flex items-center mt-8 p-2 cursor-pointer transform transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
						onClick={handleLogout}
					>
						<img src={signOutIcon} alt="sign-out-icon" className="w-6 mr-1" />
						<span className="font-bold text-[#FF2D55]">Sign Out</span>
					</div>
				</nav>

				<main className="flex-grow overflow-auto">
					<Outlet />
				</main>
			</div>
		</div>
	)
}
