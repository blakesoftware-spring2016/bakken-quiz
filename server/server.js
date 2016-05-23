'use strict'

// Setup the Express server
const fs = require('fs')
const path = require('path')
const express = require('express')
const body_parser = require('body-parser')
const node_mailer = require('nodemailer')
const mustache = require('mustache')

const app = express()

app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}))

// Serve all static assets... i.e., the entire app
app.use(express.static('./../'))

// Add endpoint to send the share results email
app.post('/shareResults', (req, res) => {
	// Verify all the necessary data was sent
	if (!req.body.email || !req.body.title || !req.body.description) {
		res.status(400).send()
		console.log('Necessary parameters were not sent.')
		return
	}
	// Read the server configuration
	fs.readFile(__dirname + '/config.json', (error, data) => {
		// Send a bad request response if there was an error
		if (error) {
			res.status(400).send()
			console.log(error)
			return
		}
		let configs = JSON.parse(data)
		fs.readFile(__dirname + '/template.html', (error, data) => {
			// Send a bad request response if there was an error
			if (error) {
				res.status(400).send()
				console.log(error)
				return
			}
			// Setup the email options and template
			let template = data.toString()
			let options = {
				from: '"The Bakken Museum" <maryshelley.bakken@gmail.com>',
				to: req.body.email,
				subject: req.body.title,
				html: mustache.render(template, {
					description: req.body.description
				})
			}
			var sendEmail = (config_index) => {
				// Create reusable transporter object using the default SMTP transport
				let transporter = node_mailer.createTransport(configs[config_index])
				// Send mail with defined transport object
				transporter.sendMail(options, (error, info) => {
					if (error) {
						// If the current config failed and is the last config to try...
						if (config_index === configs.length - 1) {
							// Respond to request with an error
							res.status(400).send()
							console.log(error)
							return
						}
						// If there are additional configs to try, log error and try again
						else {
							console.log(error)
							sendEmail(++config_index)
							return
						}
					}
					// Respond that it was sent successfully
					res.send()
					console.log('Message sent: ' + info.response)
				})
			}
			// Now actually try to send the email with the first config
			sendEmail(0)
		})
	})
})

app.get('/preloadImages', (req, res) => {
    let imageUrls = imagesInDirectory('../assets/images');
    imageUrls = imageUrls.map(function(url) {
    	return url.slice(3); // Remove the ../
    })
    res.send(imageUrls)
})

function imagesInDirectory(dir) {
    let results = []
    fs.readdirSync(dir).forEach(function(file) {
        file = dir + '/' + file
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) {
            results = results.concat(imagesInDirectory(file))
        }
        else if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
			results.push(file)
        }
    })
    return results
}

// Handle 404 errors
app.use((req, res, next) => {
	res.status(404).sendFile(path.resolve(__dirname + '/../index.html'))
})

// Handle 500 errors
app.use((error, req, res, next) => {
	res.status(500).send('Something broke! (500: Internal Server Error)')
})

// Start the Express server
app.listen(8080, () => {
	console.log('Starting Express server...')
})
