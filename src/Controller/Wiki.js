import Articles from 'src/resource/Articles.json'

/**    CRONOGRAM DE DESAFIOS
 * Fácil: segunda, terça
 * Médio: quarta, quinta, sexta
 * Díficil: sábado, domingo
 **/
export async function getArticleText(name) {
	let data = await this.$axios.get(`https://ordemparanormal.fandom.com/api.php?action=visualeditor&format=json&paction=wikitext&page=${name}&uselang=pt-br&formatversion=2`)

	return data.visualeditor.content
}

export async function getDailyArticle() {
	let today = new Date()

	let weekDay = today.getDay()

	return Articles[0]
}
