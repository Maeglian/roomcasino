<template>
  <div class="AttachedPopup" v-click-outside="onClickOutside">
		<slot name="trigger" />

		<div
			class="AttachedPopup-Popup"
			:class="{ 'AttachedPopup-Popup--Active': isInternalVisible }"
		>
			<div class="AttachedPopup-Popup--Tail"></div>
			<slot />
		</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
	props: {
		value: Boolean,
	},
	data: () => ({
		balance: null,
		currency: null,
		isInternalVisible: false,
	}),
	methods: {
		onClickOutside(e) {
      if (!e.target.closest('.AttachedPopup')) this.$emit('closePopup');
    },
	},
	computed: {
		...mapState(['user']),
		...mapGetters(['activeAccount']),
		getFullUserName() {
			const { firstName, lastName } = this.user;
			return `${firstName} ${lastName}`;
		},
	},
	watch: {
		value: {
			immediate: true,
			handler() {
				this.isInternalVisible = this.value;
			},
		},
	},
};
</script>

<style lang="scss">
	.AttachedPopup {
		position: relative;
		left: 0;

		&-Popup {
			min-width: 140px;
			position: absolute;
			right: 14%;
    	top: 30px;
			padding: 10px 0;
			opacity: 0;
			visibility: hidden;
			transition: .2s all;

			&--Active {
				opacity: 1;
				visibility: visible;
			}

			&--Tail {
				&::after {
					content: "";
					position: absolute;
					right: 15px;
					top: -21px;
					border: 12px solid transparent;
					border-bottom: 20px solid #10133a;
					z-index: -1;
				}
			}
		}
	}
</style>
