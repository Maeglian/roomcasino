<template>
  <div
    v-click-outside="onClickOutside"
    class="Search"
    :class="{ 'Search--open': isOpen }"
    @click="openSearch"
  >
    <svg v-if="!value || (isOpen && width >= 768)" class="Icon Search-Icon">
      <use xlink:href="@/assets/img/icons.svg#search"></use>
    </svg>
    <div v-if="value" class="Close Search-Icon Search-Close" @click="$emit('input', '')"></div>
    <input
      type="text"
      class="Search-Input"
      :placeholder="$t('search.findGame')"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <div
      v-if="isOpen && withDropdown"
      class="Search-Dropdown"
      :class="{ 'Search-Dropdown--opened': value }"
    >
      <slot name="dropdown"></slot>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Search',

  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    withDropdown: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapState(['width']),
  },
  beforeDestroy() {
    this.onClickOutside();
  },
  methods: {
    ...mapMutations(['toggleOverlay']),
    openSearch() {
      if (this.width >= 768) {
        this.isOpen = true;
        if (this.withDropdown) this.toggleOverlay(true);
      }
    },
    onClickOutside() {
      this.isOpen = false;
      if (this.withDropdown) this.toggleOverlay(false);
    },
  },
};
</script>

<style lang="scss">
.Search {
  display: flex;
  cursor: pointer;

  &-Icon {
    position: absolute;
    top: calc(50% - 7px);
    right: 18px;
    width: 15px;
    height: 15px;
    fill: var(--color-main1);

    @media (min-width: $screen-m) {
      top: 10px;
      right: auto;
      left: 6px;
      width: 9px;
      height: 9px;
    }

    @media (min-width: $screen-l) {
      top: 12px;
      right: initial;
      width: 15px;
      height: 15px;
    }

    @media (min-width: $screen-xl) {
      top: 15px;
      left: 12px;
      width: 18px;
      height: 18px;
    }
  }

  &-Close {
    top: calc(50% - 11px);
    width: 22px;
    height: 22px;
  }

  &-Input {
    width: 100%;
    height: 100%;
    padding: 16px 50px 16px 12px;
    font-size: 14px;
    line-height: 1.18;
    color: var(--color-text-main);
    background: transparent;
    border: none;

    @media (min-width: $screen-m) {
      padding: 0 5px 0 20px;
    }

    @media (min-width: $screen-l) {
      padding-left: 32px;
    }

    @media (min-width: $screen-xl) {
      padding-left: 40px;
    }

    &::placeholder {
      font-size: 12px;
      font-weight: 700;
      line-height: 1.242;
      color: var(--color-text-main);
      text-transform: uppercase;

      @media (min-width: $screen-m) {
        font-size: 9px;
      }

      @media (min-width: $screen-l) {
        font-size: 10px;
      }

      @media (min-width: $screen-xl) {
        font-size: 12px;
      }
    }
  }

  &-Dropdown {
    position: absolute;
    top: 50px;
    z-index: 1001;
    width: 100%;
    background: var(--color-bg);

    &--opened {
      padding: 15px;
    }
  }
}
</style>
