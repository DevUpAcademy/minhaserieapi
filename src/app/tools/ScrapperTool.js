const cheerio = require('cheerio')

class ScrapperTool {
	setURI (uri) {
		let config = {
    	uri: `${uri}`,
		    transform: function (body) {
		        return cheerio.load(body);
		    }
	    }

	    return config
	}
}

module.exports = new ScrapperTool()