<template>
  <div class="Modal CancelBonusPopup">
    <div class="Close Modal-Close" @click="$emit('close')" />
    <div class="Modal-Content CancelBonusPopup-Text">
      <template v-if="step === 1">
        You’ve got an active bonus! If you cancel it, you will lose {{ bonus.amount }} bonus money.
      </template>
      <template v-else>
        Are you sure?
      </template>
    </div>
    <div class="CancelBonusPopup-Btns">
      <template v-if="step === 1">
        <button class="Btn Btn--common CancelBonusPopup-Btn" @click="$emit('close')">
          Go back
        </button>
        <button class="Btn Btn--color CancelBonusPopup-Btn" @click="step = 2">Cancel bonus</button>
      </template>
      <template v-else>
        <button class="Btn Btn--common CancelBonusPopup-Btn" @click="$emit('close')">No</button>
        <button class="Btn Btn--color CancelBonusPopup-Btn" @click="onDeleteBonus(bonus.id)">
          Yes
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'CancelBonusPopup',
  props: {
    bonus: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    ...mapMutations(['clearDeleteBonusError', 'pushNotificationAlert']),
    ...mapActions([
      'getBonusList',
      'getAvailableBonusList',
      'deleteBonus',
      'getProfile',
      'getBonusHistoryList',
    ]),
    onDeleteBonus(id) {
      this.deleteBonus(id).then(() => {
        if (this.deleteBonusError)
          this.pushNotificationAlert({ type: 'error', text: 'Error on cancelling bonus' });
        else {
          this.$emit('close');
          this.pushNotificationAlert({ type: 'success', text: 'Your bonus was cancelled' });
          this.getBonusList();
          this.getBonusHistoryList();
          this.getProfile();
        }
      });
    },
  },
};
</script>

<style lang="scss">
.CancelBonusPopup {
  &-Text {
    font-size: 16px;
    line-height: 1.2;
    color: var(--color-text-main);
  }

  &-Btns {
    display: flex;
    justify-content: space-between;
  }

  &-Btn {
    width: calc(50% - 2px);
    text-transform: uppercase;
  }
}
</style>
