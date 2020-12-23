<template>
  <div class="GamePanel">
    <template v-if="isLoggedIn">
      <NuxtLink
        v-if="Object.keys(this.user).length"
        to="/cabinet/balance"
        class="GamePanel-UserFullname"
      >
        {{ getFullUserName }}
      </NuxtLink>
      <button class="Btn AuthSection-Btn AuthSection-Btn--deposit" @click="$modal.show('cashier')">
        Deposit
      </button>
    </template>
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
import { mapState } from 'vuex';

export default {
  name: 'GamePanel',
  mixins: [showAuthDialog],
  computed: {
    ...mapState(['user']),
    getFullUserName() {
      const { firstName, lastName } = this.user;
      return `${firstName} ${lastName}`;
    },
  },
};
</script>

<style lang="scss">
.GamePanel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-weight: bold;
  text-transform: uppercase;

  &-UserFullname {
    display: none;
    font-size: 10px;
    color: var(--color-text-main);

    @media (min-width: $screen-s) {
      display: block;
      margin-right: 20px;
    }

    @media (min-width: $screen-m) {
      margin-right: 36px;
    }
  }
}
</style>
