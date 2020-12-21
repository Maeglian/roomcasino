<template>
  <div class="ProfilePage-Content">
    <div class="ProfilePage-Auth">
      <div class="ProfilePage-Qr">
        <div class="CabinetPage-Header">
          Two - factor authentication
        </div>
        <div class="ProfilePage-QrContent">
          <img class="ProfilePage-Code" src="@/assets/img/qr.png" />
          <div class="ProfilePage-Text">
            Install a code-generating app such as Google Authenticator or Authy on your phone.<br />
            Scan the QR code. Enter the received code below.
          </div>
        </div>
        <form class="ProfilePage-QrForm">
          <input
            v-model="qrCode"
            class="ProfilePage-Input"
            type="text"
            placeholder="Type it here"
          />
          <button type="submit" class="ProfilePage-Send">Send</button>
        </form>
      </div>
      <form class="CabinetForm ProfilePage-Password" @submit.prevent="onSubmitPasswordForm">
        <div class="CabinetPage-Header">
          Password change
        </div>
        <BaseInput
          v-model="oldPassword"
          class="ProfilePage-Row"
          input-type="password"
          error-class="CabinetForm-Error"
          input-class="ProfilePage-Field ProfilePage-Input ProfilePage-Input--withIcon"
          :v="$v.oldPassword"
          placeholder="Old password"
          icon="password"
          :should-display-validation="shouldDisplayPasswordFormErrors"
        >
          <template #beforeInput-absolute>
            <svg class="ProfilePage-Icon ProfilePage-Icon--password">
              <use xlink:href="@/assets/img/icons.svg#password"></use>
            </svg>
          </template>
        </BaseInput>
        <BaseInput
          v-model="newPassword.value"
          class="ProfilePage-Row"
          block-class="ProfilePage"
          :input-type="newPassword.inputType"
          error-class="CabinetForm-Error"
          input-class="ProfilePage-Field ProfilePage-Input ProfilePage-Input--withIcon"
          :v="$v.newPassword.value"
          placeholder="New password"
          icon="password"
          :should-display-validation="shouldDisplayPasswordFormErrors"
        >
          <template #beforeInput-absolute>
            <svg class="ProfilePage-Icon ProfilePage-Icon--password">
              <use xlink:href="@/assets/img/icons.svg#password"></use>
            </svg>
          </template>
          <template #afterInput-absolute>
            <svg
              class="BaseInput-Visible ProfilePage-Visible"
              :class="{ 'ProfilePage-Visible--isVisible': newPassword.inputType === 'text' }"
              @click="toggleVisibility('newPassword')"
            >
              <use xlink:href="@/assets/img/icons.svg#visible"></use>
            </svg>
          </template>
        </BaseInput>
        <BaseInput
          v-model="confirmPassword.value"
          class="ProfilePage-Row"
          block-class="ProfilePage"
          :input-type="confirmPassword.inputType"
          error-class="CabinetForm-Error"
          input-class="ProfilePage-Field ProfilePage-Input ProfilePage-Input--withIcon"
          :v="$v.confirmPassword.value"
          placeholder="Password confirm"
          :should-display-validation="shouldDisplayPasswordFormErrors"
        >
          <template #beforeInput-absolute>
            <svg class="ProfilePage-Icon ProfilePage-Icon--password">
              <use xlink:href="@/assets/img/icons.svg#password"></use>
            </svg>
          </template>
          <template #afterInput-absolute>
            <svg
              class="ProfilePage-Visible"
              :class="{ 'ProfilePage-Visible--isVisible': confirmPassword.inputType === 'text' }"
              @click="toggleVisibility('confirmPassword')"
            >
              <use xlink:href="@/assets/img/icons.svg#visible"></use>
            </svg>
          </template>
        </BaseInput>
        <div v-if="updateProfileError" class="Error ProfilePage-Error">
          {{ updateProfileError }}
        </div>
        <BaseButton
          class="Btn Btn--full Btn--darkColor ProfilePage-Btn"
          :is-loading="profileIsUpdating"
        >
          Update
        </BaseButton>
      </form>
    </div>
    <CabinetTable
      title="Session History"
      :cols="sessionHistoryCols"
      :rows="rowsInPage"
      :show-more-btn="sessionHistoryList.length > rowsPerPage && !needsPagination"
      :loading="historyListIsLoading"
      :pagination="{
        enabled: needsPagination,
        currentPage: currentPage,
        totalPages: totalPages,
        count: sessionHistoryList.length,
      }"
      @change-page="currentPage = $event"
      @show-more="onShowMoreSessionHistory"
    />
  </div>
</template>

<script>
import CabinetTable from '@/components/cabinet/CabinetTable.vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import { required, sameAs } from 'vuelidate/lib/validators';
import { HISTORY_TABLES } from '@/config';
import { passwordCheck } from '@/utils/formCheckers';
import BaseInput from '@/components/base/BaseInput';
import BaseButton from '@/components/base/BaseButton';

export default {
  name: 'ProfileSecurity',
  components: {
    CabinetTable,
    BaseInput,
    BaseButton,
  },
  middleware: 'clearUpdateProfileError',
  data() {
    return {
      oldPassword: '',
      newPassword: {
        value: '',
        inputType: 'password',
      },
      confirmPassword: {
        value: '',
        inputType: 'password',
      },
      qrCode: '',
      shouldDisplayPasswordFormErrors: false,
      sessionHistoryCols: HISTORY_TABLES.session.cols,
      rowsPerPage: 6,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState([
      'profileIsUpdating',
      'updateProfileError',
      'sessionHistoryList',
      'historyListIsLoading',
    ]),
    needsPagination() {
      return this.rowsPerPage >= 12;
    },
    rowsInPage() {
      const start = this.rowsPerPage * (this.currentPage - 1);
      const end = start + this.rowsPerPage;

      return this.sessionHistoryList.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sessionHistoryList.length / this.rowsPerPage);
    },
  },
  validations: {
    oldPassword: { required },
    newPassword: {
      value: {
        required,
        passwordCheck,
      },
    },
    confirmPassword: {
      value: {
        sameAsPassword: sameAs(function() {
          return this.newPassword.value;
        }),
      },
    },
  },
  created() {
    this.getSessionHistoryList();
  },
  methods: {
    ...mapMutations(['clearUpdateProfileError', 'pushNotificationAlert']),
    ...mapActions(['updatePassword', 'getSessionHistoryList']),
    toggleVisibility(el) {
      this[el].inputType === 'password'
        ? (this[el].inputType = 'text')
        : (this[el].inputType = 'password');
    },
    onSubmitPasswordForm() {
      this.clearUpdateProfileError();
      if (this.$v.$invalid) {
        this.shouldDisplayPasswordFormErrors = true;
        this.$v.$touch();
        return;
      }
      this.updatePassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword.value,
        confirmPassword: this.confirmPassword.value,
      }).then(() => {
        if (!this.updateProfileError) {
          this.oldPassword = '';
          this.newPassword.value = '';
          this.confirmPassword.value = '';
          this.$v.$reset();
          this.shouldDisplayPasswordFormErrors = false;
          this.pushNotificationAlert({
            type: 'success',
            text: 'Your password was successfully changed!',
          });
        }
      });
    },
    onShowMoreSessionHistory() {
      this.rowsPerPage += this.rowsPerPage;
    },
  },
};
</script>

<style lang="scss">
.ProfilePage {
  &-Auth {
    margin-bottom: 24px;

    @media (min-width: $screen-m) {
      display: flex;
      margin-bottom: 48px;
    }
  }

  &-Qr {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    @media (min-width: $screen-m) {
      margin-right: 16px;
      margin-bottom: 0;
    }
  }

  &-QrContent {
    display: flex;
    flex-grow: 1;
    align-items: center;
    margin-bottom: 4px;
    padding: 16px;
    background: var(--color-bg);
  }

  &-Code {
    width: 94px;
    margin-right: 11px;

    @media (min-width: $screen-xl) {
      width: 141px;
      margin-right: 26px;
    }
  }

  &-Text {
    padding-right: 30px;
    font-size: 14px;
    color: var(--color-text-ghost);
  }

  &-Row {
    margin-top: 12px;

    &:last-of-type {
      margin-bottom: 12px;
    }
  }

  &-QrForm {
    display: flex;
  }

  &-Password {
    @media (min-width: $screen-m) {
      flex-shrink: 0;
      width: 400px;
    }
  }

  &-Input {
    flex-grow: 1;
    height: 55px;
    padding-right: 16px;
    padding-left: 16px;
    font-size: 16px;
    color: var(--color-text-main);
    background: var(--color-bg);
    border: none;

    @media (min-width: $screen-s) {
      font-size: 12px;
    }

    &::placeholder {
      font-size: 10px;
      font-weight: 700;
      line-height: 20px;
      color: var(--color-text-ghost);
      text-transform: uppercase;
    }

    &--withVisibility {
      padding-right: 35px;
    }

    &--withIcon {
      padding-left: 45px;
    }
  }

  &-Send {
    flex-shrink: 0;
    width: 135px;
    margin-left: 4px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;
    background: var(--color-bg-lighter);
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

  &-Error {
    font-size: 12px;
  }
}
</style>
