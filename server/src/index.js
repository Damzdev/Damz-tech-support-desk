const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const dbRoutes = require('./routes/firestoreRoutes')
const ticketRoutes = require('./routes/tickets')
const orderRoutes = require('./routes/orders')
const productRoutes = require('./routes/products')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
app.use(cookieParser())

app.use(
	cors({
		origin: true,
		methods: ['POST', 'GET', 'PUT', 'DELETE'],
		credentials: true,
	})
)

app.use(express.json())

app.use('/api', dbRoutes, ticketRoutes, orderRoutes, productRoutes)

app.get('/', (req, res) => {
	res.send('Support Help Desk API is running')
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
