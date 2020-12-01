<template>
  <div class="BaseInput">
    <div
      v-if="shouldDisplayValidation && v && v.required === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      Can't be blank
    </div>

    <div
      v-if="shouldDisplayValidation && v && v.email === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      No valid email address
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.sameAsPassword === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      Passwords are not the same
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.minLength === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      Must have at least {{ v.$params.minLength.min }} characters
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.maxLength === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      Must not be more than {{ v.$params.maxLength.max }} characters
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.passwordCheck === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      Must be 8+ chars with 1 number, 1 small and 1 capital letter
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.numeric === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      Must be numeric
    </div>
    <slot name="beforeInput-relative"></slot>
    <div class="BaseInput-Wrapper" :class="wrapperClass">
      <slot name="beforeInput-absolute"></slot>
      <input
        :id="inputId"
        v-model="val"
        :class="[
          inputClass,
          'BaseInput-Input',
          { 'BaseInput-Input--error': shouldDisplayValidation && v && v.$error },
        ]"
        :type="inputType"
        :placeholder="placeholder"
        :autocorrect="autocorrect"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :inputmode="inputmode"
      />
      <slot name="afterInput-absolute"></slot>
    </div>
    <slot name="afterInput-relative"></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: '',
    },
    inputId: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    inputClass: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    wrapperClass: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    errorClass: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    inputType: {
      type: String,
      required: false,
      default: 'text',
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    autocorrect: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    autocomplete: {
      type: [String, Boolean],
      isRequired: false,
      default: false,
    },
    inputmode: {
      type: [String, Boolean],
      isRequired: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      isRequired: false,
      default: false,
    },
    shouldDisplayValidation: {
      type: Boolean,
      isRequired: false,
      default: true,
    },
    v: {
      type: [Object, Boolean],
      required: false,
      default: false,
    },
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(value) {
        if (this.v) this.v.$touch();
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss">
.BaseInput {
  position: relative;

  &-Wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &-Input {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    font-size: 16px;

    @media (min-width: $screen-s) {
      font-size: initial;
    }

    &:focus {
      + .BaseInput-Placeholder {
        display: none;
      }
    }

    &.BaseInput-Input--error {
      border: 2px solid rgba(235, 28, 42, 0.3);
    }
  }

  &-Error {
    font-size: 10px;
    color: var(--color-error);
  }
}
</style>
