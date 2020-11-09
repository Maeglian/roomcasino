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
    <slot name="beforeInput-relative"></slot>
    <div class="BaseInput-Wrapper" :class="wrapperClass">
      <slot name="beforeInput-absolute"></slot>
      <input
        :id="inputId"
        :class="[
          inputClass,
          'BaseInput-Input',
          {'BaseInput-Input--error': v && v.$error},
          ]"
        :type="inputType"
        :placeholder="placeholder"
        v-model="val"
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
    inputId: {
      type: String,
      isRequired: false,
      default: '',
    },
    inputClass: {
      type: String,
      isRequired: false,
      default: '',
    },
    wrapperClass: {
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
}
</style>
