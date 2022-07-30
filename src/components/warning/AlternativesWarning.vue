<template>
	<q-dialog v-model="modal">
		<q-card class="q-px-md">
			<q-card-section class="row items-top justify-between q-pb-none">
				<q-space />
				<div class="text-center">
					<div class="text-h6">ALTERNATIVAS</div>
				</div>
				<q-space />
				<div>
					<q-btn icon="close" flat round dense v-close-popup />
				</div>
			</q-card-section>

			<q-card-section class="row justify-center q-gutter-y-md q-px-xl">
				<q-card class="no-shadow">
					<q-card-section class="text-center">
						<q-avatar rounded color="white" size="90px" class="full-width q-pa-md">
							<q-img src="/images/undraw_selection.svg" style="width: 60%" fit />
						</q-avatar>
					</q-card-section>
					<q-card-section class="text-center">
						<div class="text-body1">Ao escolher as alternativas serão mostrados <span class="text-bold text-white-positive">5 possíveis nomes</span> para o artigo. Somente um deles estará correto!</div>
						<div class="q-mt-md text-white-negative">Após confirmar as alternativas você NÃO poderá continuar adinhando as palavras.</div>
					</q-card-section>
				</q-card>
			</q-card-section>

			<q-card-section class="row justify-between q-gutter-x-xl">
				<q-btn label="Voltar" icon="fas fa-arrow-left" color="negative" v-close-popup />
				<q-btn label="Ir para Alternativas" icon-right="fas fa-list" color="positive" v-close-popup @click="$emit('confirm')" />
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	props: ['game'],
	data() {
		return {
			modal: false
		}
	},
	methods: {
		abrirModal() {
			this.modal = true
		}
	}
}
</script>

<style></style>
