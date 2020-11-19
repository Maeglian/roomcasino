<template>
  <div class="Modal">
    <div class="Close Modal-Close" @click="$emit('close')"></div>
    <div class="AuthDialog">
      <div class="Tabs AuthDialog-Tabs">
        <a
          class="Tabs-Tab AuthDialog-Tab"
          :class="{'Tabs-Tab--active': isRegistration }"
          @click="toggleRegistration()"
        >
          Sign up
        </a>
        <a
          class="Tabs-Tab AuthDialog-Tab"
          :class="{'Tabs-Tab--active': !isRegistration }"
          @click="toggleRegistration('login')"
        >
          Login
        </a>
      </div>
      <template v-if="isRegistration">
        <RegistrationForm
          @close="$emit('close')"
          @redirectLogin="isRegistration = false"
        />
      </template>
      <template v-else>
        <LoginForm @close="$emit('close')" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

const RegistrationForm = () => import('@/components/homepage/RegistrationForm.vue');
const LoginForm = () => import('@/components/homepage/LoginForm.vue');

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
  methods: {
    ...mapMutations(['removeAuthError']),

    toggleRegistration(type) {
      this.removeAuthError();
      if (type === 'login') this.isRegistration = false;
      else this.isRegistration = true;
    },
  },
  mounted() {
    if (this.authType === 'login') this.isRegistration = false;
  },
};
</script>

<style lang="scss">
.AuthDialog {
  position: relative;
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
    position: relative;
    flex-grow: 1;
    padding-right: 14px;
    padding-bottom: 25px;
    padding-left: 14px;
    background: url('../../assets/img/auth-bg.png');

    @media(min-width: $screen-s) {
      padding-right: 24px;
      padding-left: 24px;
    }
  }

  &-Fields {
    position: relative;
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

  &-Error {
    position: absolute;
    top: -13px;
    left: 0;
    margin-bottom: 5px;
    font-size: 10px;
    color: var(--color-error);

    &--registration {
      top: initial;
      left: 14px;
      bottom: 5px;
      font-size: 12px;

      @media(min-width: $screen-s) {
        left: 24px;
      }
    }

    &--login {
      top: initial;
      bottom: 5px;
      font-size: 12px;
    }
  }
}
</style>
