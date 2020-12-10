import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { passwordCheck } from '@/utils/formCheckers';
import { required, sameAs } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';

export default {
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      newPassword: {
        value: '',
        inputType: 'password',
      },
      confirmPassword: {
        value: '',
        inputType: 'password',
      },
    };
  },
  computed: {
    ...mapState(['profileIsUpdating', 'updateProfileError']),
  },
  validations: {
    newPassword: {
      value: {
        required,
        passwordCheck,
      },
    },
    confirmPassword: {
      value: {
        sameAsPassword: sameAs(function() {
          return this.newPassword.value;
        }),
      },
    },
  },
  methods: {
    toggleVisibility(el) {
      this[el].inputType === 'password'
        ? (this[el].inputType = 'text')
        : (this[el].inputType = 'password');
    },
  },
};
