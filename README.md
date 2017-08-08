express-server-error
===================

Simple and predictable HTTP error handling for server API's.



Install
-------------

`npm install express-server-error`

Usage
-------------

**handleServerErrors:** The middleware.  Provides the `res.handleServerError(error)` method for handling the HTTP error response.

**ServerError(message: String, options: Object)**:  A constructor for the server error.

defaults:
  
`message`: 'Internal Server Error.'

`options`: { status = 500, name = 'ServerError', log = true }

Example
-------------
	// server.js
	const express = require('express')
	const {
	  handleServerErrors,
	  ServerError
	} = require('express-server-error')
	
	const app = express()
	let authorized = false
	app.get('/api', async (req, res) => {
	  try {
	    if (!authorized) {
		  throw new ServerError('Unauthorized.', { status: 401, log: false })
		} else {
		  res.json({ hello: 'world' })
		}
	  } catch (error) {
	    res.handleServerError(error)
	  }
	})

	// client.js
	import axios from 'axios'
	
	async function getData() {
	  try {
	    let { data } = await axios.get('/api')
	  } catch (error) {
	    // happily handle all errors the same way!
	    console.log(error.response.data)
	  }
	}
	getData()

Used in [vueniverse](https://github.com/rlindskog/vueniverse).
