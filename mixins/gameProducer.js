import { mapState } from 'vuex';

export default {
  data() {
    return {
      providerActive: {},
    };
  },
  computed: {
    ...mapState('games', ['gameProducers']),
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
  methods: {
    onChooseProvider(e) {
      this.providerActive = e;
      this.$router.push(
        this.localePath({
          name: 'index-providers-providerName',
          params: {
            providerName: e.name === this.gameProducerList[0].name ? 'all' : e.name,
          },
        }),
      );
    },
  },
};
