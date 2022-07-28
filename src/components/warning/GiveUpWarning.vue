<template>
	<q-dialog v-model="modal">
		<q-card class="q-px-md">
			<q-card-section class="row items-top justify-between q-pb-none">
				<q-space />
				<div class="text-center">
					<div class="text-h6">Desistir</div>
				</div>
				<q-space />
				<div>
					<q-btn icon="close" flat round dense v-close-popup />
				</div>
			</q-card-section>

			<q-card-section class="row justify-center q-gutter-y-md q-px-xl q-pt-lg">
				<q-card class="no-shadow">
					<q-card-section class="text-center">
						<div class="text-body1">Você realmente deseja desistir deste Artigo?</div>
					</q-card-section>
				</q-card>
			</q-card-section>

			<q-card-section class="row justify-between q-gutter-x-xl">
				<q-btn label="Continuar Tentando" icon="fas fa-arrow-left" color="positive" v-close-popup />
				<q-btn label="Desistir" icon-right="fas fa-font-awesome" color="negative" v-close-popup @click="$emit('confirm')" />
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
