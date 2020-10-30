<template>
<section class="NotFound">
  <MainNav />
  <div class="NotFound-Content">
    <img class="NotFound-Image" src="@/assets/img/not-found.png" alt="Page not found" />
    <div class="NotFound-Title">
      Page you were looking for was not found
    </div>
    <div class="NotFound-Text">
      Sorry, we coudn't find the page you were looking for. We suggest that you return to main page.
    </div>
    <router-link to="/" class="Btn NotFound-Btn">
      Go to the home page
    </router-link>
  </div>
</section>
</template>

<script>
import MainNav from '@/components/MainNav.vue';

export default {
  name: 'NotFound',
  components: {
    MainNav,
  },
};
</script>

<style lang="scss">
.NotFound {
  &-Content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 32px;

    @media(min-width: $screen-s) {
      margin-top: 75px;
      background-image: url(../assets/img/notfound-bg.png);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
  }

  &-Image {
    margin-bottom: 24px;

    @media(min-width: $screen-s) {
      margin-bottom: 32px;
    }
  }

  &-Title {
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.27;
    text-align: center;
    color: var(--color-text-main);

    @media(min-width: $screen-s) {
      width: 559px / $screen-xl * 100%;
      margin-bottom: 17px;
      font-size: 33px;
    }
  }

  &-Text {
    margin-bottom: 38px;
    font-size: 14px;
    line-height: 1.66;
    text-align: center;
    color: var(--color-text-ghost);

    @media(min-width: $screen-s) {
      width: 559px / $screen-xl * 100%;
      margin-bottom: 44px;
    }
  }

  &-Btn {
    width: 100%;

    @media(min-width: $screen-s) {
      width: auto;
    }
  }
}
</style>
