<template>
  <div v-if="needsCookiesPopup" class="CookiesPopup">
    <div class="Wrapper CookiesPopup-Content">
      <div class="CookiesPopup-Text">
        We use cookies to improve your experience. By using our website you are accepting our
        <NuxtLink class="CookiesPopup-Link" :to="localePath('/privacy-policy')"
          >Cookie Policy</NuxtLink
        >.
      </div>
      <button class="Btn CookiesPopup-Btn" @click="setCookiesPopupOkay">ОК</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

const Cookie = require('js-cookie');

export default {
  name: 'CookiesPopup',
  computed: {
    ...mapState(['needsCookiesPopup']),
  },
  methods: {
    ...mapMutations(['setNeedsCookiesPopup']),
    setCookiesPopupOkay() {
      Cookie.set('seenCookiesPopup', true, { expires: 1500 });
      this.setNeedsCookiesPopup(false);
    },
  },
};
</script>

<style lang="scss">
.CookiesPopup {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  padding: 20px 0 50px;
  text-align: center;
  background: var(--color-bg);

  @media (min-width: $screen-xl) {
    padding: 20px 0;
  }

  &-Content {
    @media (min-width: $screen-xl) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &-Text {
    font-size: 16px;
    color: var(--color-text-main);
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

  &-Link {
    font-weight: 700;
    color: var(--color-main1);
    white-space: nowrap;
  }
}
</style>
