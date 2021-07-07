<script>
import VueSlider from '@/components/Slider.vue';
import Card from '@/components/Card.vue';
import openGame from '@/mixins/openGame';

export default {
  name: 'SectionsSlider',
  mixins: [openGame],
  props: {
    itemsInScreen: {
      type: Number,
      required: false,
      default: 0,
    },
    items: {
      type: Array,
      required: true,
    },
    sectionClass: {
      type: String,
      required: false,
      default: '',
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
    title: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
  },
  render(h) {
    if (!this.items.length) return null;
    const itemsInSlide = this.itemsInScreen;
    const n = Math.ceil(this.items.length / itemsInSlide);
    const sections = [...Array(n).keys()];

    const divs = h(
      VueSlider,
      {
        props: this.sliderOptions,
      },
      sections.map((section, i) => {
        const items = this.items.slice(i * itemsInSlide, i * itemsInSlide + itemsInSlide);

        return h(
          'div',
          {
            attrs: {
              class: `${this.sectionClass} SectionsSlider-Section`,
            },
          },
          items.map(item => {
            return h(Card, {
              props: {
                gameInfo: item,
                showDemo: true,
                overlay: true,
              },
              on: {
                'open-gamepage': e => {
                  this.openGamePage(e, item.gameProducer);
                },
              },
            });
          }),
        );
      }),
    );

    const title = this.title
      ? h(
          'div',
          {
            attrs: {
              class: 'Title SectionsSlider-Title',
            },
          },
          this.title,
        )
      : null;
    return h(
      'div',
      {
        attrs: {
          class: 'SectionsSlider-Slider',
        },
      },
      [title, divs],
    );
  },
};
</script>

<style lang="scss">
.SectionsSlider {
  position: relative;

  &-Title {
    margin-bottom: 15px;
    font-size: 16px;

    @media (max-width: $screen-m) {
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

  .v_slider__prev,
  .v_slider__next {
    position: absolute;
    top: 10px;
  }

  .v_slider__prev {
    right: 20px;
    left: initial;
  }

  .v_slider__next {
    right: 0;
  }
}
</style>
