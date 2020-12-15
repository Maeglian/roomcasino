<template>
	<modal
		class="Iframe"
		name="iframe"
		adaptive
		:clickToClose="false"
	>
		<div class="Close Modal-Close" @click="closeIframe"></div>
		<iframe
			:src="url"
			width="80%"
			height="90%"
		/>
	</modal>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		url: String,
	},
	methods: {
		...mapMutations(['setGameUrl']),
		...mapActions(['getProfile']),
		closeIframe() {
			this.getProfile();
			this.$modal.hide('iframe');
			this.setGameUrl('');
		},
	},
	watch: {
		value: {
			handler() {
				this.value && this.$modal.show('iframe');
			},
		},
	},
}
</script>

<style lang="scss">
	Iframe {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;
		z-index: 9999;
  }

	.Close {
		position: fixed;
		top: 100px;
    right: 0;
    transform: translate(-50%, -50%);
	}
</style>