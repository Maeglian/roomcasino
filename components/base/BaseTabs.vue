<template>
  <div class="BaseTabs">
    <button
      v-for="tab in items"
      :key="tab.value"
      class="BaseTabs-Tab"
      :class="{'BaseTabs-Tab--active': currentItem === tab.value}"
      @click="$emit('chooseTab', tab.value)"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseTabs',
  props: {
    items: {
      type: Array,
      required: true,
    },
    currentItem: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss">
.BaseTabs {
  display: flex;
  width: 100%;
  max-width: 100%;
  height: 55px;

  @media (min-width: $screen-m) {
    width: auto;
  }

  &-Tab {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-right: 4px;
    font-size: 10px;
    font-weight: 700;
    text-align: center;
    color: var(--color-text-main);
    background: var(--color-bg);
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &.nuxt-link-exact-active, &--active {
      color: var(--color-main1);

      &:after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 50px;
        height: 4px;
        background: var(--color-main1);
        transform: translateX(-50%);
      }
    }
  }
}

</style>
