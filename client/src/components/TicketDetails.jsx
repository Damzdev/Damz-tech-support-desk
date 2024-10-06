import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import userIcon from '../assets/tickets/User-icon.svg'
import chevron from '../assets/users/chevron.svg'
import search from '../assets/tickets/search-icon.svg'
import dots from '../assets/tickets/menu-dots.svg'
import {
	FaBold,
	FaItalic,
	FaUnderline,
	FaListUl,
	FaListOl,
	FaLink,
	FaImage,
} from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5'
import MessagesSkeleton from './MessagesSkeleton'

const statusColors = {
	Open: 'bg-blue-600',
	Resolved: 'bg-[#24882E]',
	Closed: 'bg-[#B3261E]',
	'On Hold': 'bg-[#E97A14]',
}
export default function TicketDetails({ ticket, onClose }) {
	const [messages, setMessages] = useState([])
	const [users, setUsers] = useState([])
	const [employees, setEmployees] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [message, setMessage] = useState('')
	const editorRef = useRef(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const [messagesRes, usersRes, employeesRes] = await Promise.all([
					fetch(`http://localhost:5000/api/tickets/${ticket.id}/messages`),
					fetch('http://localhost:5000/api/customers'),
					fetch('http://localhost:5000/api/users'),
				])

				const messagesData = await messagesRes.json()
				const usersData = await usersRes.json()
				const employeesData = await employeesRes.json()

				setMessages(messagesData)
				setUsers(usersData)
				setEmployees(employeesData)
			} catch (error) {
				console.error('Error fetching data:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [ticket.id])

	const handleClose = () => {
		navigate('/tickets')
		onClose()
	}

	const handleInput = (e) => {
		setMessage(e.target.innerHTML)
	}

	const handleFormatting = (command) => {
		document.execCommand(command, false, null)
		editorRef.current.focus()
	}

	const handleFileUpload = (event) => {
		const file = event.target.files[0]
		// Implement file upload logic here
		console.log(`Uploading file: ${file.name}`)
	}

	const formatDate = (date) => {
		const day = date.getDate()
		const month = date.toLocaleString('default', { month: 'short' })
		const year = date.getFullYear()
		const time = date.toLocaleTimeString('default', {
			hour: '2-digit',
			minute: '2-digit',
		})

		const getOrdinalSuffix = (n) => {
			const s = ['th', 'st', 'nd', 'rd']
			const v = n % 100
			return n + (s[(v - 20) % 10] || s[v] || s[0])
		}

		return `${getOrdinalSuffix(day)} ${month} ${year} at ${time}`
	}

	const getTimeAgo = (timestamp) => {
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

	const highlightText = (text, highlight) => {
		if (!highlight.trim()) {
			return <span>{text}</span>
		}
		const regex = new RegExp(`(${highlight})`, 'gi')
		const parts = text.split(regex)
		return (
			<span>
				{parts.filter(String).map((part, i) => {
					return regex.test(part) ? (
						<mark key={i} className="bg-yellow-200">
							{part}
						</mark>
					) : (
						<span key={i}>{part}</span>
					)
				})}
			</span>
		)
	}

	const renderMessages = () => {
		if (messages.length === 0) return null

		return messages[0].messages.map((message) => {
			const isEmployee = employees.some((emp) => emp.id === message.senderId)
			const sender = isEmployee
				? employees.find((emp) => emp.id === message.senderId)
				: users.find((user) => user.id === message.senderId)

			const initials = sender ? sender.name.charAt(0).toUpperCase() : ''
			const timeAgo = getTimeAgo(message.sentAt._seconds)

			return (
				<div
					key={message.id}
					className={`flex items-start space-x-3 ${
						isEmployee ? 'justify-end' : ''
					}`}
				>
					{!isEmployee && (
						<div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white flex items-center justify-center rounded-full">
							{initials}
						</div>
					)}
					<div
						className={`bg-[#D9D9D9] p-4 rounded-lg ${
							isEmployee ? 'w-3/5' : 'w-4/5'
						}`}
					>
						{highlightText(message.message, searchTerm)}
						<p className="text-sm text-black font-semibold mt-2 text-right">
							{timeAgo}
						</p>
					</div>
					{isEmployee && (
						<div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white flex items-center justify-center rounded-full">
							{initials}
						</div>
					)}
				</div>
			)
		})
	}

	const date = new Date(ticket.createdAt._seconds * 1000)

	return (
		<div className="h-full max-h-[calc(100vh-100px)] overflow-auto rounded-tl-lg flex bg-[#0066FF] bg-opacity-15">
			<div className="w-full flex flex-col">
				{/* Header section - now scrollable */}
				<div className="flex items-stretch border-b-2 border-gray-500">
					<button
						onClick={handleClose}
						className="mr-4 p-2 hover:bg-blue-300 text-blue-600"
					>
						<IoArrowBack size={24} />
					</button>
					<div className="text-md font-semibold p-8 border-r-2 w-full border-gray-500 h-full flex items-center">
						<div>
							{`Ticket created by ${ticket.requester}`}
							<span className="text-blue-600 pl-2 cursor-pointer">
								#{ticket.id}
							</span>
						</div>
					</div>

					<div className="text-lg font-semibold w-full p-8 border-r-2 border-gray-500 h-full flex items-center">
						<img src={userIcon} alt="user-icon" className="w-10 h-10 mr-2" />
						<div className="flex flex-col text-sm font-bold pr-12">
							<span>Assigned to:</span>
							<div className="flex items-center cursor-pointer">
								<span className="text-blue-700">
									{ticket.agent || 'Unassigned'}
								</span>
								<img src={chevron} alt="chevron" className="w-4 h-4 ml-2" />
							</div>
						</div>
						<span
							className={`inline-block w-24 py-2 text-xs font-semibold text-center rounded-full ${
								statusColors[ticket.status]
							} text-white`}
						>
							{ticket.status}
						</span>
					</div>
					<div className="flex items-center w-full justify-between p-8">
						{/* New search bar */}
						<div className="relative flex items-center ">
							<input
								type="text"
								placeholder="Search..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="bg-[#D9D9D9] w-48 rounded-lg pl-4 pr-10 py-2 text-black placeholder:text-black font-bold text-lg"
							/>
							<img
								src={search}
								alt="search"
								className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
							/>
						</div>
						<img
							src={dots}
							alt=""
							className="p-1 cursor-pointer rounded-lg right-0"
						/>
					</div>
				</div>

				{/* Messages section */}
				<div className="flex-grow">
					<div className="flex items-center w-full pt-8 pb-6">
						<div className="flex-grow border-t border-gray-400"></div>
						<span className="flex-shrink mx-4 text-gray-400">
							{formatDate(date).toLocaleString()}
						</span>
						<div className="flex-grow border-t border-gray-400"></div>
					</div>
					<div className="space-y-4 p-10 pt-2">
						{isLoading ? <MessagesSkeleton /> : renderMessages()}
					</div>
				</div>

				{/* Input field and toolbar */}
				<div className="p-5 border-t border-gray-300 flex flex-col items-center">
					<div
						ref={editorRef}
						contentEditable
						className="w-3/4 border-2 border-gray-300 bg-white rounded-lg shadow-lg px-4 py-2 focus:outline-none mb-2 min-h-[30px] overflow-auto"
						onInput={handleInput}
					/>
					<div className="w-3/4 flex justify-start space-x-2 bg-gray-100 p-2 rounded-lg">
						<button
							onClick={() => handleFormatting('bold')}
							className="p-1 hover:bg-gray-200 rounded"
						>
							<FaBold />
						</button>
						<button
							onClick={() => handleFormatting('italic')}
							className="p-1 hover:bg-gray-200 rounded"
						>
							<FaItalic />
						</button>
						<button
							onClick={() => handleFormatting('underline')}
							className="p-1 hover:bg-gray-200 rounded"
						>
							<FaUnderline />
						</button>
						<button
							onClick={() => handleFormatting('unordered-list')}
							className="p-1 hover:bg-gray-200 rounded"
						>
							<FaListUl />
						</button>
						<button
							onClick={() => handleFormatting('ordered-list')}
							className="p-1 hover:bg-gray-200 rounded"
						>
							<FaListOl />
						</button>
						<button
							onClick={() => handleFormatting('link')}
							className="p-1 hover:bg-gray-200 rounded"
						>
							<FaLink />
						</button>
						<label className="p-1 hover:bg-gray-200 rounded cursor-pointer">
							<FaImage />
							<input
								type="file"
								className="hidden"
								onChange={handleFileUpload}
								accept="image/*"
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
	)
}
