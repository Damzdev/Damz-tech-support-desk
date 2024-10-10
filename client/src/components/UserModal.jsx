import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

const UserModal = ({ isOpen, onClose, modalType, user, onSave, onDelete }) => {
	const [localUser, setLocalUser] = useState(user)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setLocalUser(user)
	}, [user])

	const handleChange = (field, value) => {
		setLocalUser((prev) => ({ ...prev, [field]: value }))
	}

	const handleSubmit = () => {
		setIsLoading(true)
		setTimeout(() => {
			onSave(localUser)
			setIsLoading(false)
		}, 2000)
	}

	const modalStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: '#1E1E1E',
		color: '#FFFFFF',
		border: '1px solid #333333',
		boxShadow: 24,
		p: 4,
	}

	if (!localUser) {
		return null // or return a loading indicator
	}

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			aria-labelledby="user-modal"
			aria-describedby="modal-for-user-operations"
		>
			<Box sx={modalStyle}>
				<h2 id="user-modal" className="text-2xl mb-4">
					{modalType === 'add' && 'Add New User'}
					{modalType === 'edit' && 'Edit User'}
					{modalType === 'delete' && 'Confirm Delete User'}
				</h2>
				{modalType !== 'delete' ? (
					<>
						<TextField
							fullWidth
							label="Full Name"
							value={localUser.name}
							onChange={(e) => handleChange('name', e.target.value)}
							sx={{
								mb: 2,
								input: { color: '#FFFFFF' },
								label: { color: '#999999' },
							}}
						/>
						<TextField
							fullWidth
							label="Email"
							type="email"
							value={localUser.email}
							onChange={(e) => handleChange('email', e.target.value)}
							autoComplete="off"
							sx={{
								mb: 2,
								input: { color: '#FFFFFF' },
								label: { color: '#999999' },
							}}
						/>
						{modalType === 'add' && (
							<TextField
								fullWidth
								label="Password"
								type="password"
								value={localUser.password}
								onChange={(e) => handleChange('password', e.target.value)}
								autoComplete="new-password"
								sx={{
									mb: 2,
									input: { color: '#FFFFFF' },
									label: { color: '#999999' },
								}}
							/>
						)}
						<Select
							fullWidth
							value={localUser.role}
							onChange={(e) => handleChange('role', e.target.value)}
							sx={{
								mb: 4,
								color: '#FFFFFF',
								'.MuiOutlinedInput-notchedOutline': {
									borderColor: '#999999',
								},
								'& .MuiSelect-icon': {
									color: '#FFFFFF',
								},
								'& .MuiPaper-root': {
									backgroundColor: '#333333',
								},
							}}
							MenuProps={{
								PaperProps: {
									sx: {
										bgcolor: '#333333',
										'& .MuiMenuItem-root': {
											color: '#FFFFFF',
											'&:hover': {
												backgroundColor: '#4A4A4A',
											},
											'&.Mui-selected': {
												backgroundColor: '#4A4A4A',
												'&:hover': {
													backgroundColor: '#5A5A5A',
												},
											},
										},
									},
								},
							}}
						>
							<MenuItem value="">Select Role</MenuItem>
							<MenuItem value="Admin">Admin</MenuItem>
							<MenuItem value="Senior Support">Senior Support</MenuItem>
							<MenuItem value="Junior Support">Junior Support</MenuItem>
							<MenuItem value="Product Manager">Product Manager</MenuItem>
						</Select>
						<Button
							variant="contained"
							onClick={handleSubmit}
							disabled={isLoading}
						>
							{isLoading ? (
								<CircularProgress size={24} color="primary" />
							) : modalType === 'add' ? (
								'Add User'
							) : (
								'Save Changes'
							)}
						</Button>
					</>
				) : (
					<>
						<p>Are you sure you want to delete this user?</p>
						<p className="mt-2">
							<strong>Name:</strong> {localUser.name}
							<br />
							<strong>Role:</strong> {localUser.role}
						</p>
						<div className="mt-4 flex justify-end">
							<Button
								variant="contained"
								color="error"
								onClick={() => {
									setIsLoading(true)
									setTimeout(() => {
										onDelete()
										setIsLoading(false)
									}, 2000)
								}}
								disabled={isLoading}
							>
								{isLoading ? (
									<CircularProgress size={24} color="primary" />
								) : (
									'Delete'
								)}
							</Button>
						</div>
					</>
				)}
			</Box>
		</Modal>
	)
}

export default UserModal
