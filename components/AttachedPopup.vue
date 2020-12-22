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
    right: 14%;
    min-width: 140px;
    padding: 10px 0;
    visibility: hidden;
    opacity: 0;
    transition: 0.2s all;

    &--Active {
      visibility: visible;
      opacity: 1;
    }

    &--Tail {
      &:after {
        content: '';
        position: absolute;
        top: -21px;
        right: 15px;
        z-index: -1;
        border: 12px solid transparent;
        border-bottom: 20px solid #10133a;
      }
    }
  }
}
</style>
