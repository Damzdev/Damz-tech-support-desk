const express = require('express')
const { db } = require('../firebase-admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

const formatDate = (dateString) => {
	return new Date(dateString)
		.toLocaleString('en-US', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		})
		.replace(',', '')
}

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body

		// Query Firestore for the user
		const usersRef = db.collection('employees')
		const snapshot = await usersRef.where('email', '==', email).get()

		if (snapshot.empty) {
			return res.status(401).json({ message: 'Invalid email or password' })
		}

		// Get the first matching document
		const userDoc = snapshot.docs[0]
		const userData = userDoc.data()

		// Compare passwords
		if (password !== userData.password) {
			return res.status(401).json({ message: 'Invalid email or password' })
		}

		// Generate JWT token
		const token = jwt.sign(
			{ userId: userDoc.id, email: userData.email, name: userData.name },
			process.env.JWT_SECRET,
			{ expiresIn: '24h' }
		)

		// Set token in HTTP-only cookie
		res.cookie('secureLogin', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
			maxAge: 24 * 60 * 60 * 1000, // 30 min in milliseconds
		})

		res.status(200).json({
			message: 'Login successful',
			user: {
				id: userDoc.id,
				email: userData.email,
				name: userData.name,
			},
		})
	} catch (error) {
		console.error('Login error:', error)
		res.status(500).json({ message: 'An error occurred during login' })
	}
})

router.post('/add-user', async (req, res) => {
	try {
		const { email, name, password, role, joinDate } = req.body
		const hashedPassword = await bcrypt.hash(password, 10)
		const joinedDate = formatDate(joinDate)

		// Fetch the current highest ID
		const snapshot = await db
			.collection('employees')
			.orderBy('id', 'desc')
			.limit(1)
			.get()

		let nextId = 111 // Start from 111 as the next ID after 110
		if (!snapshot.empty) {
			nextId = parseInt(snapshot.docs[0].data().id) + 1
		}

		const userRef = db.collection('employees').doc(nextId.toString())

		await userRef.set({
			id: nextId.toString(),
			email,
			name,
			password: hashedPassword,
			role,
			joinedDate,
		})

		res.status(200).send({
			success: true,
			message: 'User added to Firestore',
			userId: nextId,
		})
	} catch (err) {
		console.error('Error adding user to Firestore:', err)
		res.status(500).send({ success: false, message: 'Failed to add user' })
	}
})

router.delete('/delete-user/:id', async (req, res) => {
	try {
		const userId = req.params.id
		const userRef = db.collection('employees').doc(userId)

		const doc = await userRef.get()
		if (!doc.exists) {
			return res.status(404).send({ success: false, message: 'User not found' })
		}

		await userRef.delete()
		res
			.status(200)
			.send({ success: true, message: 'User deleted successfully' })
	} catch (error) {
		console.error('Error deleting user:', error)
		res.status(500).send({ success: false, message: 'Failed to delete user' })
	}
})

router.put('/update-user/:id', async (req, res) => {
	try {
		const userId = req.params.id
		const { name, email, role } = req.body

		const userRef = db.collection('employees').doc(userId)

		// Check if the user exists
		const doc = await userRef.get()
		if (!doc.exists) {
			return res.status(404).json({ success: false, message: 'User not found' })
		}

		// Update the user
		await userRef.update({
			name,
			email,
			role,
		})

		res
			.status(200)
			.json({ success: true, message: 'User updated successfully' })
	} catch (error) {
		console.error('Error updating user:', error)
		res.status(500).json({ success: false, message: 'Failed to update user' })
	}
})

router.get('/users', async (req, res) => {
	try {
		const usersSnapshot = await db.collection('employees').get()
		const users = usersSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		res.status(200).json(users)
	} catch (err) {
		console.error('Error fetching users from Firestore:', err)
		res.status(500).send({ success: false, message: 'Failed to fetch users' })
	}
})

router.get('/customers', async (req, res) => {
	try {
		const customersSnapshot = await db.collection('users').get()
		const customers = customersSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		res.status(200).json(customers)
	} catch (error) {
		console.error('Error fetching customers from Firestore:', error)
		res
			.status(500)
			.send({ success: false, message: 'Failed to fetch customers' })
	}
})

router.get('/check-auth', (req, res) => {
	const token = req.cookies.secureLogin

	if (!token) {
		return res.json({ isAuthenticated: false })
	}

	try {
		jwt.verify(token, process.env.JWT_SECRET)
		res.json({
			isAuthenticated: true,
			sessionDuration: 30 * 60,
			warningThreshold: 5 * 60,
		})
	} catch (error) {
		res.json({ isAuthenticated: false })
	}
})

router.get('/current-user', (req, res) => {
	const token = req.cookies.secureLogin

	if (!token) {
		return res.status(401).json({ message: 'Not authenticated' })
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		res.json({
			userId: decoded.userId,
			email: decoded.email,
			name: decoded.name,
		})
	} catch (error) {
		res.status(401).json({ message: 'Invalid token' })
	}
})

router.post('/logout', (req, res) => {
	res.clearCookie('secureLogin')
	res.json({ message: 'Logged out successfully' })
})

module.exports = router
