import React, { useState, useEffect, useContext } from 'react'
import { Modal, Box, Typography } from '@mui/material'
import { UserContext } from '../context/UserContext'
import CustomCheckbox from '../components/CustomCheckbox'
import aticon from '../assets/users/atSign.svg'
import calendar from '../assets/users/calendar.svg'
import roleIcon from '../assets/users/roleIcon.svg'
import address from '../assets/orders/Address.svg'
import Pagination from '../components/Pagination'

const CACHE_EXPIRATION = 5 * 60 * 1000 // 5 minutes in milliseconds

export default function Orders() {
	const [selectAll, setSelectAll] = useState(false)
	const [selectedOrders, setSelectedOrders] = useState({})
	const [expandedAddresses, setExpandedAddresses] = useState({})
	const [orders, setOrders] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [modalOpen, setModalOpen] = useState(false)
	const [selectedOrder, setSelectedOrder] = useState(null)
	const { users } = useContext(UserContext)

	useEffect(() => {
		fetchOrders()
	}, [])

	const fetchOrders = async () => {
		try {
			const cachedData = JSON.parse(localStorage.getItem('cachedOrders'))
			if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
				setOrders(cachedData.data)
			} else {
				const response = await fetch('http://localhost:5000/api/orders')
				if (!response.ok) {
					throw new Error('Failed to fetch orders')
				}
				const data = await response.json()
				setOrders(data)
				localStorage.setItem(
					'cachedOrders',
					JSON.stringify({ data, timestamp: Date.now() })
				)
			}
		} catch (error) {
			console.error('Error fetching orders:', error)
		}
	}

	const toggleAddress = (index) => {
		setExpandedAddresses((prev) => ({
			...prev,
			[index]: !prev[index],
		}))
	}

	const truncateAddress = (address, maxLength = 15) => {
		return address.length > maxLength
			? `${address.substring(0, maxLength)}...`
			: address
	}

	const handleSelectAll = () => {
		const newSelectAll = !selectAll
		setSelectAll(newSelectAll)
		const newSelectedOrders = {}
		orders.forEach((_, index) => {
			newSelectedOrders[index] = newSelectAll
		})
		setSelectedOrders(newSelectedOrders)
	}

	const handleSelectOrder = (index) => {
		setSelectedOrders((prev) => {
			const newSelectedOrders = { ...prev, [index]: !prev[index] }
			const allSelected = orders.every((_, i) => newSelectedOrders[i] === true)
			setSelectAll(allSelected)
			return newSelectedOrders
		})
	}

	const handleOpenModal = (order) => {
		setSelectedOrder(order)
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
		setSelectedOrder(null)
	}

	const sortedOrders = [...orders].sort((a, b) => {
		return new Date(b.createdAt) - new Date(a.createdAt)
	})

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem)

	return (
		<div className="bg-black rounded-tl-lg h-full p-2 sm:p-4 lg:p-6 max-h-[calc(100vh-100px)] overflow-auto">
			<table className="w-full border-collapse">
				<thead>
					<tr className="border-b border-t border-[#999999]">
						<th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 text-left border-r border-[#999999]">
							<div className="flex items-center">
								<CustomCheckbox
									isChecked={selectAll}
									onChange={handleSelectAll}
								/>
								<span className="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-semibold text-[#999999] ml-2">
									Full name
								</span>
							</div>
						</th>
						<th className="px-2 sm:px-3 lg:px-4 py-2 text-left border-r border-[#999999]">
							<span className="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-semibold text-[#999999] flex items-center">
								<img src={address} alt="address" className="w-5 h-5 mr-2" />
								Address
							</span>
						</th>
						<th className="px-2 sm:px-3 lg:px-4 py-2 text-left border-r border-[#999999]">
							<span className="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-semibold text-[#999999] flex items-center">
								<img src={aticon} alt="atIcon" className="w-5 h-5 mr-2" />
								Email
							</span>
						</th>
						<th className="px-2 sm:px-3 lg:px-4 py-2 text-left border-r border-[#999999]">
							<span className="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-semibold text-[#999999] flex items-center w-28">
								<img src={roleIcon} alt="atIcon" className="w-7 h-7" />
								Order #
							</span>
						</th>
						<th className="px-2 sm:px-3 lg:px-4 py-2 text-left hidden sm:table-cell border-r border-[#999999]">
							<span className="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-semibold text-[#999999] flex items-center">
								<img src={calendar} alt="atIcon" className="w-5 h-5 mr-2" />
								Order Date
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{currentOrders.map((order, index) => {
						const customer = users.find((user) => user.id === order.userId)
						return (
							<tr key={order.id} className="border-b border-[#999999]">
								<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
									<div className="flex items-center">
										<CustomCheckbox
											isChecked={selectedOrders[index] || false}
											onChange={() => handleSelectOrder(index)}
										/>
										<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl font-semibold text-gray-300 ml-2">
											{order.name}
										</span>
									</div>
								</td>
								<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r lg:max-w-32 2xl:max-w-max border-[#999999]">
									<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-[#999999]">
										{expandedAddresses[index]
											? order.address
											: truncateAddress(order.address)}
									</span>
									{order.address.length > 15 && (
										<button
											onClick={() => toggleAddress(index)}
											className="ml-2 text-xs sm:text-sm text-blue-500 hover:text-blue-400"
										>
											{expandedAddresses[index] ? 'Show less' : 'Show more'}
										</button>
									)}
								</td>

								<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
									<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-[#999999]">
										{customer ? customer.email : 'N/A'}
									</span>
								</td>
								<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
									<span
										className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-blue-500 hover:text-blue-400 cursor-pointer"
										onClick={() => handleOpenModal(order)}
									>
										#{order.id}
									</span>
								</td>
								<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 hidden sm:table-cell border-r border-[#999999]">
									<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-gray-300 font-semibold">
										{order.createdAt}
									</span>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<Pagination
				totalItems={sortedOrders.length}
				itemsPerPage={itemsPerPage}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
				onItemsPerPageChange={setItemsPerPage}
			/>
			<Modal
				open={modalOpen}
				onClose={handleCloseModal}
				aria-labelledby="order-modal-title"
				aria-describedby="order-modal-description"
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '80%',
						maxWidth: 800,
						bgcolor: '#1a1a1a',
						border: '2px solid #333',
						boxShadow: 24,
						p: 4,
						color: '#ffffff',
					}}
				>
					<Typography id="order-modal-title" variant="h6" component="h2">
						Order Details
					</Typography>
					<Typography id="order-modal-description" sx={{ mt: 2 }}>
						{selectedOrder && (
							<>
								<p>Order ID: {selectedOrder.id}</p>
								<p>Customer: {selectedOrder.name}</p>
								<p>Address: {selectedOrder.address}</p>
								<p>Date: {selectedOrder.createdAt}</p>
								<p>Product IDs: {selectedOrder.productIds.join(', ')}</p>
							</>
						)}
					</Typography>
				</Box>
			</Modal>
		</div>
	)
}
