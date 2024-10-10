import React, { useState, useRef, useEffect } from 'react'
import chevron from '../assets/users/chevron.svg'
import doubleleftarrow from '../assets/users/left-double-arrow.svg'
import leftarrow from '../assets/users/left-arrow.svg'

const Pagination = ({
	totalItems,
	itemsPerPage,
	currentPage,
	onPageChange,
	onItemsPerPageChange,
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef(null)
	const buttonRef = useRef(null)
	const totalPages = Math.ceil(totalItems / itemsPerPage)

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target)
			) {
				setIsDropdownOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	useEffect(() => {
		const maxPage = Math.ceil(totalItems / itemsPerPage)
		if (currentPage > maxPage) {
			onPageChange(Math.max(1, maxPage))
		}
	}, [totalItems, itemsPerPage, currentPage, onPageChange])

	const goToPage = (page) => {
		onPageChange(Math.min(Math.max(1, page), totalPages))
	}

	const nextPage = () => goToPage(currentPage + 1)
	const prevPage = () => goToPage(currentPage - 1)
	const firstPage = () => goToPage(1)
	const lastPage = () => goToPage(totalPages)
	const jumpPages = (direction) => {
		const newPage =
			direction === 'forward'
				? Math.min(currentPage + 3, totalPages)
				: Math.max(currentPage - 3, 1)
		onPageChange(newPage)
	}

	return (
		<div
			className={`py-8 ${
				isDropdownOpen ? 'pb-20' : 'pb-12'
			} px-8 flex text-xs items-center`}
		>
			<span className="text-[#999999] font-semibold mr-6">Rows per page</span>
			<div className="flex items-center relative">
				<span className="text-[#999999] font-semibold mr-2">
					{`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
						currentPage * itemsPerPage,
						totalItems
					)} of ${totalItems}`}
				</span>
				<button
					ref={buttonRef}
					className="text-[#999999] font-semibold w-8 h-4 px-1 border border-[#999999] hover:bg-user-button-blue rounded-sm flex items-center justify-between"
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				>
					<span>{itemsPerPage}</span>
					<img src={chevron} alt="chevron" className="w-1.5 h-1.5" />
				</button>
				{isDropdownOpen && (
					<div
						ref={dropdownRef}
						className="absolute top-[-20px] left-full ml-2 bg-[#0066FF] bg-opacity-15 border border-[#999999] rounded-sm shadow-md"
						style={{ minWidth: '40px' }}
					>
						{[10, 20, 50, 100].map((value) => (
							<button
								key={value}
								className="block w-full text-left px-3 py-1 hover:bg-[#999999] text-[#999999] hover:text-white"
								onClick={() => {
									onItemsPerPageChange(value)
									setIsDropdownOpen(false)
									onPageChange(1)
								}}
							>
								{value}
							</button>
						))}
					</div>
				)}
			</div>
			<div className="ml-auto flex items-center">
				<button
					className="text-[#999999] w-5 h-5 mx-1 border border-[#999999] hover:bg-user-button-blue rounded-sm flex items-center justify-center"
					onClick={firstPage}
					disabled={currentPage === 1}
				>
					<img
						src={doubleleftarrow}
						alt="doubleleftarrow"
						className="w-3 h-3"
					/>
				</button>
				<button
					className="text-[#999999] w-5 h-5 border border-[#999999] hover:bg-user-button-blue rounded-sm flex items-center justify-center"
					onClick={prevPage}
					disabled={currentPage === 1}
				>
					<img src={leftarrow} alt="leftarrow" className="w-3 h-3" />
				</button>
				{Array.from({ length: totalPages }, (_, i) => i + 1)
					.filter(
						(page) =>
							page === 1 ||
							page === totalPages ||
							(page >= currentPage - 1 && page <= currentPage + 1)
					)
					.map((page, index, array) => (
						<React.Fragment key={page}>
							{index > 0 && array[index - 1] !== page - 1 && (
								<button
									className="text-[#999999] mx-2 hover:text-white font-semibold"
									onClick={() =>
										jumpPages(index === 1 ? 'backward' : 'forward')
									}
								>
									...
								</button>
							)}
							<button
								className={`${
									currentPage === page
										? 'text-white'
										: 'text-[#999999] hover:text-white'
								} mx-2 font-semibold`}
								onClick={() => goToPage(page)}
							>
								{page}
							</button>
						</React.Fragment>
					))}
				<button
					className="text-[#999999] w-5 h-5 mx-1 border border-[#999999] hover:bg-user-button-blue rounded-sm flex items-center justify-center"
					onClick={nextPage}
					disabled={currentPage === totalPages}
				>
					<img
						src={leftarrow}
						alt="rightarrow"
						className="w-3 h-3 transform -scale-x-100"
					/>
				</button>
				<button
					className="text-[#999999] w-5 h-5 border border-[#999999] hover:bg-user-button-blue rounded-sm flex items-center justify-center"
					onClick={lastPage}
					disabled={currentPage === totalPages}
				>
					<img
						src={doubleleftarrow}
						alt="doublerightarrow"
						className="w-3 h-3 transform -scale-x-100"
					/>
				</button>
			</div>
		</div>
	)
}

export default Pagination
