<template>
  <div class="BaseInput">
    <div
      v-if="v.required === false && v.$dirty"
      class="BaseInput-Error"
      :class="`${blockClass}-Error`"
    >
      Can't be blank
    </div>
    <div
      v-if="v.email === false"
      class="BaseInput-Error"
      :class="`${blockClass}-Error`"
    >
      Email must be valid
    </div>
    <div class="BaseInput-Wrapper">
      <input
        :class="[
          'BaseInput-Input',
          `${blockClass}-Field`,
          `${blockClass}-Input`,
          {'BaseInput-Input--error': v.$error}
          ]"
        :type="inputType"
        v-model="val"
      />
      <span v-if="!v.required" class="BaseInput-Placeholder" :class="`${blockClass}-Placeholder`">
        {{ placeholder }}
        <span v-if="required" class="BaseInput-Placeholder--required">*</span>
      </span>
    </div>
  </div>
</template>

<script>
import inputValidation from '@/mixins/inputValidation';

export default {
  name: 'BaseInput',
  props: {
    blockClass: {
      type: String,
      isRequired: false,
      default: '',
    },
    value: {
      type: String,
      isRequired: false,
      default: '',
    },
    inputType: {
      type: String,
      isRequired: false,
      default: 'text',
    },
    placeholder: {
      type: String,
      isRequired: false,
      default: '',
    },
    required: {
      type: Boolean,
      isRequired: false,
      default: false,
    },
    v: {
      type: Object,
      required: false,
    },
  },
  mixins: [inputValidation],
};
</script>

<style lang="scss">
.BaseInput {
  &-Wrapper {
    position: relative;
  }

  &-Input {
    position: relative;
    z-index: 1;

    &.BaseInput-Input--error {
      border: 2px solid rgba(235, 28, 42, 0.3);
    }

    &:focus {
      + .BaseInput-Placeholder {
        display: none;
      }
    }
  }

  &-Error {
    margin-bottom: 5px;
    font-size: 10px;
    color: var(--color-error);
  }

  &-Placeholder {
    position: absolute;
    top: 0;
    left: 0;

    &--required {
      color: var(--color-error);
    }
  }
}
</style>
