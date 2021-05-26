export default {
  data() {
    return {
      periods: [
        {
          name: this.$t('profile.limits.periods.daily'),
          value: 'dayLimit',
        },
        {
          name: this.$t('profile.limits.periods.weekly'),
          value: 'weekLimit',
        },
        {
          name: this.$t('profile.limits.periods.monthly'),
          value: 'monthLimit',
        },
      ],
    };
  },
};
