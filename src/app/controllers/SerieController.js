const request = require('request')
const rp = require('request-promise')
const cheerio = require('cheerio')

class SerieController {
	show (req, res) {
		let options = {
		    uri: `https://www.minhaserie.com.br/busca/series?term=${req.params.term}`,
		    transform: function (body) {
		        return cheerio.load(body);
		    }
		};

		let resultCount = 0;
		let results = [];
		rp(options)
			.then(($) => {
				$('.list-generic li.vertical').each(function(i, el) {
					resultCount++;
					
					let title = titleSlice($(this).find('a.f16').text());

					let serie = {
						"title": `${title}`,
						"info": $(this).find('a.f16').text().trim().replace(title, ''),
						"img": $(this).find('.f16 img').attr('src'),
						"rate": $(this).find('div.rate-info').text().trim()
					}
					results.push(serie)
				})
				res.json(results)
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