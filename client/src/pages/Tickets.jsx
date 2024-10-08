import React, { useEffect, useState, useCallback, useRef } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import CustomCheckbox from '../components/CustomCheckbox'
import Pagination from '../components/Pagination'
import TicketDetails from '../components/TicketDetails'
import { useLocation, useNavigate } from 'react-router-dom'

const statusColors = {
	Open: 'bg-[#174CD6]',
	Resolved: 'bg-[#24882E]',
	Closed: 'bg-[#B3261E]',
	'On Hold': 'bg-[#E97A14]',
}

const sidebarItems = [
	'All tickets',
	'Unassigned tickets',
	'My open tickets',
	'Open',
	'On Hold',
	'Resolved',
	'Closed',
	'Spam',
]

export default function Tickets() {
	const [selectAll, setSelectAll] = useState(false)
	const [selectedTickets, setSelectedTickets] = useState({})
	const [selectedTicket, setSelectedTicket] = useState(null)
	const [tickets, setTickets] = useState([])
	const [employees, setEmployees] = useState([])
	const { currentUser, loading, error } = useCurrentUser()
	const [filteredTickets, setFilteredTickets] = useState([])
	const [currentFilter, setCurrentFilter] = useState('All tickets')
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const ticketsCache = useRef(null)
	const location = useLocation()
	const params = new URLSearchParams(location.search)
	const selectedTicketId = params.get('selectedTicket')
	const navigate = useNavigate()

	useEffect(() => {
		if (selectedTicketId) {
			const ticket = tickets.find((t) => t.id === selectedTicketId)
			if (ticket) {
				setSelectedTicket(ticket)
			}
		}
	}, [selectedTicketId, tickets])

	const fetchEmployees = useCallback(async () => {
		try {
			const response = await fetch('http://localhost:5000/api/users')
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			const data = await response.json()
			setEmployees(data)
		} catch (error) {
			console.log(`Could not fetch employees: ${error}`)
		}
	}, [])

	useEffect(() => {
		fetchEmployees()
	}, [fetchEmployees])

	const fetchTickets = useCallback(async () => {
		try {
			const response = await fetch('http://localhost:5000/api/tickets')
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			const data = await response.json()

			// Update the cache
			ticketsCache.current = data
			localStorage.setItem('cachedTickets', JSON.stringify(data))

			setTickets(data)
			setFilteredTickets(data)
		} catch (error) {
			console.log(`Could not fetch tickets: ${error}`)
		}
	}, [])

	useEffect(() => {
		// Try to load cached data first
		const cachedData = localStorage.getItem('cachedTickets')
		if (cachedData) {
			const parsedData = JSON.parse(cachedData)
			ticketsCache.current = parsedData
			setTickets(parsedData)
			setFilteredTickets(parsedData)
		}

		// Fetch fresh data
		fetchTickets()

		// Set up an interval to fetch tickets every 5 minutes
		const intervalId = setInterval(() => {
			fetchTickets()
		}, 5 * 60 * 1000) // 5 minutes in milliseconds

		// Clean up the interval when the component unmounts
		return () => clearInterval(intervalId)
	}, [fetchTickets])

	useEffect(() => {
		filterTickets(currentFilter)
	}, [tickets, currentFilter])

	const filterTickets = (filter) => {
		let filtered = []
		// Use the cached data if available, otherwise use the state
		const ticketsToFilter = ticketsCache.current || tickets
		const currentUserFirstName = currentUser?.name.split(' ')[0]

		switch (filter) {
			case 'All tickets':
				filtered = ticketsToFilter
				break
			case 'Unassigned tickets':
				filtered = ticketsToFilter.filter(
					(ticket) => ticket.assignedEmployeeId === ''
				)
				break
			case 'My open tickets':
				filtered = ticketsToFilter.filter(
					(ticket) =>
						getAssignedEmployeeFirstName(ticket.assignedEmployeeId) ===
							currentUserFirstName && ticket.status === 'Open'
				)
				break
			case 'Open':
				filtered = ticketsToFilter.filter((ticket) => ticket.status === 'Open')
				break
			case 'On Hold':
				filtered = ticketsToFilter.filter(
					(ticket) => ticket.status === 'On Hold'
				)
				break
			case 'Resolved':
				filtered = ticketsToFilter.filter(
					(ticket) => ticket.status === 'Resolved'
				)
				break
			case 'Closed':
				filtered = ticketsToFilter.filter(
					(ticket) => ticket.status === 'Closed'
				)
				break
			case 'Spam':
				filtered = ticketsToFilter.filter((ticket) => ticket.status === 'Spam')
				break
			default:
				filtered = ticketsToFilter
		}
		setFilteredTickets(filtered)
	}

	const formatTimeAgo = (timestamp) => {
		const now = new Date()
		const messageTime = new Date(timestamp * 1000)
		const diffInSeconds = Math.floor((now - messageTime) / 1000)

		if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
		if (diffInSeconds < 3600)
			return `${Math.floor(diffInSeconds / 60)} minutes ago`
		if (diffInSeconds < 86400)
			return `${Math.floor(diffInSeconds / 3600)} hours ago`
		return `${Math.floor(diffInSeconds / 86400)} days ago`
	}

	const handleSelectAll = () => {
		const newSelectAll = !selectAll
		setSelectAll(newSelectAll)
		const newSelectedTickets = {}
		tickets.forEach((ticket) => {
			newSelectedTickets[ticket.id] = newSelectAll
		})
		setSelectedTickets(newSelectedTickets)
	}

	const handleSelectTicket = (id) => {
		setSelectedTickets((prev) => {
			const newSelectedTickets = { ...prev, [id]: !prev[id] }
			const allSelected = tickets.every(
				(ticket) => newSelectedTickets[ticket.id]
			)
			setSelectAll(allSelected)

			return newSelectedTickets
		})
	}

	const handleTicketClick = (ticket) => {
		setSelectedTicket(ticket)
		navigate(`/tickets/${ticket.id}`)
	}

	const getCurrentPageItems = () => {
		const indexOfLastItem = currentPage * itemsPerPage
		const indexOfFirstItem = indexOfLastItem - itemsPerPage
		return filteredTickets.slice(indexOfFirstItem, indexOfLastItem)
	}

	const getAssignedEmployeeFirstName = (employeeId) => {
		const employee = employees.find((emp) => emp.id === employeeId)
		return employee ? employee.name.split(' ')[0] : 'Unassigned'
	}

	const handleFilterChange = (filter) => {
		setCurrentFilter(filter)
		setCurrentPage(1)
	}

	const updateTicketInState = (updatedTicket) => {
		setTickets((prevTickets) =>
			prevTickets.map((ticket) =>
				ticket.id === updatedTicket.id ? updatedTicket : ticket
			)
		)
		// Also update the cache
		if (ticketsCache.current) {
			ticketsCache.current = ticketsCache.current.map((ticket) =>
				ticket.id === updatedTicket.id ? updatedTicket : ticket
			)
			localStorage.setItem(
				'cachedTickets',
				JSON.stringify(ticketsCache.current)
			)
		}
	}

	useEffect(() => {
		filterTickets(currentFilter)
	}, [tickets, currentFilter])

	return (
		<div className="h-full max-h-[calc(100vh-100px)] overflow-auto rounded-tl-lg ">
			{selectedTicket ? (
				<TicketDetails
					ticket={selectedTicket}
					onClose={() => setSelectedTicket(null)}
					updateTicket={updateTicketInState}
				/>
			) : (
				<div className="flex bg-[#0066FF] bg-opacity-15 rounded-tl-lg h-full">
					{/* Sidebar */}
					<div className="w-48 border border-r-1 border-r-[#999999] border-opacity-50">
						<h2 className="font-semibold text-3xl p-[15px] border border-b-1 border-b-[#999999] border-opacity-50">
							Tickets
						</h2>
						<div className="p-3 space-y-2">
							{sidebarItems.map((item, index) => (
								<React.Fragment key={index}>
									{index === 1 && (
										<hr className="border-t-2 border-[#999999] border-opacity-50 my-2" />
									)}
									{index === 3 && (
										<hr className="border-t-2 border-[#999999] border-opacity-50 my-2" />
									)}
									<div
										className={`cursor-pointer font-semibold text-[#999999] p-2 rounded ${
											item === currentFilter
												? 'bg-blue-100 text-blue-600'
												: 'hover:text-blue-600'
										}`}
										onClick={() => handleFilterChange(item)}
									>
										{item}
									</div>
									{index === sidebarItems.length - 2 && (
										<hr className="border-t-2 border-[#999999] border-opacity-50 my-2" />
									)}
								</React.Fragment>
							))}
						</div>
					</div>

					{/* Main content */}
					<div className="flex-1 overflow-auto">
						<table className="w-full mt-[23px]">
							<thead>
								<tr className="text-left text-gray-500 text-sm">
									<th className="pb-4 font-normal pl-6">
										<CustomCheckbox
											isChecked={selectAll}
											onChange={handleSelectAll}
										/>
									</th>
									<th className="pb-4 font-bold text-lg pl-1">Requester</th>
									<th className="pb-4 font-bold text-lg">Subject</th>
									<th className="pb-4 font-bold text-lg">Agent</th>
									<th className="pb-4 font-bold text-lg">Status</th>
									<th className="pb-4 font-bold text-lg">Last Message</th>
								</tr>
							</thead>
							<tbody>
								{getCurrentPageItems().map((ticket) => (
									<tr
										onClick={() => handleTicketClick(ticket)}
										key={ticket.id}
										className="border-t border-[#999999] border-opacity-50 shadow-md hover:bg-[#0066FF] hover:bg-opacity-15 cursor-pointer"
									>
										<td className="py-03 pl-6">
											<CustomCheckbox
												isChecked={selectedTickets[ticket.id] || false}
												onChange={() => handleSelectTicket(ticket.id)}
											/>
										</td>
										<td className="py-3">
											<div className="flex items-center">
												<div className="h-8 w-8 rounded-full bg-[#65558F] flex items-center justify-center text-white text-sm font-medium">
													{ticket.requester
														.split(' ')
														.map((n) => n[0])
														.join('')}
												</div>
												<div className="flex flex-col">
													<span className="ml-2 text-sm font-semibold">
														{ticket.requester}
													</span>
													<span className="ml-2 text-sm text-[#999999]">
														{ticket.email}
													</span>
												</div>
											</div>
										</td>
										<td className="py-3 text-sm font-semibold">
											{ticket.subject}
										</td>
										<td className="py-3 text-sm font-semibold">
											{getAssignedEmployeeFirstName(ticket.assignedEmployeeId)}
										</td>
										<td className="py-3">
											<span
												className={`inline-block w-24 py-2 text-xs font-semibold text-center rounded-full ${
													statusColors[ticket.status]
												} text-white`}
											>
												{ticket.status}
											</span>
										</td>
										<td className="py-3 text-sm font-semibold">
											{formatTimeAgo(ticket.updatedAt._seconds)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<Pagination
							totalItems={filteredTickets.length}
							itemsPerPage={itemsPerPage}
							currentPage={currentPage}
							onPageChange={setCurrentPage}
							onItemsPerPageChange={setItemsPerPage}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
