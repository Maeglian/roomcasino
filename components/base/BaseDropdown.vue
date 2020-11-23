<template>
  <div class="BaseDropdown" v-click-outside="onClickOutside">
    <button
      class="BaseDropdown-Item BaseDropdown-ActiveItem"
      aria-haspopup="true"
      @click="onOpenDropdown()"
      @keyup.up="onArrowUp()"
      @keyup.down="onArrowDown()"
      @keyup.enter="onSelectValueKeyboard()"
      tabindex="0"
      type="button"
    >
      {{ activeItem || placeholder || items[0] }}
      <i
        class="ThinArrow"
        :class="[ isOpen ? 'ThinArrow--up' : 'ThinArrow--down' ]"
      ></i>
    </button>
    <ul v-show="isOpen" class="BaseDropdown-Inner" aria-label="submenu">
      <li
        v-for="(item, i) in filteredItems"
        :key="item"
        class="BaseDropdown-Item BaseDropdown-DropdownItem"
        :class="{'BaseDropdown-DropdownItem--highlighted': activeItemIndex === i}"
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
  props: {
    items: {
      type: Array,
      isRequired: true,
    },
    activeItem: {
      type: String,
      isRequired: false,
    },
    placeholder: {
      type: String,
      isRequired: false,
    },
  },
  model: {
    prop: 'activeItem',
  },
  data() {
    return {
      isOpen: false,
      activeItemIndex: -1,
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => item !== this.activeItem);
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
      this.activeItem = val;
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
    }
  },
};
</script>

<style lang="scss">
.BaseDropdown {
  position: relative;

  &-ActiveItem {
    width: 100%;
  }

  &-Item, &-ActiveItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-main);
    background: var(--color-bg);
  }

  &-DropdownItem {
    padding: 22px 16px;
    &:hover, &--highlighted {
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
    scrollbar-color: #6A6E7F transparent;

    &::-webkit-scrollbar {
      width: 5px;
      background: var(--color-bg);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #6A6E7F;
      border-radius: 3px;
    }
  }
}
</style>
