<template>
  <div class="GamesSlider">
    <div class="Title GamesSlider-Title">
      {{ title }}
    </div>
    <VueSlider v-bind="sliderOptions">
      <Card
        v-for="(item, i) in items"
        :key="i"
        :badge="item.badge"
        :imgUrl="item.imageUrl"
        :sum="item.sum"
        :text="item.text"
      />
    </VueSlider>
  </div>
</template>

<script>
import Card from '@/components/Card';
import VueSlider from '@/components/Slider';

export default {
  name: 'GamesSlider',
  props: {
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    sliderOptions: {
      type: Object,
      required: false,
      default: () => ({
        items: 1,
        loop: true,
        nav: true,
        margin: 10,
      }),
    },
  },
  components: {
    VueSlider,
    Card,
  },
};
</script>

<style lang="scss">
.GamesSlider {
  position: relative;

  &-Title {
    margin-bottom: 15px;
    font-size: 16px;

    @media(max-width: $screen-m) {
      font-size: 12px;
    }
  }

  .Card-Image {
    position: relative;
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

  &--winners {
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

    .Card-Image:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba(6, 14, 42, 0) 0%, rgba(6, 14, 42, 0.26) 33.78%, rgba(6, 14, 42, 0.88) 85%, #060E2A 100%);
    }
  }
}

</style>
