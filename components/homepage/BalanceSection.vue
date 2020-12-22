<template>
  <div class="BalanceSection">
    <UserAccounts class="BalanceSection-UserAccounts" />
    <button
      v-if="isLoggedIn"
      class="Btn AuthSection-Btn AuthSection-Btn--deposit"
      @click="$modal.show('cashier')"
    >
      Deposit
    </button>
    <div v-else class="AuthSection-Login">
      <button
        class="Btn AuthSection-Btn AuthSection-Btn--login"
        @click="showRegistrationDialog('login')"
      >
        Login
      </button>
      <button class="Btn AuthSection-Btn" @click="showRegistrationDialog('registration')">
        Register
      </button>
    </div>
  </div>
</template>

<script>
import showAuthDialog from '@/mixins/showAuthDialog';
import UserAccounts from '@/components/UserAccounts';

export default {
  components: {
    UserAccounts,
  },
  mixins: [showAuthDialog],
};
</script>

<style lang="scss">
.BalanceSection {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-weight: bold;
  text-transform: uppercase;

  &-UserAccounts {
    display: flex;
    align-items: center;
    margin-right: 36px;
  }

  .UserAccounts-UserFullname {
    display: none;

    @media (min-width: $screen-s) {
      display: block;
    }
  }
}
</style>
