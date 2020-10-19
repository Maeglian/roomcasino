import { required } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      val: '',
    };
  },
  validations: {
    val: {
      required,
    },
  },
  methods: {
    onInput(e) {
      if (this.type === 'checkbox') this.val = e.target.checked;
      else this.val = e.target.value;
      this.$v.val.$touch();
      this.$emit('onInput', this.val);
    },
  },
};
