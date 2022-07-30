<template>
	<q-layout view="hHh lpR fFr">
		<q-header elevated class="bg-primary text-white">
			<q-toolbar>
				<q-toolbar-title>
					Artigo Paranormal <q-chip class="q-px-sm" dense>#1</q-chip>
					<q-chip class="q-px-sm" color="negative" dense> ✱ beta</q-chip>
				</q-toolbar-title>

				<div class="row items-center q-gutter-x-lg">
					<div class="text-body1" :key="update">
						<q-icon class="q-px-xs" name="fas fa-coins" color="white" />
						{{ game.points && game.points.data ? game.points.data.coins : '0' }}
					</div>
					<q-btn-dropdown label="Usar moedas" color="white" text-color="primary" push no-caps :disable="game.gameStatus && game.gameStatus.showArticle">
						<q-list class="text-body1">
							<q-item-section class="text-body2 text-center q-pt-md">
								<q-item-label>Em Breve</q-item-label>
							</q-item-section>

							<q-item clickable v-close-popup @click="onItemClick" :disable="true">
								<q-item-section avatar>
									<q-avatar icon="fas fa-lightbulb" color="primary" text-color="white" />
								</q-item-section>
								<q-item-section>
									<q-item-label>Dica</q-item-label>
								</q-item-section>
								<q-item-section side>
									<div>
										???
										<q-icon class="q-px-xs" name="fas fa-coins" color="white" size="sm" />
									</div>
								</q-item-section>
							</q-item>

							<q-item clickable v-close-popup @click="onItemClick" :disable="true">
								<q-item-section avatar>
									<q-avatar icon="fas fa-image" color="primary" text-color="white" />
								</q-item-section>
								<q-item-section class="q-pr-md">
									<q-item-label>Imagem Aleatória</q-item-label>
								</q-item-section>
								<q-item-section side>
									<div>
										???
										<q-icon class="q-px-xs" name="fas fa-coins" color="white" size="sm" />
									</div>
								</q-item-section>
							</q-item>

							<q-item clickable v-close-popup @click="onItemClick" :disable="true">
								<q-item-section avatar>
									<q-avatar icon="fas fa-w" color="primary" text-color="white" />
								</q-item-section>
								<q-item-section>
									<q-item-label>Descubra Título</q-item-label>
								</q-item-section>
								<q-item-section side>
									<div>
										???
										<q-icon class="q-px-xs" name="fas fa-coins" color="white" size="sm" />
									</div>
								</q-item-section>
							</q-item>

							<q-separator />
							<q-item clickable v-close-popup @click="confirmLinks">
								<q-item-section avatar>
									<q-avatar icon="fas fa-link" color="primary" text-color="white" />
								</q-item-section>
								<q-item-section>
									<q-item-label>Links Aleatórios</q-item-label>
								</q-item-section>
								<q-item-section side>
									<div>
										100
										<q-icon class="q-px-xs" name="fas fa-coins" color="white" size="sm" />
									</div>
								</q-item-section>
							</q-item>

							<q-item clickable v-close-popup @click="confirmAlternatives">
								<q-item-section avatar>
									<q-avatar icon="fas fa-list" color="primary" text-color="white" />
								</q-item-section>
								<q-item-section class="q-pr-md">
									<q-item-label>Alternativas</q-item-label>
								</q-item-section>
								<q-item-section side>
									<div>
										250
										<q-icon class="q-px-xs" name="fas fa-coins" color="white" size="sm" />
									</div>
								</q-item-section>
							</q-item>

							<q-item clickable v-close-popup @click="confirmGiveUp" class="text-white-negative">
								<q-item-section avatar>
									<q-avatar icon="fas fa-font-awesome" color="negative" text-color="white" />
								</q-item-section>
								<q-item-section class="q-pr-md">
									<q-item-label>Desistir</q-item-label>
								</q-item-section>
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</div>
			</q-toolbar>
		</q-header>

		<q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
			<q-list class="q-pt-md" :key="update">
				<q-item dense>
					<q-item-label class="text-center text-body1"> {{ game.realGuessedWords ? game.realGuessedWords.length : '' }} Palpites </q-item-label>
				</q-item>
				<q-separator />
				<q-item dense v-for="word in game.realGuessedWords" :key="word">
					<q-item-section :class="word.quantity > 0 ? 'text-white-positive' : 'text-white-negative'"> {{ word.word }} </q-item-section>
					<q-item-section class="text-center" :class="word.quantity > 0 ? 'text-white-positive' : 'text-white-negative'" side> {{ word.quantity }} </q-item-section>
				</q-item>
			</q-list>
		</q-drawer>

		<q-page-container>
			<q-page class="q-pa-xl" :key="update" @click="verifyWin">
				<div class="q-px-xl" v-html="game.getVisibleText ? game.getVisibleText() : ''"></div>
			</q-page>
		</q-page-container>

		<q-footer bordered class="bg-grey-9 text-white">
			<q-toolbar>
				<q-toolbar-title class="q-pa-sm">
					<div class="row justify-between">
						<q-btn-dropdown icon="fas fa-cog" color="white" no-caps flat>
							<q-list class="text-body1">
								<q-item clickable v-close-popup @click="openHelpModal">
									<q-item-section avatar>
										<q-avatar icon="fas fa-question" color="primary" text-color="white" />
									</q-item-section>
									<q-item-section>
										<q-item-label>Como jogar</q-item-label>
									</q-item-section>
								</q-item>

								<q-item clickable v-close-popup @click="confirmGiveUp" class="text-white-negative">
									<q-item-section avatar>
										<q-avatar icon="fas fa-font-awesome" color="negative" text-color="white" />
									</q-item-section>
									<q-item-section class="q-pr-md">
										<q-item-label>Desistir</q-item-label>
									</q-item-section>
								</q-item>
							</q-list>
						</q-btn-dropdown>
						<q-space />
						<div class="text-center" v-if="game.gameStatus && game.gameStatus.showArticle">
							<div class="text-h6" v-if="game.gameStatus && game.gameStatus.winner">Parabéns, você venceu!</div>
							<div class="text-h6" v-else-if="game.gameStatus && game.gameStatus.giveUp">Que Pena, você desistiu!</div>
							<div class="text-h6" v-else>Que Pena, você errou!</div>
							<div class="text-body2">
								Sua pontuação foi de <span class="text-body1"> {{ game.points.data.points }}</span
								>pts
								<q-tooltip anchor="center right" self="center left">
									<div v-for="text of game.points.data.description" :key="text">
										{{ text }}
									</div>
								</q-tooltip>
							</div>
						</div>
						<div class="col-6 text-center" v-else>
							<q-input v-model="palavra" label="Digite uma Palavra" label-color="dark" bg-color="white" outlined dense :dark="false" @keypress.enter="guess" @update:model-value="clearError">
								<template v-slot:after>
									<q-btn dense flat icon="fas fa-arrow-right" color="white" @click="guess" />
								</template>
							</q-input>
							<div class="text-body2 q-ma-xs" :class="errorMessage.type == 'error' ? 'text-white-negative' : 'text-warning'" v-if="errorMessage.message">
								<q-icon name="fas fa-exclamation-triangle" v-if="errorMessage.type == 'error'" />
								<q-icon name="fas fa-info-circle" v-else />
								{{ errorMessage.message }}
							</div>
						</div>
						<q-space />
					</div>
				</q-toolbar-title>
			</q-toolbar>
		</q-footer>

		<choice-options ref="choiceOptions" :game="game" @confirm="chooseAlternativesTip" @giveUp="giveUp" />
		<winner-model ref="winnerModel" :game="game" />

		<give-up-warning ref="giveUpWarning" @confirm="giveUp" />
		<alternatives-warning ref="alternativesWarning" @confirm="getAlternativesTip" />
		<links-warning ref="linksWarning" @confirm="getLinksTip" />

		<show-links ref="showLinks" />

		<modal-help ref="modalHelp" />
	</q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

import createGame from 'src/Controller/Game'
import ChoiceOptions from 'src/components/ChoiceOptions.vue'
import WinnerModel from 'src/components/WinnerModel.vue'
import GiveUpWarning from 'src/components/warning/GiveUpWarning.vue'
import AlternativesWarning from 'src/components/warning/AlternativesWarning.vue'
import LinksWarning from 'src/components/warning/LinksWarning.vue'
import ShowLinks from 'src/components/ShowLinks.vue'
import ModalHelp from 'src/components/configs/ModalHelp.vue'
export default {
	components: { ChoiceOptions, WinnerModel, GiveUpWarning, AlternativesWarning, LinksWarning, ShowLinks, ModalHelp },
	name: 'MainLayout',
	data() {
		return {
			rightDrawerOpen: true,
			game: {},
			palavra: '',
			errorMessage: {},
			timeoutError: undefined,
			autoSave: undefined,
			update: 0
		}
	},
	computed: {
		...mapGetters({
			getDailyArticle: 'getDailyArticle',
			getOldGames: 'getOldGames'
		})
	},
	methods: {
		guess() {
			this.errorMessage = this.game.guessWord(this.palavra)
			this.update++
			this.$forceUpdate()

			this.palavra = ''

			clearTimeout(this.timeoutError)
			this.timeoutError = setTimeout(this.clearError, 5000)

			this.verifyWin()
		},
		clearError() {
			this.errorMessage = {}
			clearTimeout(this.timeoutError)
		},
		verifyWin() {
			if (this.game.gameStatus.showArticle) {
				this.endGame()
				return true
			}
			return false
		},
		confirmGiveUp() {
			this.$refs.giveUpWarning.abrirModal()
		},
		giveUp() {
			this.game.giveUp()
			this.update++

			this.$q.notify({ message: 'A resposta certa era ' + this.game.article.article.title, type: 'positive', position: 'top' })
			this.endGame()
		},
		confirmAlternatives() {
			this.$refs.alternativesWarning.abrirModal()
		},
		getAlternativesTip() {
			const options = this.game.getAlternativesTip()
			if (typeof options == 'string') {
				this.$q.notify({ message: options, type: 'negative', position: 'top' })
				return
			}

			this.$refs.choiceOptions.abrirModal(options)
			this.update++
		},
		chooseAlternativesTip(fullName) {
			this.game.chooseAlternativesTip(fullName)
			this.update++
			this.endGame()
		},
		confirmLinks() {
			this.$refs.linksWarning.abrirModal()
		},
		getLinksTip() {
			this.$refs.showLinks.abrirModal(this.game.getLinksTip())
		},
		saveGame() {
			this.$store.commit('saveDailyGame', this.game.exportGame())

			this.autoSave = setTimeout(this.saveGame, 30000)
		},
		endGame() {
			this.$refs.winnerModel.abrirModal()

			if (this.game.gameStatus.end == false) {
				this.saveGame()
				clearTimeout(this.autoSave)

				this.game.endGame()
				this.$store.commit('addGame', {
					giveUp: this.game.gameStatus.giveUp,
					error: !this.game.gameStatus.giveUp && !this.game.gameStatus.winner,
					points: this.game.points.data.points
				})
			}
		},
		openHelpModal() {
			this.$refs.modalHelp.abrirModal()
		}
	},
	async created() {
		this.$q.dark.set(true)

		try {
			this.game = await createGame()
			this.game.importGame(this.getDailyArticle)
			this.verifyWin()
		} catch (error) {
			console.log(error)
		}

		if (this.getOldGames.qtdGames == 0) this.openHelpModal()

		this.saveGame()
	}
}
</script>
