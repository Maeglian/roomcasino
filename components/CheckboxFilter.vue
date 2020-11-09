<template>
  <div class="CheckboxFilter">
    <div class="CheckboxFilter-Title">
      {{ title }}
    </div>
    <div class="CheckboxFilter-Footer" @click="onOpen()">
      <div class="CheckboxFilter-Default">
        {{ defaultValue }}
      </div>
      <i
        class="ThinArrow"
        :class="[ isOpen ? 'ThinArrow--up' : 'ThinArrow--down' ]"
      ></i>
    </div>
    <transition name="slide-up">
      <div v-show="isOpen" class="CheckboxFilter-Inner">
        <BaseCheckbox
          class="CheckboxFilter-Checkbox"
          labelClass="CheckboxFilter-Label"
          v-for="val in values"
          :modelValue="value"
          :value="val"
          :key="val"
          @change="$emit('change', $event)"
        >
          {{ val }}
        </BaseCheckbox>
      </div>
    </transition>
  </div>
</template>

<script>
import toggleDropdown from '~/mixins/toggleDropdown';
import BaseCheckbox from '~/components/base/BaseCheckbox';

export default {
  name: "CheckboxFilter",
  mixins: [toggleDropdown],
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: Array,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    defaultValue: {
      type: String,
      required: false,
      default: '',
    }
  },
  components: {
    BaseCheckbox,
  },
}
</script>

<style lang="scss">
.CheckboxFilter {
  position: relative;
  flex-grow: 1;
  display: flex;
  width: 100%;
  height: 60px;
  margin-bottom: 4px;

  @media(min-width: $screen-m) {
    flex-direction: column;
    justify-content: center;
    min-width: 100px;
    width: auto;
    margin-right: 6px;
    margin-bottom: 0;
    padding: 0 16px;
    background-color: var(--color-bg);
  }

  @media(min-width: $screen-l) {
    height: 80px;
    margin-right: 7px;
    padding: 0 18px;
  }

  @media(min-width: $screen-xl) {
    height: 96px;
  }

  &:last-child {
    margin-right: 0;
  }

  &-Title {
    display: flex;
    align-items: center;
    width: 120px;
    height: 100%;
    margin-right: 4px;
    padding: 0 10px 0 16px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-main);
    background-color: var(--color-bg);

    @media(min-width: $screen-m) {
      width: auto;
      height: auto;
      margin-right: 0;
      margin-bottom: 11px;
      padding: 0;
      font-size: 9px;
    }

    @media(min-width: $screen-l) {
      margin-bottom: 14px;
      font-size: 10px;
    }

    @media(min-width: $screen-xl) {
      font-size: 12px;
    }
  }

  &-Footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 16px;
    background-color: var(--color-bg);

    @media(min-width: $screen-m) {
      height: auto;
      padding: 0;
    }
  }

  &-Default {
    font-size: 12px;
    color: var(--color-text-ghost);

    @media(min-width: $screen-m) {
      font-size: 10px;
    }

    @media(min-width: $screen-l) {
      font-size: 12px;
    }

    @media(min-width: $screen-xl) {
      font-size: 14px;
    }
  }

  &-Inner {
    position: absolute;
    top: 66px;
    left: 0;
    z-index: 1;
    width: 100%;
    padding: 20px 16px;
    background-color: var(--color-bg);

    @media(min-width: $screen-l) {
      top: 87px;
    }

    @media(min-width: $screen-xl) {
      top: 103px;
    }
  }

  &-Checkbox {
    margin-bottom: 17px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-Label {
    font-size: 12px;
    color: var(--color-text-ghost);

    @media(min-width: $screen-m) {
      font-size: 10px;
    }

    @media(min-width: $screen-l) {
      font-size: 12px;
    }

    @media(min-width: $screen-l) {
      font-size: 14px;
    }
  }
}
</style>
