<template>
  <div class="RegistrationBonus">
    <div class="RegistrationBonus-Content">
      <div class="RegistrationBonus-Title">Thank you for registration</div>
      <div class="RegistrationBonus-Promo">100% up to $150</div>
      <!--      <div class="RegistrationBonus-PromoMin">-->
      <!--        + 55 Free spins-->
      <!--      </div>-->
      <div class="RegistrationBonus-Text">
        For your first deposit! Use advantage of Ninecasino Welcome Bonus.
      </div>
    </div>
    <button type="btn" class="Btn Btn--common Btn--full" @click="onClickBtn">Get your bonus</button>
  </div>
</template>

<script>
export default {
  name: 'RegistrationBonus',
  methods: {
    onClickBtn() {
      this.$modal.show('cashier');
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
.RegistrationBonus {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--color-bg);
  background-image: url('../../assets/img/registration_success.png');
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 100% auto;

  @media (min-width: $screen-xs) {
    background-size: auto auto;
  }

  &-Content {
    max-width: 239px / 328px * 100%;
    padding-top: 207px / 288px * 100%;
    text-align: center;
  }

  &-Title {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;
  }

  &-Promo {
    font-size: 76px;
    font-weight: 700;
    line-height: 1;
    color: var(--color-main1);
  }

  &-PromoMin {
    margin-bottom: 5px;
    font-size: 22px;
    font-weight: 700;
    color: var(--color-main1);
  }

  &-Text {
    margin-bottom: 28px;
    font-size: 12px;
    line-height: 1.6;
    color: var(--color-text-ghost);
  }
}
</style>
