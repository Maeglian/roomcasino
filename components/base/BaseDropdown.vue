<template>
  <div v-click-outside="onClickOutside" class="BaseDropdown">
    <button
      class="BaseDropdown-Item BaseDropdown-ActiveItem"
      aria-haspopup="true"
      tabindex="0"
      type="button"
      @click="onOpenDropdown()"
      @keyup.up="onArrowUp()"
      @keyup.down="onArrowDown()"
      @keyup.enter="onSelectValueKeyboard()"
    >
      {{ activeItem || placeholder || items[0] }}
      <i class="ThinArrow" :class="[isOpen ? 'ThinArrow--up' : 'ThinArrow--down']"></i>
    </button>
    <ul v-show="isOpen" class="BaseDropdown-Inner" aria-label="submenu">
      <li
        v-for="(item, i) in filteredItems"
        :key="item"
        class="BaseDropdown-Item BaseDropdown-DropdownItem"
        :class="{ 'BaseDropdown-DropdownItem--highlighted': activeItemIndex === i }"
        @click="onSelectValue(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BaseDropdown',
  model: {
    prop: 'activeItem',
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    activeItem: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    placeholder: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      activeItemIndex: -1,
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item !== this.activeItem);
    },
  },
  methods: {
    onOpenDropdown() {
      this.isOpen = !this.isOpen;
    },
    onSelectValueKeyboard() {
      if (this.activeItemIndex > -1) {
        this.onSelectValue(this.filteredItems[this.activeItemIndex]);
      }
    },
    onSelectValue(val) {
      this.$emit('set-dropdown-value', val);
      this.isOpen = false;
      this.activeItemIndex = -1;
    },
    onArrowDown() {
      if (this.activeItemIndex < this.items.length - 1) this.activeItemIndex++;
    },
    onArrowUp() {
      if (this.activeItemIndex > -1) this.activeItemIndex--;
    },
    onClickOutside() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.BaseDropdown {
  position: relative;

  &-ActiveItem {
    width: 100%;
  }

  &-Item,
  &-ActiveItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: inherit;
    background: var(--color-bg);
  }

  &-DropdownItem {
    padding: 22px 16px;

    &:hover,
    &--highlighted {
      background: var(--color-bg-lighter);
    }
  }

  &-Inner {
    position: absolute;
    top: 58px;
    left: 0;
    z-index: 10;
    width: 100%;
    max-height: 200px;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #6a6e7f transparent;

    &::-webkit-scrollbar {
      width: 5px;
      background: var(--color-bg);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #6a6e7f;
      border-radius: 3px;
    }
  }
}
</style>
