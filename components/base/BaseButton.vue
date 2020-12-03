<template>
  <button class="Btn">
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
