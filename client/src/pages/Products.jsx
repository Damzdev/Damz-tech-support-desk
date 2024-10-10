import React, { useState, useEffect, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import trashIcon from '../assets/users/trashIcon.svg'
import editIcon from '../assets/users/pencilIcon.svg'
import CustomCheckbox from '../components/CustomCheckbox'
import aticon from '../assets/users/atSign.svg'
import calendar from '../assets/users/calendar.svg'
import roleIcon from '../assets/users/roleIcon.svg'
import address from '../assets/orders/Address.svg'
import Pagination from '../components/Pagination'
import ProductModal from '../components/ProductsModal'
import chevron from '../assets/users/chevron.svg'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'

export default function Products() {
	const [selectAll, setSelectAll] = useState(false)
	const [selectedProducts, setSelectedProducts] = useState({})
	const [products, setProducts] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [expandedNames, setExpandedNames] = useState({})
	const [searchType, setSearchType] = useState('name') // 'name' or 'id'
	const [modalType, setModalType] = useState(null)
	const [modalProduct, setModalProduct] = useState({
		name: '',
		price: '',
		stock: '',
		ImageURL: '',
		category: '',
	})
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success',
	})

	useEffect(() => {
		fetchProducts()
	}, [])

	const fetchProducts = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/products')
			if (!response.ok) {
				throw new Error('Failed to fetch products')
			}
			const data = await response.json()
			setProducts(data)
			localStorage.setItem(
				'cachedProducts',
				JSON.stringify({
					data,
					timestamp: Date.now(),
				})
			)
		} catch (error) {
			console.error('Error fetching products:', error)
		}
	}

	const truncateName = (name, maxLength = 15) => {
		return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name
	}

	const toggleName = (index) => {
		setExpandedNames((prev) => ({
			...prev,
			[index]: !prev[index],
		}))
	}

	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			if (!product) return false // Skip null or undefined products
			if (searchType === 'name') {
				return (
					product.name &&
					product.name.toLowerCase().includes(searchTerm.toLowerCase())
				)
			} else if (searchType === 'id') {
				return (
					product.id &&
					product.id.toLowerCase().includes(searchTerm.toLowerCase())
				)
			}
			return true
		})
	}, [searchTerm, products, searchType])

	const getCurrentPageItems = (items) => {
		const indexOfLastItem = currentPage * itemsPerPage
		const indexOfFirstItem = indexOfLastItem - itemsPerPage
		return items.slice(indexOfFirstItem, indexOfLastItem)
	}

	const handleSelectAll = () => {
		const newSelectAll = !selectAll
		setSelectAll(newSelectAll)
		const newSelectedProducts = {}
		products.forEach((product, index) => {
			newSelectedProducts[index] = newSelectAll
		})
		setSelectedProducts(newSelectedProducts)
	}

	const handleSelectProduct = (index) => {
		setSelectedProducts((prev) => {
			const newSelectedProducts = { ...prev, [index]: !prev[index] }
			const allSelected = products.every(
				(_, i) => newSelectedProducts[i] === true
			)
			if (allSelected !== selectAll) {
				setSelectAll(allSelected)
			}

			return newSelectedProducts
		})
	}

	const openModal = (type, product = null) => {
		setModalType(type)
		setModalProduct(product || { name: '', price: '', stock: '' })
	}

	const closeModal = () => {
		setModalType(null)
		setModalProduct(null)
	}

	const handleSave = async (updatedProduct) => {
		if (modalType === 'add') {
			await handleAddProduct(updatedProduct)
		} else {
			await handleUpdateProduct(updatedProduct)
		}
		await fetchProducts()
		closeModal()
	}

	const handleDeleteProduct = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/delete-product/${modalProduct.id}`,
				{
					method: 'DELETE',
				}
			)
			if (response.ok) {
				closeModal()
				const updatedProducts = products.filter(
					(product) => product.id !== modalProduct.id
				)
				setProducts(updatedProducts)
				localStorage.setItem(
					'cachedProducts',
					JSON.stringify({
						data: updatedProducts,
						timestamp: Date.now(),
					})
				)
				showSnackbar('Product deleted successfully!', 'info')
			}
		} catch (error) {
			console.error('Error deleting product:', error)
			showSnackbar('Error deleting product', 'error')
		}
	}

	const handleUpdateProduct = async (updatedProduct) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/update-product/${updatedProduct.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: updatedProduct.name,
						price: updatedProduct.price,
						stock: updatedProduct.stock,
						ImageURL: updatedProduct.ImageURL,
						category: updatedProduct.category,
					}),
				}
			)

			if (response.ok) {
				const updatedProducts = products.map((product) =>
					product.id === updatedProduct.id ? updatedProduct : product
				)
				setProducts(updatedProducts)
				localStorage.setItem(
					'cachedProducts',
					JSON.stringify({
						data: updatedProducts,
						timestamp: Date.now(),
					})
				)
				showSnackbar('Product updated successfully!')
			}
		} catch (error) {
			console.error('Error updating product:', error)
			showSnackbar('Error updating product', 'error')
		}
	}

	const handleAddProduct = async (newProduct) => {
		try {
			const response = await fetch('http://localhost:5000/api/add-product', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newProduct),
			})

			if (response.ok) {
				const addedProduct = await response.json()
				setProducts((prevProducts) => {
					const updatedProducts = [...prevProducts, addedProduct]
					localStorage.setItem(
						'cachedProducts',
						JSON.stringify({
							data: updatedProducts,
							timestamp: Date.now(),
						})
					)
					return updatedProducts
				})
				showSnackbar('Product added successfully!')
				return addedProduct
			}
		} catch (error) {
			console.error('Error adding product:', error)
		}
	}

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setSnackbar((prev) => ({ ...prev, open: false }))
	}

	const showSnackbar = (message, severity = 'success') => {
		setSnackbar({ open: true, message, severity })
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
			<div className="mb-4 flex items-center">
				<select
					value={searchType}
					onChange={(e) => setSearchType(e.target.value)}
					className="mr-2 p-2 bg-gray-700 text-white rounded-md"
				>
					<option value="name">Name</option>
					<option value="id">ID</option>
				</select>
				<SearchBar
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					placeholder={`Search products by ${searchType}...`}
				/>
				<button
					onClick={() => openModal('add')}
					className="text-white text-lg font-semibold w-40 p-1.5 ml-auto border border-[#999999] hover:bg-user-button-blue rounded-lg flex items-center justify-evenly"
				>
					<span>Add Product</span>
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
									Product name
								</span>
							</div>
						</th>
						<th className="px-2 sm:px-3 lg:px-4 py-2 text-left border-r border-[#999999]">
							<span className="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-semibold text-[#999999] flex items-center">
								<img src={address} alt="address" className="w-5 h-5 mr-2" />
								Price
							</span>
						</th>
						<th className="px-2 sm:px-3 lg:px-4 py-2 text-left border-r border-[#999999]">
							<span className="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-semibold text-[#999999] flex items-center">
								<img src={aticon} alt="atIcon" className="w-5 h-5 mr-2" />
								Stock amount
							</span>
						</th>
						<th className="px-2 sm:px-3 lg:px-4 py-2 text-left border-r border-[#999999]">
							<span className="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-semibold text-[#999999] flex items-center w-32">
								<img src={roleIcon} alt="atIcon" className="w-7 h-7" />
								Product id
							</span>
						</th>
						<th className="px-2 sm:px-3 lg:px-4 py-2 text-left hidden sm:table-cell border-r border-[#999999]">
							<span className="text-sm sm:text-base lg:text-xl 2xl:text-2xl font-semibold text-[#999999] flex items-center">
								<img src={calendar} alt="atIcon" className="w-5 h-5 mr-2" />
								Entry Date
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
					{getCurrentPageItems(filteredProducts).map((product, index) => (
						<tr key={product.id} className="border-b border-[#999999]">
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
								<div className="flex items-center">
									<CustomCheckbox
										isChecked={selectedProducts[index] || false}
										onChange={() => handleSelectProduct(index)}
									/>
									<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl font-semibold text-gray-300 ml-2">
										{expandedNames[index]
											? product.name
											: truncateName(product.name)}
									</span>
									{product.name.length > 15 && (
										<button
											onClick={() => toggleName(index)}
											className="ml-2 text-xs sm:text-sm text-blue-500 hover:text-blue-400"
										>
											{expandedNames[index] ? 'Show less' : 'Show more'}
										</button>
									)}
								</div>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r lg:max-w-52 2xl:max-w-max border-[#999999]">
								<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-[#999999]">
									R{product.price}
								</span>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
								<span
									className={`text-xs sm:text-sm lg:text-base 2xl:text-xl ${
										Number(product.stock) === 0
											? 'text-red-500'
											: 'text-[#999999]'
									}`}
								>
									{product.stock}
								</span>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
								<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-gray-300 font-semibold">
									#{product.id}
								</span>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 hidden sm:table-cell border-r border-[#999999]">
								<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-gray-300 font-semibold">
									{new Date().toLocaleString()}{' '}
									{/* Placeholder for entry date */}
								</span>
							</td>
							<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4">
								<div className="flex items-center">
									<button
										onClick={() => openModal('edit', product)}
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
										onClick={() => openModal('delete', product)}
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
				totalItems={filteredProducts.length}
				itemsPerPage={itemsPerPage}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
				onItemsPerPageChange={setItemsPerPage}
			/>
			<ProductModal
				isOpen={modalType !== null}
				onClose={closeModal}
				modalType={modalType}
				product={modalProduct}
				onSave={handleSave}
				onDelete={handleDeleteProduct}
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
