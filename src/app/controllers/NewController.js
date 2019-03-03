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
					page: Number($('.pagination span.current').text().trim()) || 1,
					pages: Number($('.pagination .last a').attr('href').replace('/novidades?page=', ''))
				}

				$('.update-list li.horizontal').each(function (i, el) {
					resultCount++;

					let author = $(this).find('.info-list .info-post em').text().trim()
					let noticia = {
						"title": $(this).find('h2.info-title').text().trim(),
						"thumb": $(this).find('.image img').attr('src'),
						"name": String($(this).find('a.f18').attr('href')).replace('/novidades/', ''),
						"author": author,
						"published": $(this).find('.info-list .info-post').text()
							.replace(/(\r\n|\n|\r)/gm, ' ')
							.replace(/\s+/g, ' ')
							.replace('Por ' + author, '').trim(),
						"link": urlMS + $(this).find('a.f18').attr('href')
					}
					body.results.push(noticia)
				})

				body.count = resultCount
				res.json(body)
			})
			.catch(err => {
				return res.status(400).send({
					error: 'Erro na busca das noticias'
				})
			})
	}

	show(req, res) {
		let options = st.setURI(urlMS + `/novidades/${req.params.name}`)

		rp(options)
			.then(($) => {
				let body = {
					"title": $('.article-header-title').text().trim(),
					"published": $('.date-published').text().trim(),
					"content": $('.article-text').html()
				}

				res.json(body)
			})
			.catch(err => {
				return res.status(400).send({
					error: 'Erro na busca da noticia'
				})
			})
	}
}

module.exports = new NewController()