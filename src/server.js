const express = require('express')
const path = require('path')
const cors = require('cors')
const remarkable = require('express-remarkable')

class App {
	constructor () {
		this.express = express()

		this.engine()
		this.start()
		this.routes()
	}

	start () {
		this.express.use(cors())
	}

	engine () {
		this.express.engine('md', remarkable(this.express));
		this.express.set('view engine', 'md');
		this.express.set('views', path.resolve(__dirname, 'views'))
	}

	routes () {
		this.express.use(require('./routes'))
		this.express.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});
	}
}

module.exports = new App().express