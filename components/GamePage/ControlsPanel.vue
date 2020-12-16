<template>
  <div class="ControlsPanel">
		<div
			v-if="!isFullScreen"
			class="ControlsPanel-Block"
		>
			<p class="ControlsPanel-Title">Responsible gaming</p>
			<img
				:src="clockIcon"
				class="ControlsPanel-Image"
			 />
			<p class="ControlsPanel-Time">{{ getCurrentTime }}</p>
		</div>

		<div class="ControlsPanel-Group">
			<div
				class="ControlsPanel-Action"
				:class="{ 'ControlsPanel-Action--FullScreenMode' : isFullScreen}"
				@click="$emit('toggleFullScreenMode')"
			>
				<img
					:src="zoomIcon"
				/>
			</div>

			<NuxtLink
				v-if="!isFullScreen"
				to="/"
				class="ControlsPanel-Action"
				@click.native="setGameUrl('')"
			>
				<img
					:src="closeIcon"
				/>
			</NuxtLink>
		</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	props: {
		isFullScreen: Boolean,
	},
	mounted() {
    this.$options.timer = window.setInterval(this.updateDateTime, 1000);
  },
	beforeDestroy() {
    window.clearTimeout(this.$options.timer);
  },
	data: () => ({
		clockIcon: require('@/assets/img/clock.svg'),
		closeIcon: require('@/assets/img/ic_close.svg'),
		zoomIcon: require('@/assets/img/zoom.svg'),
		hours: 0,
		minutes: 0,
		seconds: 0,
	}),
	methods: {
		...mapMutations(['setGameUrl']),
		updateDateTime() {
			const today = new Date();

			this.hours = today.getHours();
			this.minutes = today.getMinutes();
			this.seconds = today.getSeconds();
		},
	},
	computed: {
		getCurrentTime() {
			const hours = String(this.hours).length < 2 ? `0${this.hours}` : this.hours;
			const minutes = String(this.minutes).length < 2 ? `0${this.minutes}` : this.minutes;
			const seconds = String(this.seconds).length < 2 ? `0${this.seconds}` : this.seconds;

			return `${hours} : ${minutes} : ${seconds}`;
		},
	},
};
</script>

<style lang="scss">
	.ControlsPanel {
		display: flex;
		justify-content: space-between;

		&-Block {
			display: flex;
			align-items: center;
		}

		&-Title {
			margin: 0 14px 0 0;
			color: #fff;
		}

		&-Time {
			margin: 0 0 0 9px;
			color: #fff;
		}

		&-Group {
			display: flex;
		}

		&-Action {
			width: 60px;
			height: 60px;
			background: #1B2138;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;

			&--FullScreenMode {
				position: absolute;
				right: 0;
				bottom: 0;
			}

			&:not(:last-child) {
				margin-right: 5px;
			}
		}

		&-Close {
		}
	}
</style>
