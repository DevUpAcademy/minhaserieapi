const request = require('request')
const rp = require('request-promise')
const cheerio = require('cheerio')

class SerieController {
	search (req, res) {
		let options = {
		    uri: `https://www.minhaserie.com.br/busca/series?term=${req.params.term}`,
		    transform: function (body) {
		        return cheerio.load(body);
		    }
		};

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
				res.json(`"error": ${err}`)
			})
		//res.json(req.params)
	}
}

const titleSlice = (val) => {
	let text = val
	text = text.replace('\n\n\n\n', '')
	text = text.slice(0, text.indexOf('\n\n'))
	return text
}

module.exports = new SerieController()