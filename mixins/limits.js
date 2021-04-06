export default {
  data() {
    return {
      periods: [
        {
          name: this.$t('cabinet.limits.periods.daily'),
          value: 'dayLimit',
        },
        {
          name: this.$t('cabinet.limits.periods.weekly'),
          value: 'weekLimit',
        },
        {
          name: this.$t('cabinet.limits.periods.monthly'),
          value: 'monthLimit',
        },
      ],
    };
  },
};
