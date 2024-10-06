import React from 'react'

const MessagesSkeleton = () => {
	return (
		<div className="space-y-4 animate-pulse">
			{[...Array(3)].map((_, index) => (
				<div
					key={index}
					className={`flex items-start space-x-3 ${
						index % 2 === 0 ? '' : 'justify-end'
					}`}
				>
					<div
						className={`w-10 h-10 bg-gray-300 rounded-full ${
							index % 2 !== 0 && 'order-2'
						}`}
					></div>
					<div
						className={`bg-gray-300 p-4 rounded-lg ${
							index % 2 === 0 ? 'w-4/5' : 'w-3/5'
						}`}
					>
						<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
						<div className="h-4 bg-gray-200 rounded"></div>
						<div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
						<div className="h-4 bg-gray-200 rounded w-1/4 mt-2 ml-auto"></div>
					</div>
				</div>
			))}
		</div>
	)
}

export default MessagesSkeleton
