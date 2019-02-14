const express = require('express')
const path = require('path')
const remarkable = require('express-remarkable')

class App {
	constructor () {
		this.express = express()

		this.engine()
		this.routes()
	}

	engine () {
		this.express.engine('md', remarkable(this.express));
		this.express.set('view engine', 'md');
		this.express.set('views', path.resolve(__dirname, 'views'))
	}

	routes () {
		this.express.use(require('./routes'))
	}
}

module.exports = new App().express