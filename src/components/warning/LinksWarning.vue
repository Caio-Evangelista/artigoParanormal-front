<template>
	<q-dialog v-model="modal">
		<q-card class="q-px-md" style="min-width: 50vw">
			<q-card-section class="row items-top justify-between q-pb-none">
				<q-space />
				<div class="text-center">
					<div class="text-h6">LINKS ALEATÓRIOS</div>
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
							<q-img src="/images/undraw_share_link.svg" style="width: 60%" fit />
						</q-avatar>
					</q-card-section>
					<q-card-section class="text-center">
						<div class="text-body1">Ao escolher os "Links Aleatórios" serão abertas <span class="text-bold text-white-positive">4 páginas da wiki</span> que estão vinculados a este artigo.</div>
						<div class="q-mt-md text-white-negative">A seleção dos links mostrados é feita de forma aleatória, então pode repitir links ao comprar essa dica mais de uma vezes.</div>
					</q-card-section>
				</q-card>
			</q-card-section>

			<q-card-section class="row justify-between q-gutter-x-xl">
				<q-btn label="Voltar" icon="fas fa-arrow-left" color="negative" v-close-popup />
				<q-btn label="Ver Links" icon-right="fas fa-link" color="positive" v-close-popup @click="$emit('confirm')" />
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
