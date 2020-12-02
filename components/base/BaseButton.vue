<template>
  <button class="BaseButton">
    <Spinner v-if="isLoading" class="Btn-Spinner" />
    <slot></slot>
  </button>
</template>

<script>
import Spinner from '@/components/cabinet/Spinner';

export default {
  name: 'BaseButton',
  components: {
    Spinner,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.BaseButton {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: var(--color-text-main);
  text-transform: uppercase;
  text-decoration: none;
  background: var(--color-main1);
  border: none;
  cursor: pointer;

  @media (min-width: $screen-m) {
    font-size: 14px;
  }

  @media (min-width: $screen-l) {
    padding-right: 30px;
    padding-left: 30px;
  }

  @media (min-width: $screen-xl) {
    padding-right: 45px;
    padding-left: 45px;
    font-size: 16px;
  }

  &--text {
    background: none;
  }

  &--color {
    background: var(--color-main2);

    &:hover {
      background: var(--color-hover);
    }
  }

  &--dark {
    background: var(--color-bg-lighter);

    &:hover {
      background: var(--color-main1);
    }
  }

  &--darkColor {
    background: rgba(235, 28, 42, 0.4);
  }

  &--outline {
    background: transparent;
    border: 2px solid var(--color-main2);
  }

  &--centered {
    margin-left: 50%;
    transform: translateX(-50%);
  }

  &--full {
    width: 100%;
  }
}
</style>
