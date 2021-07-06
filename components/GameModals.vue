<template>
  <div>
    <BaseModal
      v-if="gameError"
      name="gameError"
      :width="300"
      :height="'auto'"
      show-on-mount
      @close="setGameError('')"
    >
      <div class="Modal-Title">{{ $t('modals.cantStart') }}</div>
      <div class="Modal-Text">
        {{ gameError }}
      </div>
    </BaseModal>
    <BaseModal
      v-if="depositModalParams"
      name="pleaseDeposit"
      :width="300"
      :height="'auto'"
      show-on-mount
      @close="onCloseDepositModal"
    >
      <div class="Modal-Title">{{ $t('modals.pleaseDeposit') }}</div>
      <div class="Modal-Text">{{ $t('modals.pleaseDepositText') }}</div>
    </BaseModal>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import BaseModal from '@/components/base/BaseModal';

export default {
  name: 'GameModals',
  components: {
    BaseModal,
  },
  computed: {
    ...mapState(['depositModalParams']),
    ...mapState('games', ['gameError']),
    ...mapState('profile', ['freeSpinList']),
    ...mapGetters(['isLoggedIn', 'activeAccount', 'userInfo']),
  },
  methods: {
    ...mapMutations('games', ['setGameError']),
    ...mapMutations(['setDepositModalParams']),
    onCloseDepositModal() {
      const gameParams = this.depositModalParams;
      this.setDepositModalParams(null);
      this.$modal.show('cashier', { gameParams });
    },
  },
};
</script>

<style scoped></style>
