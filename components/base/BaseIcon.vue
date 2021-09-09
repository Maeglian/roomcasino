<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMaxYMax meet"
    v-on="{ ...$listeners }"
  >
    <use :xlink:href="iconPath" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconPath() {
      return `${require('@/assets/img/icons.svg')}#${this.name}`;
    },
  },
};
</script>

<style lang="scss">
.Icon {
  &--fill {
    fill: var(--color-main1);
  }

  &--stroke {
    stroke: var(--color-main1);
  }
}
</style>

