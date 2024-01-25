const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

let users = []

let jsonParser  = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'test'
});

connection.connect();

connection.query('SELECT * from users', (err, results, fields) => {
	if (err) return console.error(err)

	results.forEach(result => {
		users.push(result)
	})
})

app.post('/login', urlencodedParser, (req, res) => {
	let user = req.body
	for (u of users) {
		if (user.name === u.name && user.password === u.password)
			return res.send('Successfully logged in')
	}
	res.send('Failed to log in')
})

app.post('/', jsonParser, (req, res) => {
	res.send(req.body)
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

