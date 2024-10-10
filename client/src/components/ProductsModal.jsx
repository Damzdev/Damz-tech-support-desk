import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

const ProductModal = ({
	isOpen,
	onClose,
	modalType,
	product,
	onSave,
	onDelete,
}) => {
	const [localProduct, setLocalProduct] = useState(product)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setLocalProduct(product)
	}, [product])

	const handleChange = (field, value) => {
		setLocalProduct((prev) => ({ ...prev, [field]: value }))
	}

	const handleSubmit = () => {
		setIsLoading(true)
		setTimeout(() => {
			onSave(localProduct)
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

	if (!localProduct) {
		return null
	}

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			aria-labelledby="product-modal"
			aria-describedby="modal-for-product-operations"
		>
			<Box sx={modalStyle}>
				<h2 id="product-modal" className="text-2xl mb-4">
					{modalType === 'add' && 'Add New Product'}
					{modalType === 'edit' && 'Edit Product'}
					{modalType === 'delete' && 'Confirm Delete Product'}
				</h2>
				{modalType !== 'delete' ? (
					<>
						<TextField
							fullWidth
							label="Product Name"
							value={localProduct.name}
							onChange={(e) => handleChange('name', e.target.value)}
							sx={{
								mb: 2,
								input: { color: '#FFFFFF' },
								label: { color: '#999999' },
							}}
						/>
						<TextField
							fullWidth
							label="Price"
							type="number"
							value={localProduct.price}
							onChange={(e) => handleChange('price', e.target.value)}
							sx={{
								mb: 2,
								input: { color: '#FFFFFF' },
								label: { color: '#999999' },
							}}
						/>
						<TextField
							fullWidth
							label="Stock"
							type="number"
							value={localProduct.stock}
							onChange={(e) => handleChange('stock', e.target.value)}
							sx={{
								mb: 2,
								input: { color: '#FFFFFF' },
								label: { color: '#999999' },
							}}
						/>
						<TextField
							fullWidth
							label="Image URL"
							value={localProduct.ImageURL || ''}
							onChange={(e) => handleChange('ImageURL', e.target.value)}
							sx={{
								mb: 2,
								input: { color: '#FFFFFF' },
								label: { color: '#999999' },
							}}
						/>
						<TextField
							fullWidth
							label="Category"
							value={localProduct.category || ''}
							onChange={(e) => handleChange('category', e.target.value)}
							sx={{
								mb: 4,
								input: { color: '#FFFFFF' },
								label: { color: '#999999' },
							}}
						/>
						<Button
							variant="contained"
							onClick={handleSubmit}
							disabled={isLoading}
						>
							{isLoading ? (
								<CircularProgress size={24} color="primary" />
							) : modalType === 'add' ? (
								'Add Product'
							) : (
								'Save Changes'
							)}
						</Button>
					</>
				) : (
					<>
						<p>Are you sure you want to delete this product?</p>
						<p className="mt-2">
							<strong>Name:</strong> {localProduct.name}
							<br />
							<strong>Price:</strong> R{localProduct.price}
							<br />
							<strong>Stock:</strong> {localProduct.stock}
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

export default ProductModal
