<template>
  <div class="BaseInput">
    <div
      v-if="v && v.required === false && v.$dirty"
      class="BaseInput-Error"
      :class="`${blockClass}-Error`"
    >
      Can't be blank
    </div>
    <div
    v-if="v && v.email === false"
    class="BaseInput-Error"
    :class="`${blockClass}-Error`"
    >
      Email must be valid
    </div>
    <div
      v-if="v && v.sameAsPassword === false"
      class="BaseInput-Error"
      :class="`${blockClass}-Error`"
    >
      Passwords are not the same
    </div>
    <div
      v-if="v && v.minLength === false"
      class="BaseInput-Error"
      :class="`${blockClass}-Error`"
    >
      Must have at least {{ v.$params.minLength.min }} characters
    </div>
    <div
      v-if="v && v.maxLength === false"
      class="BaseInput-Error"
      :class="`${blockClass}-Error`"
    >
      Must not be more than {{ v.$params.maxLength.max }} characters
    </div>
    <div
      v-if="v && v.passwordCheck === false"
      class="BaseInput-Error"
      :class="`${blockClass}-Error`"
    >
      Password must be at least 8 characters and have one number, one small letter and one capital letter
    </div>
    <div class="BaseInput-Wrapper">
      <svg
        v-if="icon"
        class="BaseInput-Icon"
        :class="`${blockClass}-Icon ${blockClass}-Icon--${icon}`"
      >
        <use :xlink:href="require('@/assets/img/icons.svg') + `#${icon}`"></use>
      </svg>
      <input
        :class="[
          'BaseInput-Input',
          `${blockClass}-Field`,
          `${blockClass}-Input`,
          {'BaseInput-Input--error': v && v.$error},
          [icon ? `${blockClass}-Input--withIcon`: ''],
          ]"
        :type="inputType"
        :placeholder="customPlaceholder ? '' : placeholder"
        v-model="val"
      />
      <span
        v-if="customPlaceholder && v && !v.required"
        class="BaseInput-Placeholder"
        :class="`${blockClass}-Placeholder`"
      >
        {{ placeholder }}
        <span v-if="required" class="BaseInput-Placeholder--required">*</span>
      </span>
      <slot name="afterInput-absolute"></slot>
    </div>
    <slot name="afterInput-relative"></slot>
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
      type: [String, Number],
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
    icon: {
      type: String,
      isRequired: false,
      default: '',
    },
    customPlaceholder: {
      type: Boolean,
      isRequired: false,
      default: false,
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
    height: 100%;
  }

  &-Input {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;

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

    &--required {
      color: var(--color-error);
    }
  }

  &-Icon {
    position: absolute;
    z-index: 2;
  }
}
</style>
