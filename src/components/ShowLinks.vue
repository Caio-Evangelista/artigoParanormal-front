<template>
	<q-dialog v-model="modal" full-width>
		<q-card class="q-px-md">
			<q-card-section class="row items-top justify-between q-pb-none q-mb-lg">
				<q-space />
				<div class="text-center">
					<div class="text-h6">Link Encontrados</div>
				</div>
				<q-space />
				<div>
					<q-btn icon="close" flat round dense v-close-popup />
				</div>
			</q-card-section>

			<q-card-section class="scroll q-gutter-md q-px-xl q-py-none" style="max-height: 70vh">
				<q-card class="bg-white q-pa-none" v-for="(option, index) in links" :key="option">
					<q-card-section class="text-h6 text-dark q-pa-sm text-center"> {{ index + 1 }}/{{ links.length }} - {{ option.split('_').join(' ').split('#').join(' -> ') }} </q-card-section>
					<q-card-section>
						<iframe class="full-width" :src="'https://ordemparanormal.fandom.com/wiki/' + option" height="500px" />
					</q-card-section>
				</q-card>
			</q-card-section>

			<q-card-section class="row justify-between q-gutter-x-xl">
				<q-btn label="Voltar" icon="fas fa-arrow-left" color="positive" v-close-popup />
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	data() {
		return {
			modal: false,
			links: [],
			select: ''
		}
	},
	methods: {
		abrirModal(links) {
			this.modal = true
			this.links = links
		}
	}
}
</script>

<style></style>
