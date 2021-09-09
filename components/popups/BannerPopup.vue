<template>
  <div v-if="showPopup" class="BannerPopup">
    <slot />
  </div>
</template>

<script>
const Cookie = require('js-cookie');

export default {
  name: 'BannerPopup',
  props: {
    nameForCookies: {
      type: String,
      required: true,
    },
    expireTime: {
      type: Number,
      required: false,
      default: 4,
    },
  },
  data() {
    return {
      showPopup: false,
    };
  },
  mounted() {
    if (!Cookie.get(this.nameForCookies)) this.showPopup = true;
  },
  methods: {
    closeHandler() {
      Cookie.set(this.nameForCookies, true, { expires: this.expireTime });
      this.showPopup = false;
    },
  },
};
</script>

<style lang="scss">
.BannerPopup {
  position: absolute;
}
</style>

