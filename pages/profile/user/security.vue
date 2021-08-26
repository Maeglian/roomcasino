<template>
  <div class="ProfilePage-Content">
    <div class="ProfilePage-Auth">
      <!--      <div class="ProfilePage-Qr">-->
      <!--        <div class="CabinetPage-Header">-->
      <!--          Two - factor authentication-->
      <!--        </div>-->
      <!--        <div class="ProfilePage-QrContent">-->
      <!--          <img class="ProfilePage-Code" src="@/assets/img/qr.png" />-->
      <!--          <div class="ProfilePage-Text">-->
      <!--            Install a code-generating app such as Google Authenticator or Authy on your phone.<br />-->
      <!--            Scan the QR code. Enter the received code below.-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <form class="ProfilePage-QrForm">-->
      <!--          <input-->
      <!--            v-model="qrCode"-->
      <!--            class="ProfilePage-Input"-->
      <!--            type="text"-->
      <!--            placeholder="Type it here"-->
      <!--          />-->
      <!--          <button type="submit" class="ProfilePage-Send">Send</button>-->
      <!--        </form>-->
      <!--      </div>-->
      <form class="CabinetForm ProfilePage-Password" @submit.prevent="onSubmitPasswordForm">
        <div class="CabinetPage-Header">{{ $t('profile.user.passwordChange') }}</div>
        <BaseInput
          v-model="oldPassword"
          class="ProfilePage-Row"
          input-type="password"
          error-class="CabinetForm-Error"
          input-class="ProfilePage-Field ProfilePage-Input ProfilePage-Input--withIcon"
          :v="$v.oldPassword"
          :placeholder="$t('profile.user.oldPassword')"
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
          :placeholder="$t('profile.user.newPassword')"
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
          :placeholder="$t('profile.user.confirmPassword')"
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
          class="Btn Btn--full Btn--darkColor Btn--bottomCorners ProfilePage-Btn"
          :is-loading="profileIsUpdating"
        >
          {{ $t('buttons.update') }}
        </BaseButton>
      </form>
    </div>
    <CabinetTable
      :title="$t('profile.user.sessionHistory')"
      :cols="sessionHistoryCols"
      :rows="sessionHistoryList"
      :show-more-btn="pageRowsCount > limit && !needsPagination"
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
import CabinetTable from '@/components/profile/CabinetTable.vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import { required, sameAs, not } from 'vuelidate/lib/validators';
import BaseInput from '@/components/base/BaseInput';
import BaseButton from '@/components/base/BaseButton';

export default {
  name: 'ProfileSecurity',
  components: {
    CabinetTable,
    BaseInput,
    BaseButton,
  },
  beforeRouteLeave(from, to, next) {
    if (this.updateProfileError) this.setUpdateProfileError('');
    next();
  },
  data() {
    return {
      maxRowsPerPage: 12,
      limit: 6,
      currentPage: 1,
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
      sessionHistoryCols: [
        {
          label: 'Started at',
          field: 'startedAt',
        },
        {
          label: 'Ip',
          field: 'clientIp',
        },
        {
          label: 'Country',
          field: 'country',
        },
        {
          label: 'User Agent',
          field: 'userAgent',
        },
        {
          label: 'Closed At',
          field: 'closedAt',
          colClasses(x) {
            return x ? 'CabinetTable-Cell--disabled' : 'CabinetTable-Cell--success';
          },
          format(x) {
            return x ? 'Closed' : 'Current';
          },
        },
      ],
    };
  },
  computed: {
    ...mapState('profile', [
      'profileIsUpdating',
      'updateProfileError',
      'sessionHistoryList',
      'historyListIsLoading',
      'pageRowsCount',
    ]),
    offset() {
      return (this.currentPage - 1) * this.limit;
    },
    needsPagination() {
      return this.sessionHistoryList.length >= this.maxRowsPerPage || this.currentPage > 1;
    },
    totalPages() {
      return Math.ceil(this.pageRowsCount / this.limit);
    },
  },
  watch: {
    currentPage() {
      this.getData();
    },
  },
  validations: {
    oldPassword: { required },
    newPassword: {
      value: {
        required,
        sameAsPassword: not(
          sameAs(function() {
            return this.oldPassword;
          }),
        ),
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
    this.getData();
  },
  methods: {
    ...mapMutations(['pushNotificationAlert']),
    ...mapMutations('profile', ['setUpdateProfileError']),
    ...mapActions('profile', ['updatePassword', 'getSessionHistoryList']),
    getData() {
      this.getSessionHistoryList({ limit: this.limit, offset: this.offset });
    },
    toggleVisibility(el) {
      this[el].inputType === 'password'
        ? (this[el].inputType = 'text')
        : (this[el].inputType = 'password');
    },
    onSubmitPasswordForm() {
      if (this.updateProfileError) this.setUpdateProfileError('');
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
            text: this.$t('profile.user.passwordUpdateSuccess'),
          });
        }
      });
    },
    onShowMoreSessionHistory() {
      this.limit += this.limit;
      this.getData();
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
