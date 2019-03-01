const rp = require('request-promise')
const st = require('../tools/ScrapperTool')
const urlMS = 'https://www.minhaserie.com.br'

class NewController {
	index(req, res) {
		let options = st.setURI(`${urlMS}/novidades?page=${req.query.page ? req.query.page : 1}`)

		rp(options)
			.then(($) => {
				let resultCount = 0;
				let body = {
					results: [],
					count: '',
					page: Number($('.pagination span.current').text().trim()) || 1
				}

				$('.update-list li.horizontal').each(function (i, el) {
					resultCount++;

					let noticia = {
						"title": $(this).find('h2.info-title').text().trim(),
						"thumb": $(this).find('.image img').attr('src'),
						"author": $(this).find('.info-list .info-post em').text().trim()
					}
					body.results.push(noticia)
				})

				body.count = resultCount
				res.json(body)
			})
			.catch(err => {
				return res.status(400).send({
					error: 'Erro na busca da serie'
				})
			})
	}
}

module.exports = new NewController()