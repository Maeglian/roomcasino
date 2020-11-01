<template>
<div class="AuthDialog-Login AuthDialog-Form">
  <div class="AuthDialog-Content">
    <div class="AuthDialog-Title AuthDialog-LoginTitle">
      Welcome back
    </div>
    <BaseInput
      v-for="(field, name) in fields"
      :key="name"
      blockClass="AuthDialog"
      :inputType="field.type"
      :placeholder="field.placeholder"
      v-model="field.value"
      :v="$v.fields[name].value"

    />
    <div v-if="authError" class="AuthDialog-Error">
      {{ authError }}
    </div>
    <div class="AuthDialog-Link">
      <a href="#" class="AuthDialog-Link">Forgot Password?</a>
    </div>
  </div>
  <button
    type="submit"
    class="Btn Btn--full AuthDialog-Btn"
    :disabled="$v.fields.$error"
    @click="onClickLoginBtn()"
  >
    Login
  </button>
</div>
</template>

<script>
import BaseInput from '@/components/base/BaseInput.vue';
import { email, required } from 'vuelidate/lib/validators';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LoginForm',
  components: {
    BaseInput,
  },
  data() {
    return {
      fields: {
        email: {
          value: '',
          type: 'email',
          placeholder: 'Enter your email',
        },
        password: {
          value: '',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
    };
  },
  validations: {
    fields: {
      email: { value: { required, email } },
      password: { value: { required } },
    },
  },
  computed: {
    ...mapState(['authError']),
  },
  methods: {
    ...mapActions(['authorize']),
    onClickLoginBtn() {
      const payload = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.fields) {
        if (this.fields[key].value) payload[key] = this.fields[key].value;
      }
      this.authorize(payload).then(() => {
        if (!this.authError) this.$emit('close');
      });
    },
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
