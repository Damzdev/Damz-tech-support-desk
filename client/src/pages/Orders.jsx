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

export default function Orders() {
	const [selectAll, setSelectAll] = useState(false)
	const [selectedUsers, setSelectedUsers] = useState({})

	const users = [
		{
			name: 'Damien Oosthuizen',
			email: 'damien@example.com',
			role: 'Admin',
			joinedDate: '06 Sep 2024, 8:30 am',
		},
		{
			name: 'James Hall',
			email: 'james@example.com',
			role: 'Senior Support',
			joinedDate: '05 Sep 2024, 9:15 am',
		},
		{
			name: 'Noah Black',
			email: 'noah@example.com',
			role: 'Junior Support',
			joinedDate: '04 Sep 2024, 10:00 am',
		},
		{
			name: 'Ava Brown',
			email: 'ava@example.com',
			role: 'Product Manager',
			joinedDate: '03 Sep 2024, 11:30 am',
		},
		{
			name: 'Sophie Jones',
			email: 'sophie@example.com',
			role: 'Product Manager',
			joinedDate: '02 Sep 2024, 1:45 pm',
		},
		{
			name: 'Lucas Young',
			email: 'lucas@example.com',
			role: 'Admin',
			joinedDate: '01 Sep 2024, 3:00 pm',
		},
		{
			name: 'Dylan Holder',
			email: 'dylan@example.com',
			role: 'Senior Support',
			joinedDate: '31 Aug 2024, 4:30 pm',
		},
		{
			name: 'Brent Evans',
			email: 'brent@example.com',
			role: 'Junior Support',
			joinedDate: '30 Aug 2024, 5:45 pm',
		},
	]

	const handleSelectAll = () => {
		const newSelectAll = !selectAll
		setSelectAll(newSelectAll)
		const newSelectedUsers = {}
		users.forEach((user, index) => {
			newSelectedUsers[index] = newSelectAll
		})
		setSelectedUsers(newSelectedUsers)
	}

	const handleSelectUser = (index) => {
		setSelectedUsers((prev) => ({
			...prev,
			[index]: !prev[index],
		}))
	}

	return (
		<div className="bg-black rounded-tl-lg h-full p-2 sm:p-4 lg:p-6 max-h-[calc(100vh-100px)] overflow-auto">
			<div className="flex mb-4 pr-10">
				<button className="text-white text-lg font-semibold w-40 p-1.5 ml-auto border border-[#999999] hover:bg-user-button-blue rounded-lg flex items-center justify-evenly">
					<span>Add User</span>
					<img src={chevron} alt="chevron" className="w-4 h-4" />
				</button>
			</div>
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
								<img src={aticon} alt="atIcon" className="w-5 h-5 mr-2" />
								Email
							</span>
						</th>
						<th className="px-2 sm:px-3 lg:px-4 py-2 text-left border-r border-[#999999]">
							<span className="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-semibold text-[#999999] flex items-center">
								<img src={roleIcon} alt="atIcon" className="w-7 h-7" />
								Role
							</span>
						</th>
						<th className="px-2 sm:px-3 lg:px-4 py-2 text-left hidden sm:table-cell border-r border-[#999999]">
							<span className="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-semibold text-[#999999] flex items-center">
								<img src={calendar} alt="atIcon" className="w-5 h-5 mr-2" />
								Joined Date
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
					{users.map((user, index) => (
						<tr key={index} className="border-b border-[#999999]">
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
								<div className="flex items-center">
									<CustomCheckbox
										isChecked={selectedUsers[index] || false}
										onChange={() => handleSelectUser(index)}
									/>
									<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl font-semibold text-gray-300 ml-2">
										{user.name}
									</span>
								</div>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
								<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-[#999999] underline decoration-1 underline-offset-4">
									{user.email}
								</span>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
								<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-gray-300 font-semibold">
									{user.role}
								</span>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 hidden sm:table-cell border-r border-[#999999]">
								<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-gray-300 font-semibold">
									{user.joinedDate}
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
						1-8 of 100 rows
					</span>
					<button className="text-[#999999] font-semibold w-12 h-6 px-1.5 border border-[#999999] hover:bg-user-button-blue rounded-md flex items-center justify-evenly">
						<span className="text-xs mr-auto">8</span>
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
