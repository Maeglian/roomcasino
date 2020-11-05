<template>
  <div class="NotFound">
    <MainNav />
    <div class="NotFound-Content">
      <img class="NotFound-Image" src="@/assets/img/not-found.png" alt="Page not found" />
      <h1 class="ErrorPage-Title">
        Page you were looking for was not found
      </h1>
      <div class="NotFound-Text">
        Sorry, we coudn't find the page you were looking for. We suggest that you return to main page.
      </div>
      <NuxtLink to="/" class="Btn ErrorPage-Btn">
        Go to the home page
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import MainNav from '@/components/homepage/MainNav.vue';

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
    padding-top: 32px;

    @media(min-width: $screen-s) {
      padding-top: 75px;
      background-image: url(../assets/img/notfound-bg.png);
      background-repeat: no-repeat;
      background-position: center 23px;
      background-size: contain;
    }
  }

  &-Image {
    width: 210px;
    margin-bottom: 24px;

    @media(min-width: $screen-s) {
      width: auto;
      margin-bottom: 32px;
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
}
</style>

