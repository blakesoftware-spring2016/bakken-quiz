'use strict'

// Setup the Express server
const express = require('express')
const body_parser = require('body-parser')
const node_mailer = require('nodemailer')

const app = express()

app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}))

// Serve all static assets... i.e., the entire app
app.use(express.static('./'))

// Add endpoint to send the share results email
app.post('/shareResults', (req, res) => {
	// Verify all the necessary data was sent
	if (!req.body.email || !req.body.title || !req.body.description) {
		res.status(400).send()
		return
	}
	// Create reusable transporter object using the default SMTP transport
	let transporter = node_mailer.createTransport('smtps://maryshelley.bakken%40gmail.com:hello123world@smtp.gmail.com')
	// Setup e-mail data with unicode symbols
	let html = `${req.body.description}
		<br /><br />
		Thanks for visiting the Mary and Her Monster exhibit at The Bakken and taking the quiz!
		<br /><br />
		<a href="https://www.facebook.com/thebakkenmuseum">Like us on Facebook</a> | <a href="https://twitter.com/thebakken">Follow us on Twitter</a> | <a href="https://www.instagram.com/thebakkenmuseum">Follow us on Instagram</a>
		<br /><br />
		Register to receive more information about The Bakken and its programs <a href="https://thebakken.org/Newsletter-Sign-Up">here</a>.
		<br /><br />
		Email <a href="mailto:info@thebakken.org">info@thebakken.org</a> to learn more about The Bakken.
		<br /><br />
		<a href="#">The Bakken’s Privacy Policy</a>`
	let text = req.body.description +
		`Thanks for visiting the Mary and Her Monster exhibit at The Bakken and taking the quiz!\n\n` +
		`Like us on Facebook: https://www.facebook.com/thebakkenmuseum\n` +
		`Follow us on Twitter: https://twitter.com/thebakken\n` +
		`Follow us on Instagram: https://www.instagram.com/thebakkenmuseum\n\n` +
		`Register to receive more information about The Bakken and its programs: https://thebakken.org/Newsletter-Sign-Up\n\n` +
		`Email info@thebakken.org to learn more about The Bakken.\n\n` +
		`The Bakken’s Privacy Policy: link_goes_here`
	let options = {
		from: '"The Bakken Museum" <maryshelley.bakken@gmail.com>',
		to: req.body.email,
		subject: req.body.title,
		text, html
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
