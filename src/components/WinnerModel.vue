<template>
	<q-dialog v-model="modal" @before-hide="stopCount">
		<q-card class="q-px-md" style="min-width: 50vw">
			<q-card-section class="row items-top justify-between q-pb-none">
				<q-space />
				<div class="text-center text-white-positive" v-if="this.game.gameStatus.winner">
					<div class="text-h6">Parabéns,</div>
					<div class="text-h4">Você Venceu!</div>
				</div>
				<div class="text-center text-white-negative" v-else-if="this.game.gameStatus.giveUp">
					<div class="text-h6">Que pena,</div>
					<div class="text-h4">Você Desistiu!</div>
				</div>
				<div class="text-center text-white-negative" v-else>
					<div class="text-h6">Que pena,</div>
					<div class="text-h4">Você Errou!</div>
				</div>
				<q-space />
				<div>
					<q-btn icon="close" flat round dense v-close-popup />
				</div>
			</q-card-section>

			<q-card-section class="row justify-center q-gutter-y-md q-px-xl q-pt-lg">
				<q-card class="no-shadow">
					<q-card-section class="text-center">
						<div class="text-body1">Sua pontuação foi de</div>
						<div class="text-h2 text-bold">
							{{ game.points.data.points }}<span class="text-body1">pts</span>
							<q-tooltip anchor="center right" self="center left">
								<div v-for="text of game.points.data.description" :key="text" class="text-caption">
									{{ text }}
								</div>
							</q-tooltip>
						</div>
					</q-card-section>
				</q-card>
			</q-card-section>

			<q-card-section class="row justify-between q-pt-lg">
				<q-card class="no-shadow col-3">
					<q-card-section class="text-center">
						<div class="text-h4 text-bold">{{ this.getOldGames.qtdGames }}</div>
						<div class="">partidas</div>
					</q-card-section>
				</q-card>
				<q-card class="no-shadow col-3">
					<q-card-section class="text-center">
						<div class="text-h4 text-bold">{{ (((this.getOldGames.qtdGames - this.getOldGames.qtdGiveUp - this.getOldGames.qtdErrors) * 100) / this.getOldGames.qtdGames).toFixed(0) }}%</div>
						<div class="">de vitórias</div>
					</q-card-section>
				</q-card>
				<q-card class="no-shadow col-3">
					<q-card-section class="text-center">
						<div class="text-h4 text-bold">{{ (this.getOldGames.sumPoints / (this.getOldGames.qtdGames - this.getOldGames.qtdGiveUp || 1)).toFixed(0) }}<span class="text-body2">pts</span></div>
						<div class="">média</div>
					</q-card-section>
				</q-card>
				<q-card class="no-shadow col-3">
					<q-card-section class="text-center">
						<div class="text-h4 text-bold">{{ this.getOldGames.maxPoints }}<span class="text-body2">pts</span></div>
						<div class="">máxima</div>
					</q-card-section>
				</q-card>
			</q-card-section>

			<q-separator />

			<q-card-section class="row justify-between items-center q-gutter-x-xl">
				<q-card class="no-shadow">
					<q-card-section class="text-center">
						<div class="text-body2">Novo Artigo Paranormal em</div>
						<div class="text-h5">{{ hours }}<span class="text-body1">h</span> {{ miniutes }}<span class="text-body1">min</span> {{ seconds }}<span class="text-body1">s</span></div>
					</q-card-section>
				</q-card>
				<div>
					<q-btn label="Compartilhar" icon="fas fa-share" size="lg" color="positive" class="full-width" no-caps />
				</div>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	props: ['game'],
	data() {
		return {
			modal: false,
			select: '',

			hours: '',
			miniutes: '',
			seconds: '',

			counter: undefined
		}
	},
	computed: {
		...mapGetters({
			getOldGames: 'getOldGames'
		})
	},
	methods: {
		abrirModal() {
			this.modal = true
			this.updateCounter()
		},
		updateCounter() {
			let now = new Date()

			this.hours = 23 - now.getHours()
			this.miniutes = 59 - now.getMinutes()
			this.seconds = 59 - now.getSeconds()

			this.counter = setTimeout(this.updateCounter, 1000)
		},
		stopCount() {
			clearTimeout(this.counter)
		}
	}
}
</script>

<style></style>
