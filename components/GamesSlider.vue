<template>
  <div class="Prizes">
    <div class="Title Prizes-Title">
      {{ title }}
    </div>
    <VueSlider v-bind="prizesOptions">
      <Card
        v-for="(item, i) in items"
        :key="i"
        :badge="item.badge"
        :imgUrl="item.imgUrl"
        :sum="item.sum"
        :text="item.text"
      />
    </VueSlider>
  </div>
</template>

<script>
/* eslint-disable max-len */
import Card from '@/components/Card';
import VueSlider from '@/components/Slider';

export default {
  name: 'Prizes',
  props: {
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  components: {
    VueSlider,
    Card,
  },
  data() {
    return {
      prizesOptions: {
        items: 3,
        loop: true,
        nav: true,
        margin: 10,
      },
    };
  },
};
</script>

<style lang="scss">
.Prizes {
  position: relative;
  width: 100%;

  @media(min-width: $screen-s) {
    width: 299px;
  }

  @media(min-width: $screen-l) {
    width: 380px;
  }

  @media(min-width: $screen-xl) {
    width: 410px;
  }

  &-Title {
    margin-bottom: 15px;
    font-size: 16px;

    @media(max-width: $screen-m) {
      font-size: 12px;
    }
  }

  .Card-Image {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba(6, 14, 42, 0) 0%, rgba(6, 14, 42, 0.26) 33.78%, rgba(6, 14, 42, 0.88) 85%, #060E2A 100%);
    }
  }

  .Card-Icon--best {
    width: 20px;
    height: 20px;
  }

  .v_slider__prev, .v_slider__next {
    position: absolute;
    top: 10px;
  }

  .v_slider__prev {
    left: initial;
    right: 10px;
  }

  .v_slider__next {
    right: 0;
  }
}

</style>
