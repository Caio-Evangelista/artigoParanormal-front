export function addGame(state, data) {
	state.oldGames.qtdGames++

	if (data.giveUp) state.oldGames.qtdGiveUp++
	if (data.error) state.oldGames.qtdErrors++

	if (data.points > state.oldGames.maxPoints) state.oldGames.maxPoints = data.points

	state.oldGames.sumPoints += data.points
}
export function saveDailyGame(state, data) {
	state.dailyGame = data
}
