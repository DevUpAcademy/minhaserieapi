const request = require('request')
const rp = require('request-promise')
const st = require('../tools/ScrapperTool')
const urlMS = 'https://www.minhaserie.com.br'

class TagController {
    top (req, res) {
        let options = st.setURI(urlMS)

        rp(options)
            .then(($) => {
                let body = {
                    results: [],
                    count: $('.top-tags-list a').length,
                }
                $('.top-tags-list a').each(function(i, el) {
                    let tag = {
                        "name": $(this).find('h2.top-tags-name').text().trim(),
                        "link": $(this).attr('href'),
                        "full-link": urlMS+$(this).attr('href')
                    }
                    body.results.push(tag)
                })
                res.json(body)
            })
            .catch(err => {
                return res.status(400).send({
					error: 'Erro ao buscar dados das tags'
				})
            })
    }
}

module.exports = new TagController()