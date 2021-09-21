<template>
  <div v-click-outside="onClickOutside" class="CheckboxFilter">
    <div v-if="title" class="CheckboxFilter-Title">
      {{ title }}
    </div>
    <button class="CheckboxFilter-Footer" @click="isOpen = !isOpen">
      <div
        class="CheckboxFilter-Label CheckboxFilter-Default"
        :class="{ 'CheckboxFilter-Default--active': isOpen }"
      >
        {{ value.length ? value.toString() : defaultValue }}
      </div>
      <div ref="arrow">
        <svg
          class="Arrow SearchPage-Arrow"
          :class="[isOpen ? 'Arrow--up' : 'Arrow--down']"
          width="6"
          height="5"
        >
          <use xlink:href="@/assets/img/icons.svg#triangle"></use>
        </svg>
      </div>
    </button>
    <div
      v-show="isOpen || width < 768"
      class="CheckboxFilter-Inner"
      :style="{ '--left-position': `${arrowLeftPosition}px` }"
    >
      <BaseCheckbox
        v-for="val in values"
        :key="valueKey ? val[valueKey] : val"
        class="CheckboxFilter-Checkbox"
        label-class="CheckboxFilter-Label"
        :model-value="value"
        :value="valueKey ? val[valueKey] : val"
        @change="$emit('change', $event)"
      >
        {{ nameKey ? val[nameKey] : val }}
      </BaseCheckbox>
    </div>
  </div>
</template>

<script>
import BaseCheckbox from '@/components/base/BaseCheckbox';
import { mapState } from 'vuex';

export default {
  name: 'CheckboxFilter',
  components: {
    BaseCheckbox,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    defaultValue: {
      type: String,
      default: '',
    },
    values: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
    valueKey: {
      type: [String, Boolean],
      default: false,
    },
    nameKey: {
      type: [String, Boolean],
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      arrowLeftPosition: 0,
    };
  },
  computed: {
    ...mapState(['width']),
  },
  mounted() {
    this.arrowLeftPosition = this.$refs.arrow.offsetLeft || 20;
  },
  methods: {
    onClickOutside() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.CheckboxFilter {
  padding: 23px 18px;

  @media (min-width: $screen-m) {
    display: flex;
  }

  &-Title {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-faded);

    @media (min-width: $screen-m) {
      display: none;
    }
  }

  &-Footer {
    display: none;

    @media (min-width: $screen-m) {
      display: flex;
      align-items: center;
    }
  }

  &-Inner {
    column-count: 2;

    @media (min-width: $screen-m) {
      position: absolute;
      top: 60px;
      left: 0;
      z-index: 6;
      padding: 30px 25px;
      column-count: 3;
      background-color: var(--color-bg-lighter);
      border-radius: var(--border-radius-default);

      &:before {
        content: '';
        position: absolute;
        top: -8px;
        left: calc(var(--left-position) - 5px);
        width: 15px;
        height: 15px;
        background: var(--color-bg-lighter);
        transform: rotate(45deg);
      }
    }
  }

  &-Checkbox {
    break-inside: avoid;
    margin-bottom: 17px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .BaseCheckbox-Checkbox:checked + .BaseCheckbox-Label:before {
    background-color: transparent;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' rx='2' fill='%23E45809'/%3E%3C/svg%3E%0A");
  }

  &-Label {
    padding-left: 30px;
    font-size: 12px;
    font-weight: 700;
    line-height: 17px;
    color: var(--color-text-main);
    text-transform: capitalize;
    white-space: nowrap;
    cursor: pointer;

    &:before {
      top: 0;
      left: 0;
      border-radius: var(--border-radius-4);
    }

    &:hover {
      color: var(--color-main1);
    }
  }

  &-Default {
    width: 100px;
    margin-right: 8px;
    padding-left: 0;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;

    &--active {
      color: var(--color-text-faded);
    }
  }

  &-ChosenProvider {
    display: flex;
    height: 100%;

    .ThinArrow {
      margin-left: auto;
    }
  }

  &-Submit {
    width: 100%;
    height: 55px;
    font-size: 12px;
    font-weight: 700;
    line-height: 55px;
    text-align: center;
    color: var(--color-main1);
    text-transform: uppercase;
    background: var(--color-bg-lighter);

    @media (min-width: $screen-m) {
      display: none;
    }
  }
}
</style>
