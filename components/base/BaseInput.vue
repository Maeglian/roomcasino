<template>
  <div class="BaseInput">
    <div
      v-if="shouldDisplayValidation && v && v.required === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.required') }}
    </div>

    <div
      v-if="shouldDisplayValidation && v && v.email === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.email') }}
    </div>
    <div
      v-if="
        shouldDisplayValidation &&
          v &&
          v.sameAsPassword === false &&
          v.$dirty &&
          v.$params.sameAsPassword.type !== 'not'
      "
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.confirmPassword') }}
    </div>
    <div
      v-if="
        shouldDisplayValidation &&
          v &&
          v.sameAsPassword === false &&
          v.$dirty &&
          v.$params.sameAsPassword.type === 'not'
      "
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.oldAndNewPasswords') }}
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.minLength === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.minLength', { num: v.$params.minLength.min }) }}
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.maxLength === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.maxLength', { num: v.$params.maxLength.max }) }}
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.passwordCheck === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      Must be 8+ chars with 1 number, 1 small and 1 capital letter
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.phoneWithPlusCheck === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.phone') }}
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.numeric === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.numbers') }}
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.dayCheck === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.day') }}
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.monthCheck === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.month') }}
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.yearCheck === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.year') }}
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.alphaNum === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      Must be numbers or letters
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.checkIfNullOrPositiveNumbers === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.0andNum') }}
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.postalCodeCheck === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.postalCode') }}
    </div>
    <div
      v-if="shouldDisplayValidation && v && v.checkIfPositiveNumbers === false && v.$dirty"
      class="BaseInput-Error"
      :class="errorClass"
    >
      {{ $t('errors.positiveNum') }}
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
