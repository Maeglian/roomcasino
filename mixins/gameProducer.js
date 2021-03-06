import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['gameProducers']),
    gameProducerList() {
      return [
        {
          name: this.$i18n.t('homepage.allProviders'),
          iconUrl: '',
        },
        ...this.gameProducers,
      ];
    },
  },
};
