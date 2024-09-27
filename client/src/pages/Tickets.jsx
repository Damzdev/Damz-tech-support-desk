import React, { useState } from 'react'
import CustomCheckbox from '../components/CustomCheckbox'
import chevron from '../assets/users/chevron.svg'
import doubleleftarrow from '../assets/users/left-double-arrow.svg'
import leftarrow from '../assets/users/left-arrow.svg'

const ticketData = [
	{
		id: 1,
		requester: 'Jason Baker',
		subject: 'Order #324321',
		agent: 'Unassigned',
		status: 'Open',
		lastMessage: '4 seconds ago\nFrom Jason',
		email: 'jasonbaker@company.com',
	},
	{
		id: 2,
		requester: 'Hailey Matthews',
		subject: 'Packaging issue',
		agent: 'Damien',
		status: 'Resolved',
		lastMessage: '31 minutes ago\nFrom Damien',
		email: 'haileymatthews@gmail.com',
	},
	{
		id: 3,
		requester: 'Hailey Matthews',
		subject: 'Packaging issue',
		agent: 'Damien',
		status: 'Closed',
		lastMessage: '5 hours ago\nFrom Damien',
		email: 'haileymatthews@gmail.com',
	},
	{
		id: 4,
		requester: 'Hailey Matthews',
		subject: 'Packaging issue',
		agent: 'Damien',
		status: 'On Hold',
		lastMessage: '2 days ago\nFrom Damien',
		email: 'haileymatthews@gmail.com',
	},
	{
		id: 5,
		requester: 'Hailey Matthews',
		subject: 'Packaging issue',
		agent: 'Damien',
		status: 'Resolved',
		lastMessage: '3 days ago\nFrom Damien',
		email: 'haileymatthews@gmail.com',
	},
	{
		id: 6,
		requester: 'Hailey Matthews',
		subject: 'Packaging issue',
		agent: 'Damien',
		status: 'On Hold',
		lastMessage: '5 days ago\nFrom Damien',
		email: 'haileymatthews@gmail.com',
	},
	{
		id: 7,
		requester: 'Hailey Matthews',
		subject: 'Packaging issue',
		agent: 'Damien',
		status: 'On Hold',
		lastMessage: '10 days ago\nFrom Damien',
		email: 'haileymatthews@gmail.com',
	},
	{
		id: 8,
		requester: 'Hailey Matthews',
		subject: 'Packaging issue',
		agent: 'Damien',
		status: 'Resolved',
		lastMessage: '10 days ago\nFrom Damien',
		email: 'haileymatthews@gmail.com',
	},
	{
		id: 9,
		requester: 'Hailey Matthews',
		subject: 'Packaging issue',
		agent: 'Damien',
		status: 'Resolved',
		lastMessage: '10 days ago\nFrom Damien',
		email: 'haileymatthews@gmail.com',
	},
	{
		id: 10,
		requester: 'Hailey Matthews',
		subject: 'Packaging issue',
		agent: 'Damien',
		status: 'Resolved',
		lastMessage: '10 days ago\nFrom Damien',
		email: 'haileymatthews@gmail.com',
	},
]

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

	const handleSelectAll = () => {
		const newSelectAll = !selectAll
		setSelectAll(newSelectAll)
		const newSelectedTickets = {}
		ticketData.forEach((ticket) => {
			newSelectedTickets[ticket.id] = newSelectAll
		})
		setSelectedTickets(newSelectedTickets)
	}

	const handleSelectTicket = (id) => {
		setSelectedTickets((prev) => {
			const newSelectedTickets = { ...prev, [id]: !prev[id] }
			const allSelected = ticketData.every(
				(ticket) => newSelectedTickets[ticket.id]
			)
			setSelectAll(allSelected)

			return newSelectedTickets
		})
	}

	return (
		<div className="flex bg-[#0066FF] bg-opacity-15 rounded-tl-lg h-full max-h-[calc(100vh-100px)] overflow-auto">
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
									index === 0
										? 'bg-blue-100 text-blue-600'
										: 'hover:text-blue-600'
								}`}
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
						{ticketData.map((ticket) => (
							<tr
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
								<td className="py-3 text-sm font-semibold">{ticket.subject}</td>
								<td className="py-3 text-sm font-semibold">{ticket.agent}</td>
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
									{ticket.lastMessage.split('\n').map((line, index) => (
										<div key={index}>{line}</div>
									))}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="py-8 pb-12 px-8 flex text-xs items-center">
					<span className="text-[#999999] font-semibold mr-6">
						Rows per page
					</span>
					<div className="flex items-center">
						<span className="text-[#999999] font-semibold mr-2">
							1-10 of 100
						</span>
						<button className="text-[#999999] font-semibold w-8 h-4 px-1 border border-[#999999] hover:bg-user-button-blue rounded-sm flex items-center justify-between">
							<span>10</span>
							<img src={chevron} alt="chevron" className="w-1.5 h-1.5" />
						</button>
					</div>
					<div className="ml-auto flex items-center">
						<button className="text-[#999999] w-5 h-5 mx-1 border border-[#999999] hover:bg-user-button-blue rounded-sm flex items-center justify-center">
							<img
								src={doubleleftarrow}
								alt="doubleleftarrow"
								className="w-3 h-3"
							/>
						</button>
						<button className="text-[#999999] w-5 h-5 border border-[#999999] hover:bg-user-button-blue rounded-sm flex items-center justify-center">
							<img src={leftarrow} alt="leftarrow" className="w-3 h-3" />
						</button>
						<button className="text-[#999999] hover:text-white mx-2 font-semibold">
							1
						</button>
						<button className="text-white font-semibold">2</button>
						<button className="text-[#999999] mx-2 hover:text-white font-semibold">
							...
						</button>
						<button className="text-[#999999] hover:text-white font-semibold mr-1">
							5
						</button>
						<button className="text-[#999999] w-5 h-5 mx-1 border border-[#999999] hover:bg-user-button-blue rounded-sm flex items-center justify-center">
							<img
								src={leftarrow}
								alt="rightarrow"
								className="w-3 h-3 transform -scale-x-100"
							/>
						</button>
						<button className="text-[#999999] w-5 h-5 border border-[#999999] hover:bg-user-button-blue rounded-sm flex items-center justify-center">
							<img
								src={doubleleftarrow}
								alt="doublerightarrow"
								className="w-3 h-3 transform -scale-x-100"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
