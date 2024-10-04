import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function ActivityTracker() {
	const { resetLogoutTimer, isWarningActive } = useAuth()

	useEffect(() => {
		const events = ['mousedown', 'keydown', 'scroll', 'mousemove']

		const resetTimer = () => {
			if (!isWarningActive) {
				resetLogoutTimer()
			}
		}

		events.forEach((event) => {
			window.addEventListener(event, resetTimer)
		})

		return () => {
			events.forEach((event) => {
				window.removeEventListener(event, resetTimer)
			})
		}
	}, [resetLogoutTimer, isWarningActive])

	return null
}
