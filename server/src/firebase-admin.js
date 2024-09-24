const admin = require('firebase-admin')
require('dotenv').config()

if (!process.env.FIREBASE_PRIVATE_KEY) {
	throw new Error('FIREBASE_PRIVATE_KEY is not defined')
}

const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')

const serviceAccount = {
	type: process.env.FIREBASE_TYPE,
	project_id: process.env.FIREBASE_PROJECT_ID,
	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
	private_key: privateKey,
	client_email: process.env.FIREBASE_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
	auth_uri: process.env.FIREBASE_AUTH_URI,
	token_uri: process.env.FIREBASE_TOKEN_URI,
	auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
	client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
}

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://damztechstore.firebaseio.com', // Ensure this URL is correct
})

const db = admin.firestore()
const auth = admin.auth()

module.exports = { db, auth }
