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
    <div
      v-if="v.sameAsPassword === false"
      class="BaseInput-Error"
      :class="`${blockClass}-Error`"
    >
      Passwords are not the same
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
          {'BaseInput-Input--error': v.$error},
          {'BaseInput-Input--withVisibility': toggleVisibility},
          [toggleVisibility ? `${blockClass}-Input--withVisibility`: ''],
          [icon ? `${blockClass}-Input--withIcon`: ''],
          ]"
        :type="type"
        :placeholder="customPlaceholder ? '' : placeholder"
        v-model="val"
      />
      <svg
        v-if="toggleVisibility"
        class="BaseInput-Visible"
        :class="[
          [toggleVisibility ? `${blockClass}-Visible`: ''],
          [toggleVisibility && passwordVisible ? `${blockClass}-Visible--isVisible`: ''],
        ]"
        @click="passwordVisible = !passwordVisible"
      >
        <use xlink:href="@/assets/img/icons.svg#visible"></use>
      </svg>
      <span
        v-if="customPlaceholder && !v.required"
        class="BaseInput-Placeholder"
        :class="`${blockClass}-Placeholder`"
      >
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
    toggleVisibility: {
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
  data() {
    return {
      passwordVisible: false,
    };
  },
  computed: {
    type() {
      if (this.passwordVisible) return 'text';
      return this.inputType;
    },
  },
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
    width: 100%;

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

  &-Visible, &-Icon {
    position: absolute;
    z-index: 2;
  }
}
</style>
