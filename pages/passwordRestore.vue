<template>
  <div :key="componentKey" class="PasswordRestore">
    <template v-if="showSuccessMessage">
      <div class="PasswordRestore-Thanks Colored">
        Thanks! Check your email for further instructions.
      </div>
    </template>
    <div v-else class="PasswordRestore-Content">
      <template v-if="!$route.query.code">
        <h1 class="Title Colored PasswordRestore-Title">Enter email</h1>
        <form class="PasswordRestore-Form" @submit.prevent="onContinue">
          <BaseInput
            v-model="email"
            class="AuthDialog-Row"
            input-type="email"
            error-class="AuthDialog-Error"
            input-class="AuthDialog-Field AuthDialog-Input"
            :v="$v.email"
            placeholder="Email"
            icon="password"
          >
          </BaseInput>
          <BaseButton
            class="Btn--full Btn--common PasswordRestore-Btn"
            :is-loading="pageDataIsLoading"
            :disabled="$v.email.$error"
          >
            Continue
          </BaseButton>
          <div v-if="serverError" class="Error PasswordRestore-Error">
            {{ serverError }}
          </div>
        </form>
      </template>
      <template v-else>
        <h1 class="Title Colored PasswordRestore-Title">Enter your new password</h1>
        <form class="PasswordRestore-Form" @submit.prevent="onSubmit">
          <BaseInput
            v-model="password.newPassword.value"
            class="AuthDialog-Row"
            :input-type="password.newPassword.inputType"
            error-class="AuthDialog-Error"
            input-class="AuthDialog-Field AuthDialog-Input AuthDialog-Input--withIcon"
            :v="$v.password.newPassword.value"
            placeholder="New password"
            icon="password"
          >
            <template #beforeInput-absolute>
              <svg class="PasswordRestore-Icon PasswordRestore-Icon--password">
                <use xlink:href="@/assets/img/icons.svg#password"></use>
              </svg>
            </template>
            <template #afterInput-absolute>
              <svg
                class="BaseInput-Visible PasswordRestore-Visible"
                :class="{
                  'PasswordRestore-Visible--isVisible': password.newPassword.inputType === 'text',
                }"
                @click="toggleVisibility('newPassword')"
              >
                <use xlink:href="@/assets/img/icons.svg#visible"></use>
              </svg>
            </template>
          </BaseInput>
          <BaseInput
            v-model="password.confirmPassword.value"
            class="AuthDialog-Row"
            :input-type="password.confirmPassword.inputType"
            error-class="AuthDialog-Error"
            input-class="AuthDialog-Field AuthDialog-Input AuthDialog-Input--withIcon"
            :v="$v.password.confirmPassword.value"
            placeholder="Password confirm"
          >
            <template #beforeInput-absolute>
              <svg class="PasswordRestore-Icon PasswordRestore-Icon--password">
                <use xlink:href="@/assets/img/icons.svg#password"></use>
              </svg>
            </template>
            <template #afterInput-absolute>
              <svg
                class="PasswordRestore-Visible"
                :class="{
                  'PasswordRestore-Visible--isVisible':
                    password.confirmPassword.inputType === 'text',
                }"
                @click="toggleVisibility('confirmPassword')"
              >
                <use xlink:href="@/assets/img/icons.svg#visible"></use>
              </svg>
            </template>
          </BaseInput>
          <BaseButton
            class="Btn--full Btn--common PasswordRestore-Btn"
            :is-loading="pageDataIsLoading"
            :disabled="$v.password.$error"
          >
            Update password
          </BaseButton>
          <div v-if="serverError" class="Error PasswordRestore-Error">
            {{ serverError }}
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators';
import { mapMutations, mapState, mapActions } from 'vuex';
import BaseInput from '@/components/base/BaseInput';
import BaseButton from '@/components/base/BaseButton';
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'PasswordRestore',
  components: {
    BaseInput,
    BaseButton,
  },
  mixins: [showAuthDialog],
  beforeRouteLeave(from, to, next) {
    this.showSuccessMessage = false;
    this.clearServerError();
    next();
  },
  layout: 'page',
  data() {
    return {
      componentKey: 0,
      email: '',
      password: {
        newPassword: {
          value: '',
          inputType: 'password',
        },
        confirmPassword: {
          value: '',
          inputType: 'password',
        },
      },
      showSuccessMessage: false,
    };
  },
  computed: {
    ...mapState(['serverError', 'pageDataIsLoading']),
  },
  watch: {
    $route(oldRoute, newRoute) {
      if (oldRoute.query.code !== newRoute.query.code) {
        if (this.serverError) this.clearServerError();
        this.componentKey += 1;
      }
    },
  },
  validations: {
    email: { required, email },
    password: {
      newPassword: {
        value: {
          required,
        },
      },
      confirmPassword: {
        value: {
          sameAsPassword: sameAs(function () {
            return this.password.newPassword.value;
          }),
        },
      },
    },
  },
  methods: {
    ...mapMutations(['clearUpdateProfileError', 'clearServerError', 'pushNotificationAlert']),
    ...mapActions(['restorePassword', 'confirmRestorePassword']),
    toggleVisibility(el) {
      this.password[el].inputType === 'password'
        ? (this.password[el].inputType = 'text')
        : (this.password[el].inputType = 'password');
    },
    onContinue() {
      this.clearServerError();
      this.$v.email.$touch();
      if (this.$v.email.$invalid) return;
      this.restorePassword({ email: this.email }).then(() => {
        if (!this.serverError) this.showSuccessMessage = true;
      });
    },
    onSubmit() {
      if (this.serverError) this.clearServerError();
      this.$v.password.$touch();
      if (this.$v.password.$invalid) return;
      this.confirmRestorePassword({
        code: this.$route.query.code,
        newPassword: this.password.newPassword.value,
        confirmPassword: this.password.confirmPassword.value,
      }).then(() => {
        if (!this.serverError) {
          this.pushNotificationAlert({
            type: 'success',
            text: 'Your password was successfully updated!',
          });
          this.$router.push('/');
          this.showRegistrationDialog('login');
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/components/homepage/AuthDialog/AuthDialog.scss';

.PasswordRestore {
  &-Title {
    margin-bottom: 35px;
    font-size: 20px;
    text-align: center;

    @media (min-width: $screen-s) {
      font-size: 24px;
    }
  }

  &-Content {
    width: 300px;
    margin: 40px auto 150px;

    @media (min-width: $screen-s) {
      width: 450px;
    }
  }

  &-Form {
    margin: 0 auto;

    @media (min-width: $screen-s) {
      width: 350px;
    }
  }

  &-Icon {
    position: absolute;
    z-index: 2;
  }

  &-Icon--password {
    top: calc(50% - 8px);
    left: 16px;
    width: 13px;
    height: 16px;
  }

  &-Visible {
    position: absolute;
    top: calc(50% - 5.5px);
    right: 22px;
    z-index: 2;
    width: 19px;
    height: 11px;
    cursor: pointer;
    fill: var(--color-text-ghost);

    &--isVisible {
      fill: var(--color-main1);
    }
  }

  &-Btn {
    height: 55px;
    margin-top: 5px;
    margin-bottom: 15px;
  }

  &-Thanks {
    width: 40%;
    margin: 100px auto;
    font-size: 35px;
    font-weight: 700;
    text-align: center;
    color: var(--color-main1);
  }

  &-Field {
    width: 100%;
    height: 55px;
    background: transparent;
    border: 2px solid var(--color-border-ghost);

    &--error {
      border-color: rgba(235, 28, 42, 0.3);
    }
  }
}
</style>
