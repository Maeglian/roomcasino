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
import { mapActions, mapGetters, mapState } from 'vuex';

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
    ...mapActions(['setActiveAccount']),
    togglePopup() {
      this.isOpenPopup = !this.isOpenPopup;
    },
    closePopup() {
      this.isOpenPopup = false;
    },
    selectCurrencyAccount({ balance, currency }) {
      this.balance = balance;
      this.currency = currency;
      this.setActiveAccount({ currency }).then(() => {
        this.closePopup();
      });
    },
  },
};
</script>

<style lang="scss">
.UserAccounts {
  &-UserFullname {
    font-size: 10px;
    text-align: right;
    color: var(--color-text-main);
  }

  &-Popup {
    overflow: hidden;
    color: var(--color-text-main);
  }

  &-PopupItem {
    padding: 16px 13px;
    font-size: 12px;
    white-space: nowrap;
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
    justify-content: flex-end;
    align-items: center;
    font-size: 10px;
    cursor: pointer;

    &--arrow {
      transform: rotate(45deg) translateY(-40%);
    }
  }

  &-Value {
    color: var(--color-main1);
  }

  &-Currency {
    margin-left: 3px;
    color: var(--color-main1);
  }
}

.Nav-Arrow {
  transition: 0.2s all;

  &--Active {
    transform: rotate(225deg);
  }
}
</style>
