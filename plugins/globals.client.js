import Vue from 'vue';
import VModal from 'vue-js-modal';
import vClickOutside from 'v-click-outside';
import MarqueeText from 'vue-marquee-text-component'

Vue.use(vClickOutside);
Vue.use(VModal);
Vue.component('marquee-text', MarqueeText);
