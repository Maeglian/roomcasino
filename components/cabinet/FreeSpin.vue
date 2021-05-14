<template>
  <div class="Bonus FreeSpin BonusesPage-FreeSpin">
    <div class="FreeSpin-Section FreeSpin-Section--left">
      <div class="Bonus-Text">
        {{ spin.name }}
      </div>
      <svg class="Bonus-Icon" width="14" height="14" @click="showBonusDetails(spin, 'freeSpin')">
        <use xlink:href="@/assets/img/icons.svg#info"></use>
      </svg>
    </div>
    <div class="FreeSpin-Section">
      <div class="FreeSpin-Amount">
        <svg class="BonusesPage-Icon" width="16" height="16">
          <use xlink:href="@/assets/img/icons.svg#promotions"></use>
        </svg>
        {{ spin.amount }} Free Spins
      </div>
      <button
        v-if="spin.status !== 'active'"
        class="Btn Btn--common Btn--color CabinetPage-Btn"
        @click="onActivateFreeSpin(spin)"
      >
        Activate now
      </button>
      <div v-else class="FreeSpin-Status">
        {{ spin.status }}
      </div>
    </div>
    <div class="FreeSpin-Section">
      <button
        v-if="spin.status === 'notActive'"
        class="Btn Btn--dark FreeSpin-Btn"
        @click="onDeleteFreeSpin(spin.id)"
      >
        Cancel
      </button>
      <div class="FreeSpin-Expires">
        <div class="FreeSpin-Label">
          <template v-if="spin.status === 'notActive'">
            Until activate
          </template>
        </div>
        <Counter
          class="Bonus-Counter"
          :min-format="true"
          :enddate="
            spin.status === 'notActive'
              ? new Date(spin.activationExpireAt * 1000)
              : new Date(spin.expireAt * 1000)
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import BonusDetails from '@/components/cabinet/BonusDetails';

export default {
  name: 'FreeSpin',
  props: {
    spin: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      gameIdToActivate: '',
    };
  },
  computed: {
    ...mapState(['deleteBonusError', 'activateFreeSpinError']),
    ...mapGetters(['activeCurrency']),
  },
  methods: {
    ...mapMutations(['pushNotificationAlert']),
    ...mapActions(['deleteFreeSpin', 'activateFreeSpin', 'getFreeSpinList']),
    showBonusDetails(bonus, type, chooseGameMessage = '') {
      this.$modal.show(
        BonusDetails,
        {
          bonus,
          type,
          chooseGameMessage,
          chooseGame: this.chooseGame,
          gameIdToActivate: this.gameIdToActivate,
        },
        { width: 400, height: 'auto', adaptive: true },
        {},
      );
    },
    chooseGame(id) {
      this.gameIdToActivate = id;
    },
    onDeleteFreeSpin(id) {
      this.deleteFreeSpin(id).then(() => {
        if (this.deleteBonusError)
          this.pushNotificationAlert({ type: 'error', text: 'Error on cancelling free spin' });
        else this.pushNotificationAlert({ type: 'success', text: 'Your free spin was cancelled' });
        this.getFreeSpinList();
      });
    },
    onActivateFreeSpin(spin) {
      if (spin.gameList.length > 1 && !this.gameIdToActivate)
        this.showBonusDetails(this.spin, 'freeSpin', true);
      const gameId = spin.gameList.length === 1 ? spin.gameList[0].id : this.gameIdToActivate;
      this.activateFreeSpin({ id: spin.id, gameId }).then(() => {
        if (this.activateFreeSpinError)
          this.pushNotificationAlert({ type: 'error', text: 'Error on activating free spin' });
        else this.pushNotificationAlert({ type: 'success', text: 'Your free spin was activated' });
        this.getFreeSpinList();
      });
    },
  },
};
</script>

<style scoped></style>
