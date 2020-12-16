<template>
  <div class="GamePage">
		<div class="GamePage-Wrapper">
			<GamePanel />
			<iframe
				class="GamePage-Iframe"
				:src="gameUrlForIframe"
				width="80%"
				height="80%"
			/>
			<ControlsPanel />
			<client-only>
				<CashierForm />
			</client-only>
		</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	created() {
		const { id } = this.$route.params
		this.startGame({gameId: id, returnUrl: '/', demo: true});
	},
	data: () => ({
		url: '',
		clockIcon: require('@/assets/img/clock.svg')
	}),
	methods: {
		...mapActions(['startGame']),
	},
	computed: {
		...mapState(['gameUrlForIframe']),
	},
};
</script>

<style lang="scss">
	.GamePage {
		display: flex;
		flex-direction: column;

		&-Wrapper {
			min-width: 1248px;
			width: 1248px;
			height: 100vh;
			margin: 0 auto;
		}

		&-Iframe {
			border: none;
			border-radius: 15px;
			margin: 0 auto;
			display: block;
		}
	}
</style>
