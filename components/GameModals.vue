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
      v-if="showDepositModal"
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
    ...mapState(['showDepositModal']),
    ...mapState('games', ['gameError']),
    ...mapState('profile', ['freeSpinList']),
    ...mapGetters(['isLoggedIn', 'activeAccount', 'userInfo']),
  },
  methods: {
    ...mapMutations('games', ['setGameError']),
    ...mapMutations(['toggleDepositModal']),
    onCloseDepositModal() {
      this.toggleDepositModal(false);
      this.$modal.show('cashier');
    },
  },
};
</script>

<style scoped></style>
