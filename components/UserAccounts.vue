<template>
  <div class="UserAccounts">
    <div class="UserAccounts-UserFullname">
      {{ getFullUserName }}
    </div>
    <AttachedPopup v-model="isOpenPopup" @close-popup="closePopup">
      <div slot="trigger" class="UserAccounts-Balance" @click="togglePopup">
        <span class="UserAccounts-Value">{{ balance ? balance : activeAccount.balance }}</span>
        <span class="UserAccounts-Currency">{{
          currency ? currency : activeAccount.currency
        }}</span>
        <i
          class="UserAccounts-Balance--arrow Nav-Arrow ThinArrow"
          :class="{ 'Nav-Arrow--Active': isOpenPopup }"
        />
      </div>
      <ul class="UserAccounts-Popup">
        <li
          v-for="({ balance, currency }, idx) in user.accountList"
          :key="idx"
          class="UserAccounts-PopupItem"
          @click="selectCurrencyAccount({ balance, currency })"
        >
          {{ balance }}
          {{ currency }}
        </li>
      </ul>
    </AttachedPopup>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'UserAccounts',
  data: () => ({
    balance: null,
    currency: null,
    isOpenPopup: false,
  }),
  computed: {
    ...mapState(['user']),
    ...mapGetters(['activeAccount', 'isLoggedIn']),
    getFullUserName() {
      const { firstName, lastName } = this.user;
      return `${firstName} ${lastName}`;
    },
  },
  methods: {
    togglePopup() {
      this.isOpenPopup = !this.isOpenPopup;
    },
    closePopup() {
      this.isOpenPopup = false;
    },
    selectCurrencyAccount({ balance, currency }) {
      this.balance = balance;
      this.currency = currency;
      this.closePopup();
    },
  },
};
</script>

<style lang="scss">
.UserAccounts {
  &-UserFullname {
    margin-right: 20px;
    font-size: 10px;
    color: var(--color-text-main);
  }

  &-Popup {
    overflow: hidden;
    color: var(--color-text-main);
  }

  &-PopupItem {
    padding: 16px 13px;
    font-size: 12px;
    background: var(--color-bg);
    border-bottom: 4px solid var(--color-body);
    cursor: pointer;
    transition: 0.2s all;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      color: var(--color-main1);
    }
  }

  &-Balance {
    display: flex;
    align-items: center;
    font-size: 10px;
    cursor: pointer;

    &--arrow {
      transform: rotate(45deg) translateY(-40%);
    }
  }

  &-Value {
    color: var(--color-text-main);
  }

  &-Currency {
    margin-left: 3px;
    color: var(--color-text-ghost);
  }
}

.Nav-Arrow {
  transition: 0.2s all;

  &--Active {
    transform: rotate(225deg);
  }
}
</style>
