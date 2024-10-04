import React from 'react'

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
	return (
		<div>
			<input
				type="text"
				placeholder={placeholder || 'Search...'}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="px-4 py-2 bg-[#999999] text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
	)
}

export default SearchBar
