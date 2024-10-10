const express = require('express')
const { db } = require('../firebase-admin')
const router = express.Router()

router.get('/products', async (req, res) => {
	try {
		const productsSnapshot = await db.collection('products').get()
		const products = productsSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		res.status(200).json(products)
	} catch (err) {
		console.error('Error fetching products from Firestore:', err)
		res
			.status(500)
			.send({ success: false, message: 'Failed to fetch products' })
	}
})

// Update product
router.put('/update-product/:id', async (req, res) => {
	try {
		const productId = req.params.id
		const { name, price, stock } = req.body

		const productRef = db.collection('products').doc(productId)

		await productRef.update({
			name,
			price,
			stock,
		})

		res
			.status(200)
			.json({ success: true, message: 'Product updated successfully' })
	} catch (error) {
		console.error('Error updating product:', error)
		res
			.status(500)
			.json({ success: false, message: 'Failed to update product' })
	}
})

// Add new product
router.post('/add-product', async (req, res) => {
	try {
		const { name, price, stock, category, ImageURL } = req.body

		const newProductRef = await db.collection('products').add({
			name,
			price,
			stock,
			category,
			ImageURL,
		})

		res.status(201).json({
			success: true,
			message: 'Product added successfully',
			productId: newProductRef.id,
		})
	} catch (error) {
		console.error('Error adding product:', error)
		res.status(500).json({ success: false, message: 'Failed to add product' })
	}
})

// Delete product
router.delete('/delete-product/:id', async (req, res) => {
	try {
		const productId = req.params.id
		await db.collection('products').doc(productId).delete()
		res
			.status(200)
			.json({ success: true, message: 'Product deleted successfully' })
	} catch (error) {
		console.error('Error deleting product:', error)
		res
			.status(500)
			.json({ success: false, message: 'Failed to delete product' })
	}
})

module.exports = router
