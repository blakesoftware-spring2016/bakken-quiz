'use strict';

// Setup the Express server
const express = require('express')
const body_parser = require('body-parser')
const nodemailer = require('nodemailer')

const app = express()

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}))

// Serve all static assets... i.e., the entire app
app.use(express.static('./'))

// Add endpoint to send the share results email
app.post('/shareResults', (req, res) => {
	// Verify all the necessary data was sent and emails match
	if (!req.body.email || !req.body.email2 || !req.body.firstName || !req.body.lastName || !req.body.title || !req.body.description || req.body.email !== req.body.email2) {
		res.status(400).send()
		return
	}
	// Create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport('smtps://maryshelley.bakken%40gmail.com:hello123world@smtp.gmail.com');
	// Setup e-mail data with unicode symbols
	let options = {
		from: '"The Bakken Museum" <maryshelley.bakken@gmail.com>',
		to: '"' + req.body.firstName + ' ' + req.body.lastName + '" <' + req.body.email + '>',
		subject: req.body.title,
		text: req.body.description,
		html: req.body.description
	}
	// Send mail with defined transport object
	transporter.sendMail(options, (error, info) => {
		if (error) {
			// Respond with an error
			res.status(400).send()
			return console.log(error)
		}
		// Respond that it was sent successfully
		res.send()
		console.log('Message sent: ' + info.response)
	})
})

// Handle 404 errors
app.use((req, res, next) => {
	res.status(404).sendFile(__dirname + '/index.html')
})

// Start the Express server
app.listen(8080, () => {
	console.log('Starting Express server...')
})
