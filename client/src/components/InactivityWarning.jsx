import React from 'react'
import { useAuth } from '../context/AuthContext'

const InactivityWarning = () => {
	const { timeRemaining, extendSession, isWarningActive } = useAuth()

	if (!isWarningActive) {
		return null
	}

	const minutes = Math.floor(timeRemaining / 60)
	const seconds = timeRemaining % 60

	return (
		<div className="fixed bottom-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg">
			<p className="font-bold">Inactivity Warning</p>
			<p>
				You will be logged out in {minutes}:
				{seconds.toString().padStart(2, '0')} due to inactivity.
			</p>
			<button
				onClick={extendSession}
				className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
			>
				Stay logged in?
			</button>
		</div>
	)
}

export default InactivityWarning
