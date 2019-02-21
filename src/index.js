const server = require('./server')
const opn = require('opn')

server.listen(process.env.PORT || 3000, () => {
	console.log(`Servidor Online`)

	if (!process.env.PORT) {
		console.log(`Executando em: http://localhost:3000`)
		opn(`http://localhost:3000`)
	}
})