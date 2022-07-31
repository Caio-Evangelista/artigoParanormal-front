import stemming from './RSLP'
import StopWords from 'src/resource/StopWords.json'

import { api } from 'boot/axios'

async function createArticle(configs) {
	const article = await getArticle(configs)

	/* INICIALIZATE METHODS */
	async function getArticle(configs) {
		let data
		try {
			data = await api.get('http://localhost:3000' /*'https://artigoparanormal.herokuapp.com/'*/)
		} catch (er) {
			console.log(er)

			return ''
		}

		return data.data
	}

	function getVisibleText(guessedWords, showArticle = false) {
		if (showArticle) return article.originalText

		const regexNoGetTagsHML = />([^<]*)</gim
		const regexGetWordsOnly = /([^\s0123456789,.\-+()'"“”!@#$%^&*\/\\|<>[\]{}ºª]*)/gim
		return article.originalText.replace(regexNoGetTagsHML, (_, phase) => {
			return '>' + phase.replace(regexGetWordsOnly, (_, word) => hideWord(word, guessedWords)) + '<'
		})
	}

	function hideWord(word, guessedWords) {
		if (!isWordVisible(word, guessedWords)) return '██████████████████████████████████████████████████'.slice(0, word.length)

		if (isLestGuess(word, guessedWords)) return `<span class="bg-white-positive text-dark text-weight-medium">${word}</span>`

		return word
	}

	function isWordVisible(word, guessedWords = []) {
		// return true
		word = word.trim().toLowerCase()
		if (StopWords.indexOf(word) >= 0) return true

		if (guessedWords.indexOf(stemming(word)) >= 0) return true

		return false
	}

	function isLestGuess(word, guessedWords = []) {
		word = word.trim().toLowerCase()
		if (StopWords.indexOf(word) >= 0) return false

		if (guessedWords[0] == stemming(word)) return true

		return false
	}

	return {
		article,
		getVisibleText,
		isWordVisible
	}
}

export default createArticle
