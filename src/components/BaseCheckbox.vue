<template>
  <div class="BaseCheckbox">
    <label>
      <input
        name="name"
        class="BaseCheckbox-Checkbox"
        :type="type"
        :checked="checked"
        :value="value"
        @change="onInput($event)"
      />
      <div
        class="BaseCheckbox-Label"
        :class="classObject"
        v-html="label"
      ></div>
    </label>
  </div>
</template>

<script>
import inputValidation from '@/mixins/inputValidation';

export default {
  name: 'BaseCheckbox',
  props: {
    blockClass: {
      type: String,
      isRequired: false,
      default: '',
    },
    checked: {
      type: Boolean,
      isRequired: false,
      default: false,
    },
    label: {
      type: String,
      isRequired: false,
      default: '',
    },
    type: {
      type: String,
      isRequired: false,
      default: 'checkbox',
    },
    name: {
      type: String,
      isRequired: false,
      default: '',
    },
    value: {
      type: String,
      isRequired: false,
      default: '',
    },
  },
  mixins: [inputValidation],
  computed: {
    classObject() {
      if (this.type === 'radio') {
        return `BaseCheckbox-Label BaseCheckbox-Label--radio ${this.blockClass}-Label--radio`;
      }
      return `${this.blockClass}-Label`;
    },
  },
};
</script>

<style lang="scss">
.BaseCheckbox {
  &-Checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  &-Label {
    position: relative;
    display: block;
    padding-left: 41px;
    position: relative;
    color: var(--color-text-ghost);

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 17px;
      height: 17px;
      background: var(--color-main1);
    }

    &--radio {
      line-height: 20px;
    }

    &--radio:before {
      width: 20px;
      height: 20px;
      background: var(--color-text-ghost);
    }
  }

  &-Checkbox:checked + &-Label:before {
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url("data:image/svg+xml,%3Csvg width='7' height='6' viewBox='0 0 7 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.75926 1.65079C7.11868 1.23147 7.07012 0.600166 6.65079 0.240743C6.23147 -0.118679 5.60017 -0.0701173 5.24074 0.349209L6.75926 1.65079ZM3 4.5L2.28976 5.20396C2.48638 5.40234 2.75702 5.50945 3.03616 5.49935C3.31529 5.48925 3.57748 5.36286 3.75926 5.15079L3 4.5ZM1.71024 1.77819C1.32146 1.38593 0.688299 1.38312 0.296043 1.7719C-0.0962134 2.16069 -0.0990272 2.79384 0.289758 3.1861L1.71024 1.77819ZM3.71024 3.79604L1.71024 1.77819L0.289758 3.1861L2.28976 5.20396L3.71024 3.79604ZM5.24074 0.349209L2.24074 3.84921L3.75926 5.15079L6.75926 1.65079L5.24074 0.349209Z' fill='%230E152F'/%3E%3C/svg%3E%0A");
  }

  &-Checkbox:checked + &-Label--radio:before {
    background-image: none;
  }

  &-Checkbox:checked + &-Label--radio:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 10px;
    height: 10px;
    background: var(--color-main1);
  }
}

</style>
