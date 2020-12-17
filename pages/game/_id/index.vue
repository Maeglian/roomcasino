<template>
  <div class="GamePage">
		<div
			class="GamePage-Wrapper"
			:class="{ 'GamePage-Wrapper--Hide' : isFullScreen }"
		>
			<MainNav v-if="!isFullScreen" />
			<iframe
				class="GamePage-Iframe"
				:src="gameUrl"
				:width="getIframeWidth.width"
				:height="getIframeWidth.height"
			/>
			<ControlsPanel
				@toggleFullScreenMode="toggleFullScreenMode"
				@clearGameUrl="gameUrl = ''"
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
import showAuthDialog from '@/mixins/showAuthDialog';
import detect from '@/utils/deviceDetector';

export default {
	// ssr: false,
	mixins: [showAuthDialog],
	async created() {
		const { id } = this.$route.params;
		const { demo } = this.$route.query;
		const isMobile = detect.mobile() || detect.tablet() || detect.phone();
	
		if (parseInt(demo)) {
			this.gameUrl = await this.startGame({
				gameId: id,
				returnUrl: '/',
				demo: true,
				platform: isMobile ? 'mobile' : 'desktop',
			});
			
			return;
		}

		this.gameUrl = await this.startGame({
			gameId: id,
			returnUrl: '/',
			demo: false,
			platform: isMobile ? 'mobile' : 'desktop',
		});
	},
	data: () => ({
		url: '',
		clockIcon: require('@/assets/img/clock.svg'),
		isFullScreen: false,
		gameUrl: '',
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
			width: 100%;
			height: 100vh;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			&--Hide {
				max-width: 100%;
				width: 100%;
			}
		}

		&-Iframe {
			position: relative;
			border: none;
			border-radius: 12px;
			margin: 0 auto;
			display: block;
		}
	}
</style>
