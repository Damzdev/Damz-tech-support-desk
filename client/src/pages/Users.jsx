import React, { useEffect, useState, useMemo, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import trashIcon from '../assets/users/trashIcon.svg'
import editIcon from '../assets/users/pencilIcon.svg'
import CustomCheckbox from '../components/CustomCheckbox'
import aticon from '../assets/users/atSign.svg'
import calendar from '../assets/users/calendar.svg'
import roleIcon from '../assets/users/roleIcon.svg'
import chevron from '../assets/users/chevron.svg'
import UserModal from '../components/userModal'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'

export default function Users() {
	const [selectAll, setSelectAll] = useState(false)
	const [selectedUsers, setSelectedUsers] = useState({})
	const { employees, setEmployees } = useContext(UserContext)
	const [users, setUsers] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [modalType, setModalType] = useState(null)
	const [modalUser, setModalUser] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success',
	})

	useEffect(() => {
		if (employees.length === 0) {
			fetchUsers()
		}
	}, [employees])

	const openModal = (type, user = null) => {
		setModalType(type)
		setModalUser(user || { name: '', email: '', password: '', role: '' })
	}

	const closeModal = () => {
		setModalType(null)
		setModalUser(null)
	}

	useEffect(() => {
		const cachedUsers = localStorage.getItem('cachedUsers')
		if (cachedUsers) {
			setUsers(JSON.parse(cachedUsers))
		} else {
			fetchUsers()
		}
	}, [])

	const fetchUsers = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/users')
			if (response.ok) {
				const data = await response.json()
				setEmployees(data)
			}
		} catch (error) {
			console.error('Error fetching users:', error)
		}
	}

	const handleSave = async (user) => {
		if (modalType === 'add') {
			await handleAddUser(user)
		} else if (modalType === 'edit') {
			await handleUpdateUser(user)
		}
		closeModal()
		fetchUsers()
	}

	const handleAddUser = async (user) => {
		try {
			const response = await fetch('http://localhost:5000/api/add-user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...user,
					joinDate: new Date().toISOString(),
				}),
			})

			if (response.ok) {
				fetchUsers()
				showSnackbar('User added successfully!', 'success')
			}
		} catch (error) {
			console.error('Error adding user:', error)
			showSnackbar('Error adding user', 'error')
		}
	}

	const handleUpdateUser = async (updatedUser) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/update-user/${updatedUser.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatedUser),
				}
			)
			if (response.ok) {
				console.log('User updated successfully')
				showSnackbar('User updated successfully!', 'success')
			}
		} catch (error) {
			console.error('Error updating user:', error)
			showSnackbar('Error updating user', 'error')
		}
	}

	const handleDeleteUser = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/delete-user/${modalUser.id}`,
				{
					method: 'DELETE',
				}
			)
			if (response.ok) {
				closeModal()
				fetchUsers()
				showSnackbar('User deleted successfully!', 'info')
			}
		} catch (error) {
			console.error('Error deleting user:', error)
			showSnackbar('Error deleting user', 'error')
		}
	}

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

	const filteredUsers = useMemo(() => {
		return employees.filter(
			(user) =>
				user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.role.toLowerCase().includes(searchTerm.toLowerCase())
		)
	}, [searchTerm, employees])

	const getCurrentPageItems = (items) => {
		const indexOfLastItem = currentPage * itemsPerPage
		const indexOfFirstItem = indexOfLastItem - itemsPerPage
		return items.slice(indexOfFirstItem, indexOfLastItem)
	}

	const showSnackbar = (message, severity = 'success') => {
		setSnackbar({ open: true, message, severity })
	}

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setSnackbar((prev) => ({ ...prev, open: false }))
	}

	const DarkAlert = styled(MuiAlert)(() => ({
		color: '#fff',
		backgroundColor: '#333',
		'& .MuiAlert-icon': {
			color: '#fff',
		},
	}))

	return (
		<div className="bg-black rounded-tl-lg h-full p-2 sm:p-4 lg:p-6 max-h-[calc(100vh-100px)] overflow-auto">
			<div className="flex mb-4 pr-10">
				<SearchBar
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					placeholder="Search users..."
				/>
				<button
					onClick={() => openModal('add')}
					className="text-white text-lg font-semibold w-40 p-1.5 ml-auto border border-[#999999] hover:bg-user-button-blue rounded-lg flex items-center justify-evenly"
				>
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
					{getCurrentPageItems(filteredUsers).map((user, index) => (
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
									<button
										onClick={() => openModal('edit', user)}
										className="bg-user-button-blue bg-opacity-20 text-gray-400 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg mr-1 sm:mr-2 flex items-center font-semibold text-xs sm:text-sm lg:text-base"
									>
										<img
											src={editIcon}
											alt="Edit"
											className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2"
										/>
										Edit
									</button>
									<button
										onClick={() => openModal('delete', user)}
										className="bg-user-button-blue bg-opacity-20 text-gray-400 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg flex items-center font-semibold text-xs sm:text-sm lg:text-base"
									>
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
			<Pagination
				totalItems={filteredUsers.length}
				itemsPerPage={itemsPerPage}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
				onItemsPerPageChange={setItemsPerPage}
			/>
			<UserModal
				isOpen={modalType !== null}
				onClose={closeModal}
				modalType={modalType}
				user={modalUser}
				onSave={handleSave}
				onDelete={handleDeleteUser}
			/>
			<Snackbar
				open={snackbar.open}
				autoHideDuration={5000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<DarkAlert
					onClose={handleSnackbarClose}
					severity={snackbar.severity}
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</DarkAlert>
			</Snackbar>
		</div>
	)
}
