<template>
  <div class="AuthDialog">
    <div class="Tabs AuthDialog-Tabs">
      <a
        class="Tabs-Tab AuthDialog-Tab"
        :class="{'Tabs-Tab--active': isRegistration }"
        @click="isRegistration = true"
      >
        Sign up
      </a>
      <a
        class="Tabs-Tab AuthDialog-Tab"
        :class="{'Tabs-Tab--active': !isRegistration }"
        @click="isRegistration = false"
      >
        Login
      </a>
    </div>
    <template v-if="isRegistration">
      <RegistrationForm />
    </template>
    <template v-else>
      <LoginForm />
    </template>
  </div>
</template>

<script>
const RegistrationForm = () => import('@/components/RegistrationForm.vue');
const LoginForm = () => import('@/components/LoginForm.vue');

export default {
  name: 'AuthDialog',
  props: {
    authType: {
      type: String,
      isRequired: false,
      default: 'registration',
    },
  },
  components: {
    LoginForm,
    RegistrationForm,
  },
  data() {
    return {
      isRegistration: true,
    };
  },
  mounted() {
    console.log(this.props);
    if (this.authType === 'login') this.isRegistration = false;
  },
};
</script>

<style lang="scss">
.AuthDialog {
  display: flex;
  flex-direction: column;
  min-height: 585px;
  background: var(--color-body);

  &-Tabs {
    margin-bottom: 4px;
  }

  &-Tab {
    flex-grow: 1;
    font-size: 12px;
    text-transform: uppercase;

    &:after {
      width: 78px;
    }
  }

  &-Form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &-Title {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
    text-transform: uppercase;
    color: var(--color-text-main);
  }

  &-Subtitle {
    margin-top: 10px;
    font-size: 17px;
    font-weight: 700;
    line-height: 1.2;
    text-transform: uppercase;
    color: var(--color-text-main);
  }

  &-Content {
    flex-grow: 1;
    padding-right: 14px;
    padding-bottom: 25px;
    padding-left: 14px;
    background: url('./../assets/img/auth-bg.png');

    @media(min-width: $screen-s) {
      padding-right: 24px;
      padding-left: 24px;
    }
  }

  &-Text {
    margin-top: 16px;
    margin-bottom: 12px;
    font-size: 14px;
    color: var(--color-text-ghost);
  }

  &-Btn {
    margin-top: auto;
  }
}
</style>
