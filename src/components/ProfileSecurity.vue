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
            Install a code-generating app such as Google Authenticator or Authy on your phone.<br/>
            Scan the QR code. Enter the received code below.
          </div>
        </div>
        <form class="ProfilePage-QrForm">
          <input class="ProfilePage-Input" type="text" placeholder="Type it here" v-model="qrCode"/>
          <button type="submit" class="ProfilePage-Send">Send</button>
        </form>
      </div>
      <form class="ProfilePage-Password">
        <div class="CabinetPage-Header">
          Password change
        </div>
        <BaseInput
          class="ProfilePage-Row"
          blockClass="ProfilePage"
          inputType="password"
          v-model="oldPassword"
          :v="$v.oldPassword"
          placeholder="Old password"
          icon="password"
        />
        <BaseInput
          class="ProfilePage-Row"
          blockClass="ProfilePage"
          inputType="password"
          v-model="newPassword"
          :v="$v.newPassword"
          placeholder="New password"
          :toggleVisibility="true"
          icon="password"
        />
        <BaseInput
          class="ProfilePage-Row"
          blockClass="ProfilePage"
          inputType="password"
          v-model="confirmPassword"
          :v="$v.confirmPassword"
          placeholder="Password confirm"
          :toggleVisibility="true"
          icon="password"
        />
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
      @changePage="currentPage = $event"
      @showMore="rowsPerPage *= 2"
    />
  </div>
</template>

<script>
import tablePagination from '@/mixins/tablePagination';
import CabinetTable from '@/components/CabinetTable.vue';
import BaseInput from '@/components/BaseInput.vue';
import { required, sameAs } from 'vuelidate/lib/validators';

const rows = [
  [
    '10 Jun 2020, 16:33:48', '213.131.10.121', 'DE', 'Macintosh; Intel Mac OS X 10_14_6', 'Current',
  ],
  [
    '10 Jun 2020, 16:33:48', '213.131.10.121', 'DE', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '20.131.10.20', 'UA', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '213.131.10.121', 'DE', 'Macintosh; Intel Mac OS X 10_14_6', 'Current',
  ],
  [
    '10 Jun 2020, 16:33:48', '213.131.10.121', 'DE', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '20.131.10.20', 'UA', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '213.131.10.121', 'DE', 'Macintosh; Intel Mac OS X 10_14_6', 'Current',
  ],
  [
    '10 Jun 2020, 16:33:48', '213.131.10.121', 'DE', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '20.131.10.20', 'UA', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
  [
    '10 Jun 2020, 16:33:48', '20.131.10.20', 'FI', 'Macintosh; Intel Mac OS X 10_14_6', 'Closed',
  ],
];

export default {
  name: 'ProfileSecurity',
  mixins: [tablePagination],
  components: {
    CabinetTable,
    BaseInput,
  },
  data() {
    return {
      rows,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      qrCode: '',
    };
  },
  validations: {
    oldPassword: {
      required,
    },
    newPassword: {
      required,
    },
    confirmPassword: {
      sameAsPassword: sameAs('newPassword'),
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
    flex-grow: 1;
    display: flex;
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
    text-transform: uppercase;
    color: var(--color-text-main);
    background: var(--color-bg-lighter);
  }

  &-Visible {
    right: 22px;
    top: calc(50% - 5.5px);
    width: 19px;
    height: 11px;
    cursor: pointer;
    fill: var(--color-text-ghost);

    &--isVisible {
      fill: var(--color-main1);
    }
  }

  &-Icon--password {
    left: 16px;
    top: calc(50% - 8px);
    width: 13px;
    height: 16px;
  }
}

</style>
