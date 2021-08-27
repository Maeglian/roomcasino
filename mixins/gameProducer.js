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
  watch: {
    gameProducerList: {
      immediate: true,
      handler() {
        if (this.gameProducerList.length)
          this.providerActive =
            this.gameProducerList.find(
              producer => producer.name === this.$route.params.providerName,
            ) || this.gameProducerList[0];
      },
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
