<template>
  <div v-if="items.length" v-click-outside="onClickOutside" class="BaseDropdown">
    <div
      v-if="v && v.required === false && v.$dirty"
      class="BaseDropdown-Error"
      :class="errorClass"
    >
      Can't be blank
    </div>
    <button
      v-if="!autocomplete"
      class="BaseDropdown-Item BaseDropdown-ActiveItem"
      aria-haspopup="true"
      tabindex="0"
      type="button"
      @click="onOpenDropdown()"
      @keyup.up="onArrowUp()"
      @keyup.down="onArrowDown()"
      @keyup.enter="onSelectValueKeyboard()"
    >
      <slot v-if="$scopedSlots.default" :item="activeItem ? activeItem : items[0]"></slot>
      <template v-else>
        {{ activeItem[itemName] || activeItem || placeholder || items[0][itemName] || items[0] }}
      </template>
      <i
        v-if="items.length > 1"
        class="ThinArrow"
        :class="[isOpen ? 'ThinArrow--up' : 'ThinArrow--down']"
      ></i>
    </button>
    <button
      v-else
      type="button"
      class="BaseDropdown-Wrapper"
      aria-haspopup="true"
      tabindex="0"
      @keyup.up="onArrowUp()"
      @keyup.down="onArrowDown()"
      @click="onOpenDropdown()"
      @keyup.enter="onSelectValueKeyboard()"
    >
      <input
        v-model="inputVal"
        class="BaseDropdown-Item BaseDropdown-ActiveItem BaseDropdown-Input"
        @input="onInput($event)"
        @keypress.enter.prevent
      />
      <slot v-if="$scopedSlots.default" :item="activeItem ? activeItem : items[0]"></slot>
      <i
        v-if="items.length > 1"
        class="BaseDropdown-Arrow ThinArrow"
        :class="[isOpen ? 'ThinArrow--up' : 'ThinArrow--down']"
      ></i>
    </button>
    <ul v-show="isOpen" class="BaseDropdown-Inner" aria-label="submenu">
      <li
        v-for="(item, i) in filteredItems"
        :key="item[keyName] || item[itemName] || item"
        class="BaseDropdown-Item BaseDropdown-DropdownItem"
        :class="{ 'BaseDropdown-DropdownItem--highlighted': activeItemIndex === i }"
        @click="onSelectValue(item)"
      >
        <slot v-if="$scopedSlots.default" :item="item"></slot>
        {{ item[itemName] || item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { searchInArrByString } from '@/utils/helpers';

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
      type: [String, Object, Boolean],
      required: false,
      default: '',
    },
    placeholder: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    v: {
      type: [Object, Boolean],
      required: false,
      default: false,
    },
    errorClass: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    itemName: {
      type: [String, Boolean],
      required: false,
      default: 'name',
    },
    keyName: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    autocomplete: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      inputVal:
        this.activeItem[this.itemName] ||
        this.activeItem ||
        this.placeholder ||
        this.items[0][this.itemName] ||
        this.items[0],
      isOpen: false,
      activeItemIndex: -1,
      autocompletedItems: [],
      autocompleteMode: false,
    };
  },
  computed: {
    filteredItems() {
      if (
        this.autocomplete &&
        this.autocompleteMode &&
        this.inputVal &&
        this.autocompletedItems.length
      )
        return this.autocompletedItems;

      return this.items.filter(item => {
        if (item[this.itemName]) return item[this.itemName] !== this.activeItem[this.itemName];
        return item !== this.activeItem;
      });
    },
  },
  watch: {
    activeItem() {
      this.inputVal = this.activeItem[this.itemName] || this.activeItem;
    },
    inputVal() {
      if (this.inputVal) {
        this.autocompletedItems = searchInArrByString(this.inputVal, this.items, this.itemName);
      }
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
      if (this.autocomplete && JSON.stringify(val) !== JSON.stringify(this.activeItem))
        this.inputVal = '';
      if (JSON.stringify(val) === JSON.stringify(this.activeItem)) {
        this.inputVal =
          this.activeItem[this.itemName] ||
          this.activeItem ||
          this.placeholder ||
          this.items[0][this.itemName] ||
          this.items[0];
      }
      this.autocompleteMode = false;
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
      if (!this.inputVal) {
        this.inputVal =
          this.activeItem[this.itemName] ||
          this.activeItem ||
          this.placeholder ||
          this.items[0][this.itemName] ||
          this.items[0];
      }
      this.autocompleteMode = false;
      this.isOpen = false;
    },
    onInput(e) {
      this.isOpen = true;
      this.autocompleteMode = true;
      this.inputVal = e.target.value;
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

  &-Item {
    cursor: pointer;
  }

  &-Wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: var(--color-bg);
  }

  &-Input {
    width: 100%;
    text-transform: uppercase;
    border: none;
    outline: none;
  }

  &-Arrow {
    position: absolute;
    right: 16px;
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

  &-Error {
    font-size: 10px;
    color: var(--color-error);
  }
}
</style>
