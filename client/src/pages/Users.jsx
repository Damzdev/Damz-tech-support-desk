import React, { useState } from 'react'
import trashIcon from '../assets/users/trashIcon.svg'
import editIcon from '../assets/users/pencilIcon.svg'
import CustomCheckbox from '../components/CustomCheckbox'

export default function Users() {
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
			role: 'User',
			joinedDate: '05 Sep 2024, 9:15 am',
		},
		{
			name: 'Noah Black',
			email: 'noah@example.com',
			role: 'User',
			joinedDate: '04 Sep 2024, 10:00 am',
		},
		{
			name: 'Ava Brown',
			email: 'ava@example.com',
			role: 'User',
			joinedDate: '03 Sep 2024, 11:30 am',
		},
		{
			name: 'Sophie Jones',
			email: 'sophie@example.com',
			role: 'User',
			joinedDate: '02 Sep 2024, 1:45 pm',
		},
		{
			name: 'Lucas Young',
			email: 'lucas@example.com',
			role: 'User',
			joinedDate: '01 Sep 2024, 3:00 pm',
		},
		{
			name: 'Dylan Holder',
			email: 'dylan@example.com',
			role: 'User',
			joinedDate: '31 Aug 2024, 4:30 pm',
		},
		{
			name: 'Brent Evans',
			email: 'brent@example.com',
			role: 'User',
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
		<div className="bg-black rounded-tl-lg h-full p-6 max-h-[calc(100vh-100px)">
			<table className="w-full border-collapse">
				<thead>
					<tr className="border-b border-gray-700">
						<th className="px-4 py-2 text-left">
							<div className="flex items-center">
								<CustomCheckbox
									isChecked={selectAll}
									onChange={handleSelectAll}
								/>
								<span className="text-2xl font-semibold text-gray-400">
									Full name
								</span>
							</div>
						</th>
						<th className="px-4 py-2 text-left">
							<span className="text-2xl font-semibold text-gray-400">
								Email
							</span>
						</th>
						<th className="px-4 py-2 text-left">
							<span className="text-2xl font-semibold text-gray-400">Role</span>
						</th>
						<th className="px-4 py-2 text-left">
							<span className="text-2xl font-semibold text-gray-400">
								Joined Date
							</span>
						</th>
						<th className="px-4 py-2 text-left">
							<span className="text-2xl font-semibold text-gray-400">
								Actions
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index} className="border-b border-gray-700">
							<td className="px-4 py-4">
								<div className="flex items-center">
									<CustomCheckbox
										isChecked={selectedUsers[index] || false}
										onChange={() => handleSelectUser(index)}
									/>
									<span className="text-xl font-semibold text-gray-300">
										{user.name}
									</span>
								</div>
							</td>
							<td className="px-4 py-4">
								<span className="text-xl text-gray-300">{user.email}</span>
							</td>
							<td className="px-4 py-4">
								<span className="text-xl text-gray-300">{user.role}</span>
							</td>
							<td className="px-4 py-4">
								<span className="text-xl text-gray-300">{user.joinedDate}</span>
							</td>
							<td className="px-4 py-4">
								<div className="flex items-center">
									<button className="bg-user-button-blue bg-opacity-20 text-gray-400 px-4 py-2 rounded-lg mr-2 flex items-center font-semibold">
										<img src={editIcon} alt="Edit" className="w-5 h-5 mr-2" />
										Edit
									</button>
									<button className="bg-user-button-blue bg-opacity-20 text-gray-400 px-4 py-2 rounded-lg flex items-center font-semibold">
										<img
											src={trashIcon}
											alt="Delete"
											className="w-5 h-5 mr-2"
										/>
										Delete
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
