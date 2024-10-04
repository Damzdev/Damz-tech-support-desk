const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dbRoutes = require('./routes/firestoreRoutes')
const ticketRoutes = require('./routes/tickets')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
app.use(cookieParser())

app.use(
	cors({
		origin: ['http://localhost:5173' || 'http://localhost:5174'],
		methods: ['POST', 'GET', 'PUT', 'DELETE'],
		credentials: true,
	})
)
app.use(express.json())

app.use('/api', dbRoutes, ticketRoutes)

app.get('/', (req, res) => {
	res.send('Support Help Desk API is running')
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
