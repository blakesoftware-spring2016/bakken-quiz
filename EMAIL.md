# Bakken Email Configuration

## Structure

The email configuration file is `config.json` within the `server` directory of the quiz. The file is structured with JSON, or JavaScript Object Notation. JSON is comprised of lists (within `[]`) and objects (within `{}`) that can contain key and values. For example, `{ "key": "I'm a value!" }` is an example of a simple JSON object. While keys must be strings within quotes (i.e. `"this is some text"`), each value can be a string, a number (without quotes), `true`/`false` (without quotes), or a nested object with its own set of key/value properties. Within an object, key/value pairs are separated by a comma like so: `{ "foo": 2, "bar": "hello" }`. Whitespace (spaces, tabs and line breaks) do not affect a JSON file, and can be used to make the file more readable. Additional information about the JSON syntax can be found online with a simple Google search.

To make sure the JSON is valid after changes, copy and paste the file into a JSON linter online (many can also be found with a simple Google search), which will check whether the syntax is correct.

The `config.json` file is structured as a list, and within in the list are objects the contain each separate email configuration. The quiz works by first trying the first object/config in the list, and if it fails, it'll move on to the second, and so on, until one of the configurations works. This allows the Bakken to setup its own email server as the first/prioritized configuration, but if it fails, fallback to Gmail. It'll also aid in the switch to Office 365, as the Office 365 configuration could be the first in the file, then the old email server, and then Gmail. That way, before the switch is complete, the quiz will still function correctly by falling back to the old server or Gmail, but after the switch to Office 365 is complete, the quiz will start using the Office 365 server to send email.

## Gmail Account

Initially, the server is only configured with a Gmail account, `maryshelley.bakken@gmail.com`. The password for the account is `hello123world`. It is **highly** recommended that the password is changed, as the old password is non-unique and possibly accessible from the coding history as all the code for the quiz is public, although the password is removed from the current version.

Furthermore, depending upon the Bakken's privacy policy, emails sent from the Gmail account may need to be manually deleted from the `Sent` folder in order to preserve user privacy.

## Configuration

Each configuration object in the list within `config.json` contains properties (key/value pairs) according to the specifications for `nodemailer`. The documentation can be accessed [here](https://npmjs.com/package/nodemailer).

For reference, below is an example `config.json` file that has a configuration for Office 365 (the first config object), and then Gmail (the second config object). If Office 365 fails, the quiz will fallback to Gmail. If both fail (for instance, if both of the servers were down or the internet was out), the quiz would still function correctly for subsequent emails given the connection was restored, however, the quiz will still prompt the user the email was sent successfully, even if it wasn't. In the example, the email for the Office 365 server is `email@thebakken.org`, and password is set to `password`. While the Office 365 configuration manually sets the port, host domain and other properties, `nodemailer` makes configuration for Gmail much easier, so those don't have to be entered manually (only the `service` property has to be set to `gmail`).

```
[
	{
		"host": "smtp.office365.com",
		"port": 587,
		"auth": {
			"user": "email@thebakken.org",
			"pass": "password"
		},
		"secure": false,
		"tls": {
			"ciphers": "SSLv3"
		}
	},
	{
		"service": "gmail",
		"auth": {
			"user": "maryshelley.bakken@gmail.com",
			"pass": "hello123world"
		}
	}
]
```

## Template

The template for the email is the `template.html` within the `server` directory, and is written in HTML. Changes can be made at any time and will automatically be used in subsequent emails. There are numerous resources online for reference on the HTML syntax.
