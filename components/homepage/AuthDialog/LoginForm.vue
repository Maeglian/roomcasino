<template>
  <form class="AuthDialog-Login AuthDialog-Form" @submit.prevent="onSubmitForm">
    <div class="AuthDialog-Content">
      <div class="AuthDialog-Title AuthDialog-LoginTitle">Welcome back</div>
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
          <NuxtLink to="/passwordRestore" class="AuthDialog-Link" @click.native="$emit('close')">
            Forgot Password?
          </NuxtLink>
        </div>
        <div v-if="authError" class="AuthDialog-Error AuthDialog-Error--login">
          {{ authError }}
        </div>
      </div>
    </div>
    <BaseButton
      class="BaseButton--full AuthDialog-Btn"
      :is-loading="authStatus === 'loading'"
      :disabled="$v.$error"
    >
      Login
    </BaseButton>
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
    ...mapState(['authError', 'authStatus']),
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
        this.$router.push('/');
        if (!this.authError) {
          this.$emit('close');
          scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import 'AuthDialog.scss';
</style>
