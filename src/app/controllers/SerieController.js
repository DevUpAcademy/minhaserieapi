const request = require('request')
const rp = require('request-promise')
const st = require('../tools/ScrapperTool')

class SerieController {
	search (req, res) {
		let options = st.setURI(`https://www.minhaserie.com.br/busca/series?term=${req.params.term}`)

		let resultCount = 0;
		let body = {
			results: [],
			count: '',
		}
		
		rp(options)
			.then(($) => {
				$('.list-generic li.vertical').each(function(i, el) {
					resultCount++;
					
					let title = titleSlice($(this).find('a.f16').text());

					let serie = {
						"title": `${title}`,
						"category": $(this).find('a.f16').text().trim().replace(title, "").replace(/(\r\n|\n|\r)/gm, ""),
						"thumb": $(this).find('.f16 img').attr('src'),
						"name": `${$(this).find('.searchCard a.f16').attr('href').replace('/serie/', '')}`,
						"link": `https://www.minhaserie.com.br${$(this).find('.searchCard a.f16').attr('href')}`,
						"stars": $(this).find('.ratingbox').css('width').replace("%", "") / 20,
						"stars-width": $(this).find('.ratingbox').css('width'),
						"visits": $(this).find('div.rate-info').text().replace("visitas", "").trim()
					}
					body.results.push(serie)
				})
				body.count = resultCount;
				res.json(body)
			})
			.catch(err => {
				return res.status(400).send({ error: 'Erro na busca da serie'})
			})
	}
	top (req, res) {
		let options = st.setURI(`https://www.minhaserie.com.br/series`)

		rp(options)
			.then(($) => {
				let resultCount=0;
				let body = {
					results: [],
					count: '',
				}
				$('.tv-list .vertical').each(function(i, el) {

					resultCount++;

					let serie = {
						"title": `${$(this).find('.front h2.info-title').text().trim()}`,
						"category": `${$(this).find('.front span.cat').text().trim()}`,
						"rank": $(this).find('.front .info-rate span').text().trim(),
						"thumb": `${$(this).find('.front span.image.w190 img').attr('src')}`,
						"name": `${$(this).find('.back a').attr('href').replace('/serie/', '')}`,
						"link": `https://www.minhaserie.com.br${$(this).find('.back a').attr('href')}`,
						"stars": $(this).find('.front .rate .ratingbox').css('width').replace("%", "") / 20,
						"stars-width": `${$(this).find('.front .rate .ratingbox').css('width')}`,
						"visits": `${$(this).find('.front .rate .rate-info').text().replace("visitas", "").trim()}`,
						"description": `${$(this).find('.back p').text().trim()}`,
					}
					body.results.push(serie);
				})
				body.count = resultCount;
				res.json(body)
			})
			.catch(err => {
				return res.status(400).send({ error: 'Erro na busca de top series'})
			})
	}
	show (req, res) {
		let options = st.setURI(`https://www.minhaserie.com.br/serie/${req.params.name}`)

		rp(options)
			.then(($) => {
				let info = $('.subheader .tv-info ul li span.value')
				let statistics = $('.show-stats ul li span.stat-value')
				const url = `https://www.minhaserie.com.br${req.originalUrl}`

				let body = {
					"title": $('.subtitle h1').text().trim(),
					"title-pt": $('.subtitle h2').text().trim(),
					"thumb": $('.subheader .tv-bar img').attr('src'),
					"link": url,
					"category": $(info[0]).text().trim(),
					"status": $(info[1]).text().trim(),
					"debut": $(info[2]).text().trim(),
					"rank": $(statistics[0]).text().trim(),
					"visits": $(statistics[1]).text().trim(),
					"description": $('.description p').text().trim(),
				}

				res.json(body)
			})
			.catch(function (err) {
				return res.status(400).send({ error: 'Erro na busca de informações da serie.'})
			})
	}
}

const titleSlice = (val) => {
	let text = val
	text = text.replace('\n\n\n\n', '')
	text = text.slice(0, text.indexOf('\n\n'))
	return text
}

module.exports = new SerieController()