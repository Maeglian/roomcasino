<template>
  <div
    v-click-outside="onClickOutside"
    class="Search"
    :class="{ 'Search--open': isOpen }"
    @click="openSearch"
  >
    <svg class="Icon Search-Icon">
      <use xlink:href="@/assets/img/icons.svg#search"></use>
    </svg>
    <input type="text" class="Search-Input" placeholder="Find game" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
      isOpen: true,
    };
  },
  computed: {
    ...mapState(['width']),
  },
  methods: {
    openSearch() {
      if (this.width >= 768) this.isOpen = true;
    },
    onClickOutside() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.Search {
  z-index: 1;
  display: flex;
  border: 2px solid var(--color-border);
  cursor: pointer;

  &-Icon {
    position: absolute;
    top: calc(50% - 7px);
    right: 18px;
    width: 15px;
    height: 15px;
    fill: var(--color-main2);

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
      left: 12px;
      width: 15px;
      height: 15px;
    }

    @media (min-width: $screen-xl) {
      top: 15px;
      left: 18px;
      width: 18px;
      height: 18px;
    }
  }

  &-Input {
    width: 100%;
    height: 100%;
    padding: 16px 12px;
    font-size: 14px;
    line-height: 1.18;
    color: var(--color-text-main);
    background: transparent;
    border: none;

    @media (min-width: $screen-m) {
      padding: 0;
      padding-left: 20px;
    }

    @media (min-width: $screen-l) {
      padding-left: 32px;
    }

    @media (min-width: $screen-xl) {
      padding-left: 50px;
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

  &--open {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: var(--color-body);
    cursor: initial;
  }
}
</style>
