<template>
  <div class="GamePage">
		<div
			class="GamePage-Wrapper"
			:class="{ 'GamePage-Wrapper--Hide' : isFullScreen}"
		>
			<GamePanel v-if="!isFullScreen" />
			<iframe
				class="GamePage-Iframe"
				:src="gameUrlForIframe"
				:width="getIframeWidth.width"
				:height="getIframeWidth.height"
			/>
			<ControlsPanel
				@toggleFullScreenMode="toggleFullScreenMode"
				:isFullScreen="isFullScreen"
			/>
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
		clockIcon: require('@/assets/img/clock.svg'),
		isFullScreen: false,
	}),
	methods: {
		...mapActions(['startGame']),
		toggleFullScreenMode() {
			this.isFullScreen = !this.isFullScreen;
		},
	},
	computed: {
		...mapState(['gameUrlForIframe']),
		getIframeWidth() {
			return this.isFullScreen ?
			{
				width: '100%',
				height: '100%',
			} :
			{
				width: '80%',
				height: '80%',
			};
		},
	},
};
</script>

<style lang="scss">
	.GamePage {
		display: flex;
		flex-direction: column;

		&-Wrapper {
			max-width: 1248px;
			width: 1248px;
			height: 100vh;
			margin: 0 auto;

			&--Hide {
				max-width: 100%;
				width: 100%;
			}
		}

		&-Iframe {
			border: none;
			border-radius: 15px;
			margin: 0 auto;
			display: block;
		}
	}
</style>
