<template>
  <div class="BaseTabs" :class="{ 'BaseTabs--vertical': isVerticalForm }">
    <button
      v-for="tab in items"
      :key="tab.value"
      class="BaseTabs-Tab"
      :class="{ 'BaseTabs-Tab--active': currentItem === tab.value }"
      @click="$emit('choose-tab', tab.value)"
    >
      <div class="BaseTabs-Name">
        {{ tab.name }}
      </div>
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
    },
    isVerticalForm: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.BaseTabs {
  display: flex;
  max-width: 100%;
  height: 55px;

  @media (min-width: $screen-m) {
    width: auto;
  }

  &-Tab {
    position: relative;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
    font-weight: 700;
    text-align: center;
    color: var(--color-text-main);
    text-transform: inherit;
    background: var(--color-bg);
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &.nuxt-link-exact-active,
    &--active {
      color: var(--color-main1);

      .BaseTabs-Name {
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: -15px;
          z-index: 0;
          width: calc(100% + 30px);
          height: 4px;
          background: var(--color-main1);
        }
      }
    }
  }

  &-Name {
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

.BaseTabs--vertical {
  flex-direction: column;
  max-width: none;
  height: auto;

  .BaseTabs-Tab {
    justify-content: flex-start;
    height: 55px;
    margin-right: 0;
    margin-bottom: 4px;
    padding-left: 16px;

    @media (min-width: $screen-m) {
      height: 45px;
      padding-left: 20px;

      &:after {
        display: none;
      }
    }

    @media (min-width: $screen-l) {
      height: 55px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:after {
      content: '';
      position: absolute;
      right: 24px;
      padding: 2px;
      border-width: 2px 2px 0 0;
      border-style: solid;
      border-color: var(--color-text-main);
      transform: rotate(45deg);
    }
  }

  .BaseTabs-Tab.nuxt-link-exact-active,
  .BaseTabs-Tab--active {
    padding-left: 16px;
    color: var(--color-text-main);

    @media (min-width: $screen-m) {
      color: var(--color-main1);
      border-left: 4px solid var(--color-main1);
    }

    .BaseTabs-Name {
      position: relative;

      &:after {
        display: none;
      }
    }
  }
}
</style>
