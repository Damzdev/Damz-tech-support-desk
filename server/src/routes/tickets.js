const express = require('express')
const { db } = require('../firebase-admin')
const router = express.Router()

router.get('/tickets', async (req, res) => {
	try {
		const ticketsSnapshot = await db.collection('tickets').get()
		const tickets = ticketsSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		res.status(200).json(tickets)
	} catch (err) {
		console.error('Error fetching tickets from Firestore:', err)
		res.status(500).send({ success: false, message: 'Failed to fetch tickets' })
	}
})

module.exports = router
