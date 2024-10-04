import React, { useState, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
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

export default function Products() {
	const [selectAll, setSelectAll] = useState(false)
	const [selectedProducts, setSelectedProducts] = useState({})
	const [searchTerm, setSearchTerm] = useState('')

	const products = [
		{
			name: 'Razer Keyboard',
			price: '2399',
			stock: 20,
			productId: '#420135',
			entryDate: '06 Sep 2024, 8:30 am',
		},
		{
			name: 'Razer Mouse',
			price: '1499',
			stock: 7,
			productId: '#420136',
			entryDate: '06 Sep 2024, 8:31 am',
		},
		{
			name: '4060 Nvidia Card',
			price: '7899',
			stock: 24,
			productId: '#420137',
			entryDate: '06 Sep 2024, 8:32 am',
		},
		{
			name: 'Gaming Pc',
			price: '13999',
			stock: 4,
			productId: '#420138',
			entryDate: '06 Sep 2024, 8:33 am',
		},
		{
			name: 'Gaming Laptop',
			price: '10999',
			stock: 18,
			productId: '#420139',
			entryDate: '06 Sep 2024, 8:34 am',
		},
		{
			name: '4090 Nvidia Card',
			price: '49499',
			stock: 0,
			productId: '#420140',
			entryDate: '06 Sep 2024, 8:35 am',
		},
		{
			name: 'Mechanical Keyboard',
			price: '3299',
			stock: 11,
			productId: '#420141',
			entryDate: '06 Sep 2024, 8:50 am',
		},
		{
			name: '2TB SSD',
			price: '899',
			stock: 26,
			productId: '#420142',
			entryDate: '06 Sep 2024, 9:14 am',
		},
		{
			name: 'Curved Monitor',
			price: '3599',
			stock: 14,
			productId: '#420143',
			entryDate: '07 Sep 2024, 8:38 am',
		},
		{
			name: 'RGB Mouse Pad',
			price: '499',
			stock: 19,
			productId: '#420144',
			entryDate: '07 Sep 2024, 8:50 am',
		},
	]

	const filteredProducts = useMemo(() => {
		return products.filter((product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
	}, [searchTerm, products])

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

	return (
		<div className="bg-black rounded-tl-lg h-full p-2 sm:p-4 lg:p-6 max-h-[calc(100vh-100px)] overflow-auto">
			<div className="mb-4">
				<SearchBar
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					placeholder="Search products..."
				/>
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
					{filteredProducts.length > 0 ? (
						filteredProducts.map((product, index) => (
							<tr key={index} className="border-b border-[#999999]">
								<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
									<div className="flex items-center">
										<CustomCheckbox
											isChecked={selectedProducts[index] || false}
											onChange={() => handleSelectProduct(index)}
										/>
										<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl font-semibold text-gray-300 ml-2">
											{product.name}
										</span>
									</div>
								</td>
								<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r lg:max-w-52 2xl:max-w-max border-[#999999]">
									<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-[#999999]">
										R {product.price}
									</span>
								</td>
								<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
									<span
										className={`text-xs sm:text-sm lg:text-base 2xl:text-xl  ${
											product.stock === 0 ? 'text-red-500' : 'text-[#999999]'
										}`}
									>
										{product.stock}
									</span>
								</td>
								<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border-r border-[#999999]">
									<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-gray-300 font-semibold">
										{product.productId}
									</span>
								</td>
								<td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 hidden sm:table-cell border-r border-[#999999]">
									<span className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-gray-300 font-semibold">
										{product.entryDate}
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
						))
					) : (
						<tr>
							<td colSpan="6" className="pl-4 py-4">
								<span className="text-white text-lg whitespace-pre-line">{`No results found,\nplease try again!`}</span>
							</td>
						</tr>
					)}
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
