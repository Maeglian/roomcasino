<template>
  <div v-click-outside="onClickOutside" class="AttachedPopup">
    <slot name="trigger" />

    <div class="AttachedPopup-Popup" :class="{ 'AttachedPopup-Popup--Active': isInternalVisible }">
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
  methods: {
    onClickOutside(e) {
      if (!e.target.closest('.AttachedPopup')) this.$emit('close-popup');
    },
  },
};
</script>

<style lang="scss">
.AttachedPopup {
  position: relative;
  left: 0;

  &-Popup {
    position: absolute;
    top: 30px;
    right: 0;
    visibility: hidden;
    opacity: 0;
    transition: 0.2s all;

    &--Active {
      visibility: visible;
      opacity: 1;
    }

    &--Tail {
      &:before {
        content: '';
        position: absolute;
        top: -5px;
        right: 10px;
        width: 10px;
        height: 10px;
        background: var(--color-bg);
        transform: rotate(45deg);
      }
    }
  }
}
</style>
