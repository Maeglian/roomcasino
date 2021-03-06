import Vue from 'vue';
import VModal from 'vue-js-modal';
import vClickOutside from 'v-click-outside';
import MarqueeText from 'vue-marquee-text-component';
import VueSlider from 'vue-slider-component';
import _PaymentIQCashier from 'paymentiq-cashier-bootstrapper';

Vue.use(vClickOutside);
Vue.use(VModal);
Vue.component('VueRange', VueSlider);
Vue.component('MarqueeText', MarqueeText);
Vue.prototype.$_Cashier = _PaymentIQCashier;
