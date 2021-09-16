<template>
  <div class="BaseInput">
    <div v-if="errors.length" :class="errorClass">
      <div v-for="(error, index) in errors" :key="index" class="BaseInput-Error">
        {{ $t(`errors.${error.errorInfo.name}`, error.errorInfo.params) }}
      </div>
    </div>
    <slot name="beforeInput-relative"></slot>
    <div
      class="BaseInput-Wrapper"
      :class="[
        wrapperClass,
        { 'BaseInput-Wrapper--valid': shouldDisplayFieldIsValid && !v.$invalid },
      ]"
    >
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
      type: [String, Boolean, Array, Object],
      required: false,
      default: false,
    },
    inputMask: {
      type: [Function, Boolean],
      isRequired: false,
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
    shouldDisplayFieldIsValid: {
      type: Boolean,
      isRequired: false,
      default: false,
    },
    v: {
      type: [Object, Boolean],
      required: false,
      default: false,
    },
  },
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(value) {
        if (this.v) this.v.$touch();
        if (this.inputMask) {
          value = this.inputMask(value);
        }
        this.$emit('input', value);
        this.errors = this.checkErrors();
      },
    },
    requiredValue() {
      return this.shouldDisplayValidation && this.v && this.v.required === false && this.v.$dirty;
    },
    email() {
      return this.shouldDisplayValidation && this.v && this.v.email === false && this.v.$dirty;
    },
    sameAsPassword() {
      return (
        this.shouldDisplayValidation &&
        this.v &&
        this.v.sameAsPassword === false &&
        this.v.$dirty &&
        this.v.$params.sameAsPassword.type !== 'not'
      );
    },
    sameAsPasswordTypeNot() {
      return (
        this.shouldDisplayValidation &&
        this.v &&
        this.v.sameAsPassword === false &&
        this.v.$dirty &&
        this.v.$params.sameAsPassword.type === 'not'
      );
    },
    minLength() {
      return this.shouldDisplayValidation && this.v && this.v.minLength === false && this.v.$dirty;
    },
    maxLength() {
      return this.shouldDisplayValidation && this.v && this.v.maxLength === false && this.v.$dirty;
    },
    passwordCheck() {
      return (
        this.shouldDisplayValidation && this.v && this.v.passwordCheck === false && this.v.$dirty
      );
    },
    phoneWithPlusCheck() {
      return (
        this.shouldDisplayValidation &&
        this.v &&
        this.v.phoneWithPlusCheck === false &&
        this.v.$dirty
      );
    },
    numeric() {
      return this.shouldDisplayValidation && this.v && this.v.numeric === false && this.v.$dirty;
    },
    dayCheck() {
      return this.shouldDisplayValidation && this.v && this.v.dayCheck === false && this.v.$dirty;
    },
    monthCheck() {
      return this.shouldDisplayValidation && this.v && this.v.monthCheck === false && this.v.$dirty;
    },
    yearCheck() {
      return this.shouldDisplayValidation && this.v && this.v.yearCheck === false && this.v.$dirty;
    },
    alphaNum() {
      return this.shouldDisplayValidation && this.v && this.v.alphaNum === false && this.v.$dirty;
    },
    checkIfNullOrPositiveNumbers() {
      return (
        this.shouldDisplayValidation &&
        this.v &&
        this.v.checkIfNullOrPositiveNumbers === false &&
        this.v.$dirty
      );
    },
    postalCodeCheck() {
      return (
        this.shouldDisplayValidation && this.v && this.v.postalCodeCheck === false && this.v.$dirty
      );
    },
    checkIfPositiveNumbers() {
      return (
        this.shouldDisplayValidation &&
        this.v &&
        this.v.checkIfPositiveNumbers === false &&
        this.v.$dirty
      );
    },
  },
  watch: {
    'v.$error': function(err) {
      if (err) this.errors = this.checkErrors();
    },
  },
  methods: {
    checkErrors() {
      return [
        {
          name: 'requiredValue',
          isError: this.requiredValue,
          errorInfo: {
            name: 'required',
            params: {},
          },
        },
        {
          name: 'email',
          isError: this.email,
          errorInfo: {
            name: 'email',
            params: {},
          },
        },
        {
          name: 'sameAsPassword',
          isError: this.sameAsPassword,
          errorInfo: {
            name: 'confirmPassword',
            params: {},
          },
        },
        {
          name: 'sameAsPasswordTypeNot',
          isError: this.sameAsPasswordTypeNot,
          errorInfo: {
            name: 'oldAndNewPasswords',
            params: {},
          },
        },
        {
          name: 'minLength',
          isError: this.minLength,
          errorInfo: {
            name: 'minLength',
            params: this.minLength ? { num: this.v.$params.minLength.min } : {},
          },
        },
        {
          name: 'maxLength',
          isError: this.maxLength,
          errorInfo: {
            name: 'maxLength',
            params: this.maxLength ? { num: this.v.$params.maxLength.max } : {},
          },
        },
        {
          name: 'passwordCheck',
          isError: this.passwordCheck,
          errorInfo: {
            name: 'passwordCheck',
            params: {},
          },
        },
        {
          name: 'phoneWithPlusCheck',
          isError: this.phoneWithPlusCheck,
          errorInfo: {
            name: 'phone',
            params: {},
          },
        },
        {
          name: 'numeric',
          isError: this.numeric,
          errorInfo: {
            name: 'numbers',
            params: {},
          },
        },
        {
          name: 'dayCheck',
          isError: this.dayCheck,
          errorInfo: {
            name: 'day',
            params: {},
          },
        },
        {
          name: 'monthCheck',
          isError: this.monthCheck,
          errorInfo: {
            name: 'month',
            params: {},
          },
        },
        {
          name: 'yearCheck',
          isError: this.yearCheck,
          errorInfo: {
            name: 'year',
            params: {},
          },
        },
        {
          name: 'alphaNum',
          isError: this.alphaNum,
          errorInfo: {
            name: 'alphaNum',
            params: {},
          },
        },
        {
          name: 'checkIfNullOrPositiveNumbers',
          isError: this.checkIfNullOrPositiveNumbers,
          errorInfo: {
            name: '0andNum',
            params: {},
          },
        },
        {
          name: 'postalCodeCheck',
          isError: this.postalCodeCheck,
          errorInfo: {
            name: 'postalCode',
            params: {},
          },
        },
        {
          name: 'checkIfPositiveNumbers',
          isError: this.checkIfPositiveNumbers,
          errorInfo: {
            name: 'positiveNum',
            params: {},
          },
        },
      ].filter(item => item.isError);
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

    &--valid {
      &:after {
        content: '';
        position: absolute;
        top: calc(50% - 4px);
        right: 18px;
        width: 11px;
        height: 8px;
        background-image: url('~@/assets/img/check.svg');
        background-repeat: no-repeat;
        background-size: auto 100%;
      }
    }
  }

  &-Input {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;

    &:focus {
      + .BaseInput-Placeholder {
        display: none;
      }
    }

    &::placeholder {
      color: var(--color-text-faded);
      text-transform: uppercase;
    }

    &.BaseInput-Input--error {
      border: 2px solid rgba(235, 28, 42, 0.3);
    }
  }

  &-Error {
    font-size: 10px;
    color: var(--color-error);
  }

  &-Check {
    position: absolute;
    top: calc(50% - 4px);
    right: 18px;
    height: 8px;
  }
}
</style>
