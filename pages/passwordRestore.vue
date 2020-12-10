<template>
  <div class="PasswordRestore">
    <div class="PasswordRestore-Content">
      <h1 class="Title Colored PasswordRestore-Title">
        Enter your new password
      </h1>
      <form class="PasswordRestore-Form" @submit.prevent="onSubmit">
        <BaseInput
          v-model="newPassword.value"
          class="AuthDialog-Row"
          :input-type="newPassword.inputType"
          error-class="AuthDialog-Error"
          input-class="AuthDialog-Field AuthDialog-Input PasswordRestore-Input--withIcon"
          :v="$v.newPassword.value"
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
              :class="{ 'PasswordRestore-Visible--isVisible': newPassword.inputType === 'text' }"
              @click="toggleVisibility('newPassword')"
            >
              <use xlink:href="@/assets/img/icons.svg#visible"></use>
            </svg>
          </template>
        </BaseInput>
        <BaseInput
          v-model="confirmPassword.value"
          class="AuthDialog-Row"
          :input-type="confirmPassword.inputType"
          error-class="AuthDialog-Error"
          input-class="AuthDialog-Field AuthDialog-Input PasswordRestore-Input--withIcon"
          :v="$v.confirmPassword.value"
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
                'PasswordRestore-Visible--isVisible': confirmPassword.inputType === 'text',
              }"
              @click="toggleVisibility('confirmPassword')"
            >
              <use xlink:href="@/assets/img/icons.svg#visible"></use>
            </svg>
          </template>
        </BaseInput>
        <BaseButton
          class="Btn--full AuthDialog-Btn PasswordRestore-Btn"
          :is-loading="profileIsUpdating"
          :disabled="$v.$error"
        >
          Update password
        </BaseButton>
        <div v-if="updateProfileError" class="Error PasswordRestore-Error">
          {{ updateProfileError }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import changePassword from '@/mixins/changePassword';
import { mapMutations } from 'vuex';

export default {
  name: 'PasswordRestore',
  mixins: [changePassword],
  layout: 'page',
  methods: {
    ...mapMutations(['clearUpdateProfileError']),
    onSubmit() {
      this.clearUpdateProfileError();
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.restorePassword({
        code: this.$route.query.code,
        newPassword: this.newPassword.value,
        confirmPassword: this.confirmPassword.value,
      });
    },
  },
};
</script>

<style lang="scss">
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

  &-Input--withIcon {
    padding-left: 45px;
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
    margin-top: 5px;
    margin-bottom: 15px;
  }
}
</style>
