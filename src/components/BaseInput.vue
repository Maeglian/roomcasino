<template>
  <div class="BaseInput">
    <div
      v-if="$v.val.$error"
      class="BaseInput-Error"
      :class="`${blockClass}-Error`"
    >
      Can't be blank
    </div>
    <input
      :class="[
        'BaseInput-Input',
        `${blockClass}-Field`,
        `${blockClass}-Input`,
        {'BaseInput-Input--error': $v.val.$error}
        ]"
      :type="inputType"
      :value="value"
      :placeholder="placeholder"
      @input="onInput($event)"
    />
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
  },
  mixins: [inputValidation],
};
</script>

<style lang="scss">
.BaseInput {
  &-Input {
    &.BaseInput-Input--error {
      border: 2px solid rgba(235, 28, 42, 0.3);
    }
  }

  &-Error {
    margin-bottom: 5px;
    font-size: 10px;
    color: var(--color-error);
  }
}
</style>
