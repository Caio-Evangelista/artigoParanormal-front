<template>
	<q-dialog v-model="modal" persistent>
		<q-card class="q-px-md" style="min-width: 50vw">
			<q-card-section class="text-center q-pb-none">
				<div class="text-h6 text-bold">Qual é o título deste Artigo?</div>
				<div class="text-grey-5">Selecione uma das opções abaixo e clique em confirmar.</div>
			</q-card-section>

			<q-card-section class="q-gutter-y-md q-px-xl q-pt-lg">
				<q-btn :label="option" :icon-right="'fas fa-' + (select == option ? 'check' : 'question')" :color="select == option ? 'positive' : 'white'" :text-color="select == option ? 'white' : 'dark'" class="full-width text-bold text-body1" :dark="false" no-caps v-for="option of options" :key="option" @click="select = select == option ? '' : option" />
			</q-card-section>

			<q-card-section class="row justify-between q-gutter-x-xl">
				<q-btn label="Desistir" icon="fas fa-font-awesome" color="negative" v-close-popup @click="$emit('giveUp')" />
				<q-btn label="Confirmar" icon-right="fas fa-arrow-right" color="positive" :disable="!select" v-close-popup @click="$emit('confirm', select)" />
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	data() {
		return {
			modal: false,
			options: [],
			select: ''
		}
	},
	methods: {
		abrirModal(options) {
			this.modal = true
			this.options = options
		}
	}
}
</script>

<style></style>
