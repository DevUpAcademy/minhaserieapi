const express = require('express')

const routes = express.Router()
const controllers = require('./app/controllers')

routes.get('/', (req, res) => {
	res.render('index');
})
routes.get('/search/:term', controllers.SerieController.search)
routes.get('/series/:name', controllers.SerieController.show)
routes.get('/series', controllers.SerieController.top)
routes.get('/news', controllers.NewController.index)
routes.get('/news/:name', controllers.NewController.show)
routes.get('/tags', controllers.TagController.top)

module.exports = routes