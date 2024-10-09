const express = require('express')
const { db } = require('../firebase-admin')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const { FieldValue } = require('firebase-admin').firestore

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

router.get('/tickets/:id/messages', async (req, res) => {
	try {
		const ticketId = req.params.id
		const messagesSnapshot = await db
			.collection('ticketMessages')
			.where('ticketId', '==', ticketId)
			.get()

		const messages = messagesSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))

		res.status(200).json(messages)
	} catch (err) {
		console.error('Error fetching ticket messages from Firestore:', err)
		res
			.status(500)
			.send({ success: false, message: 'Failed to fetch ticket messages' })
	}
})

router.post('/tickets/:id/messages', async (req, res) => {
	try {
		const ticketId = req.params.id
		const { message, senderId } = req.body

		const ticketMessagesRef = db.collection('ticketMessages')
		const messagesSnapshot = await ticketMessagesRef
			.where('ticketId', '==', ticketId)
			.limit(1)
			.get()

		const newMessage = {
			id: uuidv4()
				.replace(/-/g, '')
				.substr(0, 16)
				.replace(/(.{4})/g, '$1-')
				.slice(0, -1)
				.toUpperCase(),
			senderId,
			message,
			sentAt: {
				_seconds: Math.floor(Date.now() / 1000),
				_nanoseconds: (Date.now() % 1000) * 1000000,
			},
		}

		if (!messagesSnapshot.empty) {
			const docRef = messagesSnapshot.docs[0].ref
			await docRef.update({
				messages: FieldValue.arrayUnion(newMessage),
			})
		} else {
			await ticketMessagesRef.add({
				ticketId,
				messages: [newMessage],
			})
		}

		res.status(200).json({
			success: true,
			message: 'Message added successfully',
			newMessage,
		})
	} catch (error) {
		console.error('Error adding message:', error)
		res.status(500).json({ success: false, message: 'Failed to add message' })
	}
})

router.put('/tickets/agent/:id', async (req, res) => {
	try {
		const ticketId = req.params.id
		const { assignedEmployeeId } = req.body

		await db.collection('tickets').doc(ticketId).update({
			assignedEmployeeId: assignedEmployeeId,
		})

		res
			.status(200)
			.json({ success: true, message: 'Ticket agent updated successfully' })
	} catch (error) {
		console.error('Error updating ticket agent:', error)
		res
			.status(500)
			.send({ success: false, message: 'Failed to update ticket agent' })
	}
})

router.put('/tickets/status/:id', async (req, res) => {
	try {
		const ticketId = req.params.id
		const { status } = req.body

		await db.collection('tickets').doc(ticketId).update({
			status: status,
		})

		res
			.status(200)
			.json({ success: true, message: 'Ticket status updated successfully' })
	} catch (error) {
		console.error('Error updating ticket:', error)
		res.status(500).send({ success: false, message: 'Failed to update ticket' })
	}
})

router.get('/tickets/:id', async (req, res) => {
	try {
		const ticketId = req.params.id
		const ticketDoc = await db.collection('tickets').doc(ticketId).get()

		if (!ticketDoc.exists) {
			return res
				.status(404)
				.json({ success: false, message: 'Ticket not found' })
		}

		const ticketData = ticketDoc.data()
		const employeeDoc = await db
			.collection('employees')
			.doc(ticketData.assignedEmployeeId.toString())
			.get()

		const ticketWithEmployeeData = {
			...ticketData,
			assignedEmployee: employeeDoc.exists ? employeeDoc.data() : null,
		}

		res.status(200).json(ticketWithEmployeeData)
	} catch (error) {
		console.error('Error fetching ticket with employee data:', error)
		res
			.status(500)
			.json({ success: false, message: 'Failed to fetch ticket data' })
	}
})

module.exports = router
