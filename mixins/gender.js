export default {
  data() {
    return {
      genders: [
        { name: this.$t('auth.placeholders.male'), value: 'male' },
        { name: this.$t('auth.placeholders.female'), value: 'female' },
      ],
    };
  },
};
