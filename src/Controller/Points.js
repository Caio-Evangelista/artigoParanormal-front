import stemming from './RSLP'

function controllPoints(article) {
	const data = {
		points: 0,
		coins: 0,
		description: []
	}

	const controller = {
		winGamePoints: 400,
		wordsPoints: 300,
		tipPoints: 200,
		coinsPoints: 100,

		qtdWords: 0,
		qtdTip: 0,

		textWinGame: '',
		textWordsPoints: '',
		textTipPoints: '',
		textCoinsPoints: ''
	}

	let coinsOfOneWord = 0
	for (let word of Object.keys(article.article.words)) {
		let cont = true
		for (const wordTitle of article.article.title.split(' ')) {
			if (stemming(wordTitle) == word) cont = false
		}

		coinsOfOneWord += cont ? article.article.words[word] : 0
	}
	coinsOfOneWord = 5000 / coinsOfOneWord

	function controlOfPointsOfGuessWord(quantity) {
		controller.qtdWords++

		data.coins += Math.floor((quantity - 1) * coinsOfOneWord)
		if (data.coins < 0) data.coins = 0

		managePoints()
	}
	function controlOfPointsOfTip(cust) {
		if (data.coins < cust) return 'Saldo Insuficiente'

		controller.qtdTip++
		data.coins -= cust

		managePoints()
	}
	function managePoints(winGame = false) {
		const configWordsPoints = [
			[200, 50],
			[150, 100],
			[100, 150],
			[75, 200],
			[50, 250],
			[15, 300]
		]
		controller.textWordsPoints = ''
		for (let config of configWordsPoints) {
			if (controller.qtdWords <= config[0]) {
				controller.wordsPoints = config[1]
				controller.textWordsPoints = `+ ${config[1]}pts por usar até ${config[0]} palavras.`
			}
		}

		const configTipPoints = [
			[3, 50],
			[2, 100],
			[1, 150],
			[0, 200]
		]
		controller.textTipPoints = ''
		for (let config of configTipPoints) {
			if (controller.qtdTip <= config[0]) {
				controller.tipPoints = config[1]
				controller.textTipPoints = `+ ${config[1]}pts por usar ${config[0]} dicas.`
			}
		}

		controller.coinsPoints = Math.floor(data.coins / 10)
		controller.coinsPoints = controller.coinsPoints > 100 ? 100 : controller.coinsPoints
		controller.textCoinsPoints = `+ ${controller.coinsPoints}pts, cada 10 moedas = 1 ponto (máximo de 100pts).`

		controller.textWinGame = ''
		controller.winGamePoints = 0
		if (winGame) {
			controller.winGamePoints = 400
			controller.textWinGame = `+ 400pts por acertar o título do Artigo.`
		}

		data.points = controller.winGamePoints + controller.wordsPoints + controller.tipPoints + controller.coinsPoints
		data.description = [controller.textWinGame, controller.textWordsPoints, controller.textTipPoints, controller.textCoinsPoints]
	}

	function giveUp() {
		data.points = 0
		data.description = ['Você desistiu!']
	}

	return {
		data,
		controlOfPointsOfGuessWord,
		controlOfPointsOfTip,
		managePoints,
		giveUp
	}
}

export default controllPoints
