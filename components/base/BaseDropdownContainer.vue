<script>
import vClickOutside from 'v-click-outside';
import { mapState } from 'vuex';

export default {
  name: "BaseDropdownContainer",
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    outerClass: {
      type: String,
      required: false,
      default: ''
    },
    innerClass: {
      type: String,
      required: false,
      default: ''
    },
    beforeWidth: {
      type: Number,
      required: false,
    }
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ...mapState(['width']),
  },
  methods: {
    onOpen() {
      this.isOpen = !this.isOpen;
    },
    onClickOutside(e) {
      if (!e.target.closest('BaseDropdownContainer')) {
        this.isOpen = false;
      }
    }
  },
  render(h) {
    const outer = h('button',{
      slot: 'outerContent',
      attrs: {
        class: this.outerClass,
      },
      on: {
        click: this.onOpen,
      }
    },
      [ this.$slots.outerContent]
    );

    const inner = this.isOpen || this.width >= this.beforeWidth ? h('div', {
      attrs: {
        class: `${this.innerClass} BaseDropdownContainer-Inner`
      },
    }, this.$slots.default) : null;

    return h('div', {
      attrs: {
        class: `${this.$attrs.class} BaseDropdownContainer`,
      },
      directives: [{
        name: 'clickOutside',
        value: this.onClickOutside
      }]
    }, [outer, inner]);
  },
}
</script>

<style lang="scss">
.BaseDropdownContainer {
  position: relative;

  &-Inner {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
  }
}
</style>

