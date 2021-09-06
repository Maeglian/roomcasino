<template>
  <div class="TeslaPopup">
    <div class="TeslaPopup-Content">
      <img class="TeslaPopup-Image" src="@/assets/img/tesla-banner.png" />
      <div class="TeslaPopup-Title">
        {{ $t('tesla_lottery.winTesla') }}
      </div>
      <Counter class="TeslaPopup-Counter" :enddate="new Date(1632430740 * 1000)">
        <template #upperText>{{ $t('tournaments.endsIn') }}:</template>
      </Counter>
      <NuxtLink to="/lottery/tesla_lottery" class="Btn Btn--color1 TeslaPopup-Btn">{{
        $t('buttons.joinNow')
      }}</NuxtLink>
      <div class="TeslaPopup-Close Close" @click="$parent.closeHandler"></div>
    </div>
  </div>
</template>

<script>
import Counter from '@/components/Counter';

export default {
  name: 'TeslaPopup',
  components: {
    Counter,
  },
};
</script>

<style lang="scss">
.TeslaPopup {
  position: fixed;
  top: 100px;
  left: 0;
  z-index: 100;
  width: 100%;
  background: var(--color-body);

  &-Content {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1440px;
    min-height: 42px;
    margin: 0 auto;
  }

  &-Image {
    flex-shrink: 0;
    width: 101px;
    margin-right: 5px;

    @media (min-width: $screen-xs) {
      width: 170px;
    }

    @media (min-width: $screen-m) {
      width: 276px;
    }

    @media (min-width: $screen-l) {
      margin-right: 48px;
    }
  }

  &-Title {
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      font-size: 20px;
    }
  }

  &-Counter {
    display: none;

    @media (min-width: $screen-xl) {
      display: block;
      margin-right: 40px;
      margin-left: auto;
    }
  }

  &-Btn {
    height: 25px;
    margin-right: 10px;
    margin-left: auto;
    padding: 0 10px;
    font-size: 10px;
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      height: 43px;
      margin-right: 77px;
      padding: 0 33px;
      font-size: 14px;
    }

    @media (min-width: $screen-xl) {
      margin-right: 78px;
      margin-left: 0;
    }
  }

  &-Close {
    margin-right: 15px;

    @media (min-width: $screen-l) {
      margin-right: 40px;
    }
  }

  .Counter-Item {
    display: flex;
    align-items: flex-end;
  }

  .Counter-Count {
    margin-right: 4px;
  }

  .Counter-Item:after {
    content: '|';
    font-weight: 300;
    color: var(--color-bg-input);
  }
}
</style>
