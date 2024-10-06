import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCurrentUser from '../hooks/useCurrentUser'
import TicketCard from '../components/TicketCard'

export default function Dashboard() {
	const { currentUser, loading, error } = useCurrentUser()
	const [recentTickets, setRecentTickets] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const fetchRecentTickets = async () => {
			// Check if cached data exists and is less than 5 minutes old
			const cachedData = localStorage.getItem('recentTickets')
			const cachedTime = localStorage.getItem('recentTicketsTime')
			const now = new Date().getTime()

			if (cachedData && cachedTime && now - cachedTime < 5 * 60 * 1000) {
				setRecentTickets(JSON.parse(cachedData))
			} else {
				try {
					const response = await fetch('http://localhost:5000/api/tickets')
					if (!response.ok) {
						throw new Error('Network response was not ok')
					}
					const data = await response.json()
					setRecentTickets(data)

					// Cache the new data
					localStorage.setItem('recentTickets', JSON.stringify(data))
					localStorage.setItem('recentTicketsTime', now.toString())
				} catch (error) {
					console.error('Could not fetch recent tickets:', error)
				}
			}
		}

		fetchRecentTickets()
	}, [])

	const handleTicketClick = (ticketId) => {
		navigate(`/tickets?selectedTicket=${ticketId}`)
	}

	return (
		<div className="bg-custom-gradient-dashboard rounded-tl-lg h-full p-6 overflow-auto max-h-[calc(100vh-100px)]">
			<h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
				{`Welcome back, ${currentUser?.name?.split(' ')[0]}!`}
			</h1>
			<hr className="border-t-2 border-white w-full my-4" />
			<h3 className="text-white p-4 text-xl md:text-2xl lg:text-3xl mb-4">
				Recent Support tickets
			</h3>
			<div className="flex flex-wrap">
				{recentTickets.map((ticket) => (
					<TicketCard
						key={ticket.id}
						ticket={ticket}
						onClick={() => handleTicketClick(ticket.id)}
					/>
				))}
			</div>
		</div>
	)
}
