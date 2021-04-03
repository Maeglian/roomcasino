import { mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
  },
  watch: {
    '$store.state.user.email': function() {
      if (process.client && window.LC_API && window.LC_API.set_visitor_email && this.user.email)
        window.LC_API.set_visitor_email(this.user.email);
    },
  },
  mounted() {
    if (!window.LC_API) window.LC_API = {};
    window.LC_API.on_after_load = () => {
      this.setChatIsLoaded();
      if (this.user.email) window.LC_API.set_visitor_email(this.user.email);
    };
  },
  methods: {
    ...mapMutations(['setChatIsLoaded']),
  },
};
