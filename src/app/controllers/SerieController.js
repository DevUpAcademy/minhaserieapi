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
			.catch(function (err) {
				console.log(err)
				let response = {
					"error": `${err.statusCode}`
				}
				res.json(response);
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
						"link": `https://www.minhaserie.com.br${$(this).find('.back a').attr('href')}`,
						"stars": `${$(this).find('.front .rate .ratingbox').css('width').replace("%", "")}`,
						"stars-width": `${$(this).find('.front .rate .ratingbox').css('width')}`,
						"visits": `${$(this).find('.front .rate .rate-info').text().replace("visitas", "").trim()}`,
						"description": `${$(this).find('.back p').text().trim()}`,
					}
					body.results.push(serie);
				})
				body.count = resultCount;
				res.json(body)
			})
			.catch(function (err) {
				console.log(err)
				let response = {
					"error": `${err.statusCode}`
				}
				res.json(response);
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