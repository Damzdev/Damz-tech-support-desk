const express = require('express')
const { db } = require('../firebase-admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

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
			{ userId: userDoc.id, email: userData.email },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		)

		// Set token in HTTP-only cookie
		res.cookie('secureLogin', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
			maxAge: 3600000, // 1 hour in milliseconds
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
		const { email, name, password } = req.body
		const hashedPassword = await bcrypt.hash(password, 10)
		const userRef = db.collection('employees').doc() // Auto-generate ID
		await userRef.set({ email, name, password: hashedPassword })
		res.status(200).send({ success: true, message: 'User added to Firestore' })
	} catch (err) {
		console.error('Error adding user to Firestore:', err)
		res.status(500).send({ success: false, message: 'Failed to add user' })
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

router.get('/check-auth', (req, res) => {
	const token = req.cookies.secureLogin

	if (!token) {
		return res.json({ isAuthenticated: false })
	}

	try {
		jwt.verify(token, process.env.JWT_SECRET)
		res.json({ isAuthenticated: true })
	} catch (error) {
		res.json({ isAuthenticated: false })
	}
})

router.post('/logout', (req, res) => {
	res.clearCookie('secureLogin')
	res.json({ message: 'Logged out successfully' })
})

module.exports = router
