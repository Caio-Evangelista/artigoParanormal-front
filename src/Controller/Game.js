import stemming from './RSLP'
import createArticle from './Articles'
import StopWords from 'src/resource/StopWords.json'
import controllPoints from './Points'

async function createGame(configs = 'daily') {
	const article = await createArticle(configs)
	const points = controllPoints(article)
	const guessedWords = []
	const realGuessedWords = []
	const gameStatus = {
		winner: false,
		giveUp: false,
		showArticle: false,
		end: false
	}
	const usedTips = {
		tips: 0,
		links: 0,
		images: 0,
		Wordle: 0,
		alternatives: 0
	}

	function getVisibleText() {
		return article.getVisibleText(guessedWords, gameStatus.showArticle)
	}

	function guessWord(word) {
		word = word.trim().toLowerCase()

		if (!word) return {}

		if (word.split(' ').length > 1)
			return {
				type: 'error',
				message: 'Insira somente uma palavra por vez!'
			}

		if (StopWords.includes(word))
			return {
				type: 'warning',
				message: 'Essa palavra sempre está liberada!'
			}

		let stemmingGuess = stemming(word)
		if (guessedWords.includes(stemmingGuess))
			return {
				type: 'error',
				message: 'Nós já consideramos esta palavra!'
			}

		guessedWords.unshift(stemmingGuess)

		let quantity = article.article.words[stemmingGuess] || 0
		realGuessedWords.unshift({ word, quantity })

		points.controlOfPointsOfGuessWord(quantity, guessedWords)

		checkWinner()

		return {}
	}

	function checkWinner() {
		for (const word of article.article.title.split(' ')) {
			if (!article.isWordVisible(word, guessedWords)) {
				gameStatus.winner = false
				return
			}
		}

		gameStatus.giveUp = false
		gameStatus.winner = true
		gameStatus.showArticle = true

		points.managePoints(guessedWords, usedTips, true)
	}

	function giveUp() {
		gameStatus.winner = false
		gameStatus.giveUp = true
		gameStatus.showArticle = true

		points.giveUp()
	}

	function getAlternativesTip() {
		let options = article.article.options
		let index = 0
		for (let opt of article.article.title.split(' ')) {
			if (article.isWordVisible(opt, guessedWords)) {
				options = options.map((el) => {
					let texto = el.split(' ')
					texto[index] = opt

					return texto.join(' ')
				})
			}
			index++
		}
		let notCoins = points.controlOfPointsOfTip(250)
		if (notCoins) return notCoins

		usedTips.alternatives++
		return options
	}
	function chooseAlternativesTip(choice) {
		if (choice == article.article.title) {
			gameStatus.winner = true
			gameStatus.giveUp = false
			gameStatus.showArticle = true
			points.managePoints(guessedWords, usedTips, true)
		} else {
			gameStatus.winner = false
			gameStatus.giveUp = false
			gameStatus.showArticle = true
			points.managePoints(guessedWords, usedTips, false)
		}
	}
	function getLinksTip() {
		let options = shuffle(article.article.links)

		let notCoins = points.controlOfPointsOfTip(100)
		if (notCoins) return notCoins

		usedTips.links++
		return options.slice(0, 4)
	}

	function shuffle(array) {
		let currentIndex = array.length,
			randomIndex

		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex--
			;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
		}

		return array
	}

	function endGame() {
		gameStatus.end = true
	}

	function exportGame() {
		return {
			articleId: article.article.id,
			points: points.data,
			gameStatus,
			guessedWords,
			realGuessedWords
		}
	}

	function importGame(importGame) {
		if (importGame.articleId != article.article.id) return

		for (let key of Object.keys(importGame.points)) {
			points.data[key] = importGame.points[key]
		}

		for (let status of Object.keys(importGame.gameStatus)) {
			gameStatus[status] = importGame.gameStatus[status]
		}
		guessedWords.length = 0
		for (let guessed of importGame.guessedWords) {
			guessedWords.push(guessed)
		}
		realGuessedWords.length = 0
		for (let realGuessed of importGame.realGuessedWords) {
			realGuessedWords.push(realGuessed)
		}
	}

	return {
		article,
		gameStatus,
		points,
		realGuessedWords,
		getVisibleText,
		guessWord,
		giveUp,
		getAlternativesTip,
		chooseAlternativesTip,
		getLinksTip,
		endGame,
		exportGame,
		importGame
	}
}

export default createGame
