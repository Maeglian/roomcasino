<template>
  <div class="CookiesPopup">
    <div class="CookiesPopup-Content" :class="{ Wrapper: width >= 590 }">
      <template v-if="width >= 590">
        <div class="CookiesPopup-Text">
          {{ $t('cookiePolicy.text') }}
          <NuxtLink class="CookiesPopup-Link" :to="localePath('/privacy-policy')">{{
            $t('cookiePolicy.linkName')
          }}</NuxtLink
          >.
        </div>
        <button class="Btn CookiesPopup-Btn" @click="$parent.closeHandler">ОК</button>
      </template>
      <template v-else>
        <div class="CookiesPopup-Text">
          We use
          <NuxtLink class="CookiesPopup-Link" :to="localePath('/privacy-policy')">cookies</NuxtLink>
        </div>
        <button class="Close CookiesPopup-Close" @click="$parent.closeHandler"></button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CookiesPopup',
  computed: {
    ...mapState(['width']),
  },
};
</script>

<style lang="scss">
.CookiesPopup {
  position: fixed;
  bottom: 20px;
  left: 50%;
  z-index: 1000;
  display: inline-block;
  padding: 11px 18px;
  text-align: center;
  background: var(--color-bg-cookies);
  border-radius: 40px;
  transform: translateX(-50%);

  @media (min-width: $screen-s) {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 20px 0 50px;
    background: var(--color-bg);
    border-radius: 0;
  }

  @media (min-width: $screen-xl) {
    padding: 20px 0;
  }

  &-Content {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    @media (min-width: $screen-s) {
      display: block;
    }

    @media (min-width: $screen-xl) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &-Text {
    font-size: 16px;
    color: var(--color-text-main);
    white-space: nowrap;

    @media (min-width: $screen-s) {
      white-space: normal;
    }
  }

  &-Btn {
    margin-top: 10px;
    padding: 10px 50px;
    background: var(--color-main1);

    @media (min-width: $screen-xl) {
      margin-top: 0;
      margin-left: 30px;
    }
  }

  &-Close {
    margin-left: 18px;
  }

  &-Link {
    font-weight: 700;
    color: var(--color-main1);
    text-decoration: underline;
    white-space: nowrap;

    @media (min-width: $screen-s) {
      text-decoration: none;
    }
  }
}
</style>
