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
      <form class="ProfilePage-Password">
        <div class="CabinetPage-Header">
          Password change
        </div>
        <BaseInput
          v-model="oldPassword"
          class="ProfilePage-Row"
          input-type="password"
          input-class="ProfilePage-Field ProfilePage-Input ProfilePage-Input--withIcon"
          :v="$v.oldPassword"
          placeholder="Old password"
          icon="password"
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
          input-class="ProfilePage-Field ProfilePage-Input ProfilePage-Input--withIcon"
          :v="$v.newPassword.value"
          placeholder="New password"
          icon="password"
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
          input-class="ProfilePage-Field ProfilePage-Input ProfilePage-Input--withIcon"
          :v="$v.confirmPassword.value"
          placeholder="Password confirm"
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
        <button type="submit" class="Btn Btn--full ProfilePage-Btn">Update</button>
      </form>
    </div>
    <CabinetTable
      title="Session History"
      :rows="rowsInPage"
      :pagination="{
        enabled: true,
        currentPage: currentPage,
        totalPages: totalPages,
        count: rows.length,
      }"
      @change-page="currentPage = $event"
      @show-more="rowsPerPage *= 2"
    />
  </div>
</template>

<script>
import tablePagination from '@/mixins/tablePagination';
import CabinetTable from '@/components/cabinet/CabinetTable.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import { required, sameAs } from 'vuelidate/lib/validators';

const rows = [
  ['10 Jun 2020, 16:33:48', '213.131.10.121', 'DE', 'Macintosh; Intel Mac OS X 10_14_6', 'Current'],
  ['10 Jun 2020, 16:33:48', '213.131.10.121', 'DE', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '20.131.10.20', 'UA', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '213.131.10.121', 'DE', 'Macintosh; Intel Mac OS X 10_14_6', 'Current'],
  ['10 Jun 2020, 16:33:48', '213.131.10.121', 'DE', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '20.131.10.20', 'UA', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '213.131.10.121', 'DE', 'Macintosh; Intel Mac OS X 10_14_6', 'Current'],
  ['10 Jun 2020, 16:33:48', '213.131.10.121', 'DE', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '20.131.10.20', 'UA', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
  ['10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed'],
];

export default {
  name: 'ProfileSecurity',
  components: {
    CabinetTable,
    BaseInput,
  },
  mixins: [tablePagination],
  data() {
    return {
      rows,
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
    };
  },
  validations: {
    oldPassword: {
      required,
    },
    newPassword: {
      value: {
        required,
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
  methods: {
    toggleVisibility(el) {
      console.log(el);
      this[el].inputType === 'password'
        ? (this[el].inputType = 'text')
        : (this[el].inputType = 'password');
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
    margin-bottom: 4px;
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
    color: var(--color-text-main);
    background: var(--color-bg);
    border: none;

    &::placeholder {
      font-size: 10px;
      font-weight: 700;
      line-height: 55px;
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
}
</style>
