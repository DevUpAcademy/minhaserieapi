const express = require('express')

const routes = express.Router()
const controllers = require('./app/controllers')

routes.get('/', (req, res) => {
	res.render('index');
})
routes.get('/search/:term', controllers.SerieController.search)
routes.get('/serie/:name', controllers.SerieController.show)
routes.get('/series', controllers.SerieController.top)
routes.get('/news', controllers.NewController.index)

module.exports = routes