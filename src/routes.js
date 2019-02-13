const express = require('express')

const routes = express.Router()
const controllers = require('./app/controllers')

routes.get('/serie/:term', controllers.SerieController.search)

module.exports = routes