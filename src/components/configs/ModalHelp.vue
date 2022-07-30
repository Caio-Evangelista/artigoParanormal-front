<template>
	<q-dialog v-model="modal">
		<q-card class="q-px-md" style="min-width: 60vw">
			<q-card-section class="row items-top justify-between q-pb-none">
				<q-space />
				<div class="text-center">
					<div class="text-h6">COMO JOGAR</div>
				</div>
				<q-space />
				<div>
					<q-btn icon="close" flat round dense v-close-popup />
				</div>
			</q-card-section>

			<q-card-section class="q-px-xl">
				<q-card class="no-shadow">
					<q-card-section class="q-gutter-y-md">
						<div v-if="step == 1">
							<div class="text-body1 q-pb-xl">O objetivo do jogo é <span class="text-bold text-white-positive">descobrir o título do Artigo</span> da Wiki de Ordem Paranormal com o mínimo de palavras e dicas possível.</div>

							<q-separator />
							<div class="q-my-lg">
								<div class="text-h5 text-bold q-mt-md q-mb-lg">{{ animationTitleText }}</div>
								<q-separator class="q-mt-xl" />
								<div class="bg-grey-9 full-width q-px-xl q-py-sm">
									<q-input class="q-px-md" v-model="animationTitleGuess" label="Digite uma Palavra" label-color="dark" bg-color="white" outlined dense :dark="false" :key="animationTitleGuess">
										<template v-slot:after>
											<q-btn dense flat icon="fas fa-arrow-right" color="white" />
										</template>
									</q-input>
								</div>
							</div>
						</div>

						<div class="q-gutter-y-sm" v-if="step == 2">
							<div class="text-body1">Para isso <span class="text-bold text-white-positive">escreva palavras</span> que você acho que pertencem ao texto, caso realmente existam, elas <span class="text-bold text-white-positive">serão reveladas</span> e você ganhará moedas.</div>
							<div class="text-body1 q-pb-xl">Com as moedas você pode <span class="text-bold text-white-positive">comprar dicas</span> relacionadas ao Artigo.</div>

							<q-separator />
							<div class="q-my-lg">
								<div class="text-h5 text-bold q-mt-md q-mb-lg">██████ █████████</div>
								<div class="q-mt-md q-mb-lg" v-html="animationRevealText" />
								<q-separator />
								<div class="bg-grey-9 full-width q-px-xl q-py-sm">
									<q-input class="q-px-md" v-model="animationRevealGuess" label="Digite uma Palavra" label-color="dark" bg-color="white" outlined dense :dark="false" :key="animationRevealGuess">
										<template v-slot:after>
											<q-btn dense flat icon="fas fa-arrow-right" color="white" />
										</template>
									</q-input>
								</div>
							</div>
						</div>

						<div class="q-gutter-y-sm" v-if="step == 3">
							<div class="text-body1"><span class="text-bold text-white-positive">Todo dia</span> é gerado um <span class="text-bold text-white-positive">novo artigo,</span> podendo estar relacionado com Personagens, Jogadores, Criaturas, Locais e Equipes.</div>
							<div class="text-body1">Sendo que o nível de dificuldade <span class="text-bold text-white-positive">varia ao decorrer da semana,</span> como mostra na tabela abaixo.</div>

							<div class="q-my-lg row justify-center">
								<table class="text-center bg-white text-dark text-body1 q-px-md q-py-sm">
									<tr>
										<th class="text-positive q-px-md">Dia da Semana</th>
										<th class="text-positive q-px-md">Dificuldade</th>
									</tr>
									<tr>
										<td>Domingo e Segunda</td>
										<td>Fácil</td>
									</tr>
									<tr>
										<td>Terça, Quarta e Quinta</td>
										<td>Médio</td>
									</tr>
									<tr>
										<td>Sexta e Sábado</td>
										<td>Difícil</td>
									</tr>
								</table>
							</div>
						</div>
					</q-card-section>
				</q-card>
			</q-card-section>

			<q-card-section class="row justify-between q-gutter-x-xl">
				<q-space v-if="step == 1" />
				<q-btn label="Voltar" icon="fas fa-arrow-left" color="positive" @click="step--" flat v-else />
				<q-btn label="Diga Mais" icon-right="fas fa-arrow-right" color="positive" @click="step++" v-if="step < 3" />
				<q-btn label="Entendi" icon-right="fas fa-check" color="positive" v-close-popup v-else />
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	props: ['game'],
	data() {
		return {
			modal: false,
			step: 1,

			animationTitleText: '',
			animationTitleGuess: '',

			animationRevealText: '',
			animationRevealGuess: ''
		}
	},
	methods: {
		abrirModal() {
			this.modal = true
			this.step = 1

			this.animationTitle()
			this.animationReveal()
		},
		animationTitle(config = { titleStep: 0, word: 0, letter: 0 }) {
			let words = ['Senhor', 'Veríssimo', '     ']

			if (config.word > 2) config.word = 0
			let word = words[config.word]

			let time = 150
			if (config.letter + 1 > word.length) {
				config.letter = 0
				config.word++
				config.titleStep++

				let time = 7000
			} else config.letter++

			this.animationTitleGuess = word.slice(0, config.letter + 1).trim()

			if (config.titleStep > 2) config.titleStep = 0

			if (config.titleStep == 0) this.animationTitleText = '██████ █████████'
			else if (config.titleStep == 1) this.animationTitleText = 'Senhor █████████'
			else if (config.titleStep == 2) this.animationTitleText = 'Senhor Veríssimo'

			setTimeout(() => this.animationTitle(config), time)
		},
		animationReveal(config = { textStep: 0, letter: 0 }) {
			let text = [
				'██████ █████████ é um ██████████ █████████ do ████████ de █████ ██████████. Seu ██████████ ████ ainda é ████████████, que era █████████ como ██████████ ████████ para todos os ███████ da ████ ████████. Ele é o █████ da █████ e ███████████ por ██████ os ███████████ em suas ███████ em todas as ██████████, além de ter ████████ ██████ ███████ da █████, █████████ sua █████.',

				'██████ █████████ é um ██████████ █████████ do ████████ de <span class="bg-white-positive text-dark text-weight-medium">Ordem</span> ██████████. Seu ██████████ ████ ainda é ████████████, que era █████████ como ██████████ ████████ para todos os ███████ da <span class="bg-white-positive text-dark text-weight-medium">Ordo</span> ████████. Ele é o █████ da <span class="bg-white-positive text-dark text-weight-medium">Ordem</span> e ███████████ por ██████ os ███████████ em suas ███████ em todas as ██████████, além de ter ████████ ██████ ███████ da <span class="bg-white-positive text-dark text-weight-medium">Ordem</span>, █████████ sua █████.'
			]

			let word = 'Ordem'

			let time = 150
			if (config.letter + 1 > word.length) {
				config.letter = 0
				config.textStep++

				let time = 15000
			} else config.letter++

			if (config.textStep > 1) config.textStep = 0

			this.animationRevealGuess = config.textStep == 0 ? word.slice(0, config.letter).trim() : ''
			this.animationRevealText = text[config.textStep]

			setTimeout(() => this.animationReveal(config), time)
		}
	}
}
</script>

<style lang="sass" scoped>

table
	border: 2px solid black
	border-radius: 10px
</style>
