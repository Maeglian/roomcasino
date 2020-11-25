<template>
  <form class="AuthDialog-Login AuthDialog-Form" @submit.prevent="onSubmitForm">
    <div class="AuthDialog-Content">
      <div class="AuthDialog-Title AuthDialog-LoginTitle">
        Welcome back
      </div>
      <div class="AuthDialog-Fields">
        <BaseInput
          v-for="(field, name) in fields"
          :key="name"
          v-model="field.value"
          class="AuthDialog-Row"
          error-class="AuthDialog-Error"
          :input-type="field.type"
          input-class="AuthDialog-Field AuthDialog-Input"
          :placeholder="field.placeholder"
          :v="$v.fields[name].value"
        />
        <div class="AuthDialog-Link">
          <a href="#" class="AuthDialog-Link">Forgot Password?</a>
        </div>
        <div v-if="authError" class="AuthDialog-Error AuthDialog-Error--login">
          {{ authError }}
        </div>
      </div>
    </div>
    <button type="submit" class="Btn Btn--full AuthDialog-Btn" :disabled="$v.fields.$error">
      Login
    </button>
  </form>
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
    onSubmitForm() {
      this.$v.fields.$touch();
      if (this.$v.fields.$error) return;
      const payload = {};
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

    @media (min-width: $screen-m) {
      margin-top: 48px;
      margin-bottom: 42px;
    }
  }

  &-Link {
    margin-top: 24px;
    font-size: 12px;
    text-align: right;
    color: var(--color-main1);

    @media (min-width: $screen-m) {
      margin-top: 24px;
    }
  }
}
</style>
