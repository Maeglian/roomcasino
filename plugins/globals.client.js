// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import VModal from 'vue-js-modal';
import vClickOutside from 'v-click-outside';
import Vuelidate from 'vuelidate';
import MarqueeText from 'vue-marquee-text-component'

Vue.use(vClickOutside);
Vue.use(Vuelidate);
Vue.use(VModal);
Vue.component('marquee-text', MarqueeText);
