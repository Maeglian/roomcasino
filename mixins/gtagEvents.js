const production = process.env.NUXT_ENV_MODE === 'production';

export default {
  methods: {
    gtagSendEvent(action, params) {
      if (production) {
        this.$gtag.event(action, params);
      } else {
        params.test = true;
        this.$gtag.event(action, params);
      }
    },
  },
};
