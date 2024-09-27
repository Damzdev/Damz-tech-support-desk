import React, { useState } from 'react'
import trashIcon from '../assets/users/trashIcon.svg'
import editIcon from '../assets/users/pencilIcon.svg'
import CustomCheckbox from '../components/CustomCheckbox'
import aticon from '../assets/users/atSign.svg'
import calendar from '../assets/users/calendar.svg'
import roleIcon from '../assets/users/roleIcon.svg'
import chevron from '../assets/users/chevron.svg'
import doubleleftarrow from '../assets/users/left-double-arrow.svg'
import leftarrow from '../assets/users/left-arrow.svg'
import address from '../assets/orders/Address.svg'

export default function Orders() {
	const [selectAll, setSelectAll] = useState(false)
	const [selectedOrders, setSelectedOrders] = useState({})
	const [expandedAddresses, setExpandedAddresses] = useState({})

	const orders = [
		{
			address: '2040 Octave St, Roodepoort, Gauteng, 2040',
			email: 'damien@example.com',
			orderNumber: '#420135',
			customerName: 'Damien Keev',
			orderDate: '06 Sep 2024, 8:30 am',
		},
		{
			address: '10 Lois Avenue, Pretoria, Gauteng, 0084',
			email: 'james@example.com',
			orderNumber: '#420136',
			customerName: 'James Hall',
			orderDate: '06 Sep 2024, 8:31 am',
		},
		{
			address: '320 The Hillside St, Pretoria, Gauteng, 0102',
			email: 'noah@example.com',
			orderNumber: '#420137',
			customerName: 'Noah Black',
			orderDate: '06 Sep 2024, 8:32 am',
		},
		{
			address: 'Spaanschemat River Rd, Cape Town, Western Cape, 0142',
			email: 'ava@example.com',
			orderNumber: '#420138',
			customerName: 'Ava Brown',
			orderDate: '06 Sep 2024, 8:33 am',
		},
		{
			address: '1 Rose Street, Durban, KwaZulu-Natal, 4001',
			email: 'sophie@example.com',
			orderNumber: '#420139',
			customerName: 'Sophie Jones',
			orderDate: '06 Sep 2024, 8:34 am',
		},
		{
			address: 'Longmarket St, Cape Town, Western Cape, 0175',
			email: 'lucas@example.com',
			orderNumber: '#420140',
			customerName: 'Lucas Young',
			orderDate: '06 Sep 2024, 8:35 am',
		},
		{
			address: 'Rhinoceros Rd, Roodepoort, Gauteng, 0186',
			email: 'dylan@example.com',
			orderNumber: '#420141',
			customerName: 'Dylan Holder',
			orderDate: '06 Sep 2024, 8:50 am',
		},
		{
			address: '17 Liesbeeck St, Pretoria, Gauteng, 0645',
			email: 'brent@example.com',
			orderNumber: '#420142',
			customerName: 'Brent Evans',
			orderDate: '06 Sep 2024, 9:14 am',
		},
		{
			address: '27 Clough St, Pietermaritzburg, KwaZulu-Natal, 3201',
			email: 'damien@example.com',
			orderNumber: '#420143',
			customerName: 'Damien Keev',
			orderDate: '07 Sep 2024, 8:38 am',
		},
		{
			address: '35 Gardenia St, Bloemfontein, Free State, 9301',
			email: 'kelly@example.com',
			orderNumber: '#420144',
			customerName: 'Kelly Smith',
			orderDate: '07 Sep 2024, 8:50 am',
		},
		{
			address: '2040 Octave St, Roodepoort, Gauteng, 2040',
			email: 'damien@example.com',
			orderNumber: '#420145',
			customerName: 'Damien Keev',
			orderDate: '08 Sep 2024, 8:30 am',
		},
	]

	const toggleAddress = (index) => {
		setExpandedAddresses((prev) => ({
			...prev,
			[index]: !prev[index],
		}))
	}

	const truncateAddress = (address, maxLength = 10) => {
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
						<th className="px-2 sm:px-3 lg:px-4 py-2 text-left">
							<span className="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-semibold text-[#999999] pl-6">
								Actions
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((orders, index) => (
						<tr key={index} className="border-b border-[#999999]">
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
								<div className="flex items-center">
									<CustomCheckbox
										isChecked={selectedOrders[index] || false}
										onChange={() => handleSelectOrder(index)}
									/>
									<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl font-semibold text-gray-300 ml-2">
										{orders.customerName}
									</span>
								</div>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r lg:max-w-32 2xl:max-w-max border-[#999999]">
								<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-[#999999] underline decoration-1 underline-offset-4">
									{expandedAddresses[index]
										? orders.address
										: truncateAddress(orders.address)}
								</span>
								<button
									onClick={() => toggleAddress(index)}
									className="ml-2 text-xs sm:text-sm text-blue-500 hover:text-blue-400"
								>
									{expandedAddresses[index] ? 'Show less' : 'Show more'}
								</button>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
								<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-[#999999] underline decoration-1 underline-offset-4">
									{orders.email}
								</span>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
								<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-gray-300 font-semibold">
									{orders.orderNumber}
								</span>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 hidden sm:table-cell border-r border-[#999999]">
								<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-gray-300 font-semibold">
									{orders.orderDate}
								</span>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4">
								<div className="flex items-center">
									<button className="bg-user-button-blue bg-opacity-20 text-gray-400 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg mr-1 sm:mr-2 flex items-center font-semibold text-xs sm:text-sm lg:text-base">
										<img
											src={editIcon}
											alt="Edit"
											className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2"
										/>
										Edit
									</button>
									<button className="bg-user-button-blue bg-opacity-20 text-gray-400 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg flex items-center font-semibold text-xs sm:text-sm lg:text-base">
										<img
											src={trashIcon}
											alt="Delete"
											className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2"
										/>
										Delete
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="my-4 flex">
				<span className="text-[#999999] font-semibold mr-20">
					Rows per page
				</span>
				<div className="flex">
					<span className="text-[#999999] font-semibold mr-4">
						1-10 of 100 rows
					</span>
					<button className="text-[#999999] font-semibold w-12 h-6 px-1.5 border border-[#999999] hover:bg-user-button-blue rounded-md flex items-center justify-evenly">
						<span className="text-xs mr-auto">10</span>
						<img src={chevron} alt="chevron" className="w-2 h-2" />
					</button>
				</div>
				<div className="ml-auto flex">
					<button className="text-[#999999] font-semibold w-7 h-7 mx-2 px-1.5 border border-[#999999] hover:bg-user-button-blue rounded-md flex items-center justify-evenly">
						<img src={doubleleftarrow} alt="doubleleftarrow" />
					</button>
					<button className="text-[#999999] font-semibold w-7 h-7 px-1.5 border border-[#999999] hover:bg-user-button-blue rounded-md flex items-center justify-evenly">
						<img src={leftarrow} alt="leftarrow" />
					</button>
					<button className="text-[#999999] hover:text-white mx-4 font-semibold text-lg">
						1
					</button>
					<button className="text-white font-semibold text-lg">2</button>
					<button className="text-[#999999] mx-4 hover:text-white font-semibold text-lg">
						...
					</button>
					<button className="text-[#999999] hover:text-white font-semibold text-lg mr-2">
						5
					</button>
					<button className="text-[#999999] font-semibold w-7 h-7 mx-2 px-1.5 border border-[#999999] hover:bg-user-button-blue rounded-md flex items-center justify-evenly">
						<img
							src={leftarrow}
							alt="rightarrow"
							className="transform -scale-x-100"
						/>
					</button>
					<button className="text-[#999999] font-semibold w-7 h-7 px-1.5 border border-[#999999] hover:bg-user-button-blue rounded-md flex items-center justify-evenly">
						<img
							src={doubleleftarrow}
							alt="doublerightarrow"
							className="transform -scale-x-100"
						/>
					</button>
				</div>
			</div>
		</div>
	)
}
