const express = require('express')
const { db } = require('../firebase-admin')
const router = express.Router()

router.get('/orders', async (req, res) => {
	try {
		const ordersSnapshot = await db.collection('orders').get()
		const orders = ordersSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		res.status(200).json(orders)
	} catch (err) {
		console.error('Error fetching orders from Firestore:', err)
		res.status(500).send({ success: false, message: 'Failed to fetch orders' })
	}
})

module.exports = router
