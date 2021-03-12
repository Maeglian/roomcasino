<script>
import VueSlider from '@/components/Slider.vue';
import Card from '@/components/Card.vue';

export default {
  name: 'SectionsSlider',
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
              class: `${this.sectionClass} GamesSlider-Section`,
            },
          },
          items.map((item) => {
            return h(Card, {
              props: {
                imgUrl: item.imageUrl,
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
              class: 'Title GamesSlider-Title',
            },
          },
          this.title,
        )
      : null;
    return h(
      'div',
      {
        attrs: {
          class: 'Games-Slider',
        },
      },
      [title, divs],
    );
  },
};
</script>
