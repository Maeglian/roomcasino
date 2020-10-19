<template>
<div class="AuthDialog-Login AuthDialog-Form">
  <div class="AuthDialog-Content">
    <div class="AuthDialog-Title AuthDialog-LoginTitle">
      Welcome back
    </div>
    <BaseInput
      v-for="field in fields"
      :key="field.name"
      blockClass="AuthDialog"
      :inputType="field.type"
      :placeholder="field.placeholder"
      :value="field.value"
    />
    <div class="AuthDialog-Link">
      <a href="#" class="AuthDialog-Link">Forgot Password?</a>
    </div>
  </div>
  <button type="submit" class="Btn Btn--full AuthDialog-Btn">
    Login
  </button>
</div>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue';

export default {
  name: 'LoginForm',
  components: {
    BaseInput,
  },
  data() {
    return {
      fields: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.AuthDialog {
  &-LoginTitle {
    margin-top: 34px;
    margin-bottom: 28px;
    text-align: center;

    @media(min-width: $screen-m) {
      margin-top: 48px;
      margin-bottom: 42px;
    }
  }

  &-Link {
    margin-top: 16px;
    font-size: 12px;
    color: var(--color-main1);
    text-align: right;

    @media(min-width: $screen-m) {
      margin-top: 24px;
    }
  }
}
</style>
