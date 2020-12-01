<script>
import vClickOutside from 'v-click-outside';
import { mapState } from 'vuex';

export default {
  name: 'BaseDropdownContainer',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    outerClass: {
      type: String,
      required: false,
      default: '',
    },
    innerClass: {
      type: String,
      required: false,
      default: '',
    },
    beforeWidth: {
      type: Number,
      required: false,
      default: 0,
    },
    overlay: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      height: 0,
      topOffset: 0,
    };
  },
  computed: {
    ...mapState(['width']),
  },
  mounted() {
    const coords = this.$refs.outer.getBoundingClientRect();
    console.log(coords);
    this.height = coords.height;
    this.topOffset = coords.bottom + pageYOffset;
  },
  methods: {
    onOpen() {
      this.isOpen = !this.isOpen;
      if (this.overlay && this.isOpen) document.body.style.overflow = 'hidden';
      if (this.overlay && !this.isOpen) document.body.style.overflow = 'auto';
    },
    onClickOutside(e) {
      if (!e.target.closest('BaseDropdownContainer')) {
        this.isOpen = false;
      }
    },
  },
  render(h) {
    const overlay =
      this.overlay && this.isOpen
        ? h('div', {
            attrs: {
              class: 'BaseDropdownContainer-Overlay',
            },
            style: {
              top: `${this.topOffset}px`,
            },
            on: {
              click: this.onOpen,
            },
          })
        : null;

    const outer = h(
      'button',
      {
        slot: 'outerContent',
        attrs: {
          class: this.outerClass,
        },
        on: {
          click: this.onOpen,
        },
        ref: 'outer',
      },
      [this.$slots.outerContent],
    );

    const inner =
      this.isOpen || this.width >= this.beforeWidth
        ? h(
            'div',
            {
              attrs: {
                class: `${this.innerClass} BaseDropdownContainer-Inner`,
              },
              style: {
                top: `${this.height}px`,
              },
            },
            this.$slots.default,
          )
        : null;

    return h(
      'div',
      {
        attrs: {
          class: `${this.$attrs.class} BaseDropdownContainer`,
        },
        directives: [
          {
            name: 'clickOutside',
            value: this.onClickOutside,
          },
        ],
      },
      [overlay, outer, inner],
    );
  },
};
</script>

<style lang="scss">
.BaseDropdownContainer {
  position: relative;

  &-Overlay {
    content: '';
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(6, 8, 30, 0.9);
  }

  &-Inner {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
  }
}
</style>
