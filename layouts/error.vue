<template>
  <section class="ErrorPage">
    <template v-if="error.statusCode === 404">
      <NotFound />
    </template>
    <template v-else>
      <h1 class="ErrorPage-Title">
        An error occurred
      </h1>
      <NuxtLink to="/" class="Btn ErrorPage-Btn">
        Go to the home page
      </NuxtLink>
    </template>
  </section>
</template>

<script>
import NotFound from '@/components/NotFound.vue';

export default {
  props: ['error'],
  layout: 'error',
  name: 'error.vue',
  components: {
    NotFound,
  }
};
</script>

<style lang="scss">
.ErrorPage {
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

  &-Btn {
    width: 100%;

    @media(min-width: $screen-s) {
      width: auto;
    }
  }
}

</style>
