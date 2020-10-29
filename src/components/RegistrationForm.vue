<template>
<!-- eslint-disable max-len -->
<div class="AuthDialog-Registration AuthDialog-Form">
  <div class="AuthDialog-Content" :class="{'AuthDialog-Content--step1': step === 1}">
    <div v-if="step === 1" class="AuthDialog-RegistrationHeader">
      <div class="AuthDialog-Title">
        Sign up <span class="Colored">&</span> get<br/>
        welcome bonus
      </div>
      <div class="AuthDialog-Subtitle">
        € 100 <span class="Colored">+</span> 55 free spins
      </div>
    </div>
    <div v-if="step === 2" class="AuthDialog-Text">
      Please, fill the information below!
    </div>
    <template v-for="(field, name) in fields">
      <template v-if="field.type === 'dropdown'">
        <BaseDropdown
          class="AuthDialog-Field AuthDialog-Dropdown"
          :items="field.items"
          :key="name"
          @set-dropdown-value="field.value = $event"
        />
      </template>
      <div v-else-if="field.type === 'radio'" class="AuthDialog-Row" :key="name">
        <div
          v-for="value in field.values"
          class="AuthDialog-Radio AuthDialog-Field AuthDialog-Field--2col"
          :key="value"
        >
          <BaseCheckbox
            class="AuthDialog-Checkbox"
            blockClass="AuthDialog"
            :name="name"
            :label="value"
            :value="value"
            type="radio"
            :checked="field.value === value"
            @change="field.value = $event"
          />
        </div>
      </div>
      <div v-else-if="field.type === 'date'" class="AuthDialog-Datepicker" :key="name">
        <div
          v-if="field.required && $v[`fieldsStep${step}`][name].value.$dirty && $v[`fieldsStep${step}`][name].value.required === false"
          class="AuthDialog-Error"
        >
          Can't be blank
        </div>
        <Datepicker
          format="dd - MM - yyyy"
          class="AuthDialog-Field Datepicker CabinetPage-Datepicker"
          :class="{'AuthDialog-Field--error': $v[`fieldsStep${step}`][name].$error}"
          calendar-class="Datepicker-Inner"
          input-class="AuthDialog-Input Datepicker-Input"
          :placeholder="field.placeholder"
          @selected="onSelectDate($event, name, step)"
        />
      </div>
      <template v-else-if="field.type === 'checkbox'">
        <BaseCheckbox
          class="AuthDialog-Checkbox"
          blockClass="AuthDialog"
          :key="name"
          :label="field.label"
          :checked="field.value"
          @change="field.value = $event"
        />
      </template>
      <template v-else>
        <BaseInput
          class="AuthDialog-Wrapper"
          blockClass="AuthDialog"
          :key="name"
          :inputType="field.type"
          :placeholder="field.placeholder"
          v-model="field.value"
          :v="$v[`fieldsStep${step}`][name].value"
          :required="field.required"
          :custom-placeholder="true"
        />
      </template>
    </template>
    <div v-if="authError" class="AuthDialog-Error">
      {{ authError }}
    </div>
  </div>
  <button
    type="submit"
    :disabled="this.$v[`fieldsStep${step}`].$error"
    class="Btn Btn--full AuthDialog-Btn"
    @click="onClickSubmitBtn()"
  >
    Sign up
  </button>
</div>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import BaseDropdown from '@/components/BaseDropdown.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import {
  required, email, minLength, maxLength, helpers,
} from 'vuelidate/lib/validators';

const passwordCheck = helpers.regex('passwordCheck', /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/);

export default {
  name: 'RegistrationForm',
  components: {
    BaseInput,
    BaseDropdown,
    BaseCheckbox,
    Datepicker,
  },
  data() {
    return {
      step: 1,
      fieldsStep1: {
        email: {
          value: '',
          type: 'email',
          placeholder: 'Your email',
          required: true,
        },
        password: {
          value: '',
          type: 'password',
          placeholder: 'Your password',
          required: true,
        },
        currency: {
          value: '',
          type: 'dropdown',
          items: [],
        },
        country: {
          value: '',
          type: 'dropdown',
          items: [],
        },
        receiveEmailPromos: {
          value: true,
          type: 'checkbox',
          label: 'Receive Email Promos',
        },
        confirmAgeAndTerms: {
          value: true,
          name: 'confirmAgeAndTerms',
          type: 'checkbox',
          label: 'I am 18 years old and I accept the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>',
        },
      },
      fieldsStep2: {
        firstName: {
          value: '',
          type: 'text',
          placeholder: 'First Name',
          required: true,
        },
        lastName: {
          name: 'lastName',
          type: 'text',
          placeholder: 'Last Name',
          required: true,
        },
        birthDate: {
          value: '',
          type: 'date',
          placeholder: 'DD - MM - YYYY',
          required: true,
        },
        gender: {
          value: 'male',
          type: 'radio',
          values: ['male', 'female'],
        },
        city: {
          value: '',
          type: 'text',
          placeholder: 'City',
          required: true,
        },
        address: {
          value: '',
          type: 'text',
          placeholder: 'Address',
          required: true,
        },
        postalCode: {
          value: '',
          type: 'text',
          placeholder: 'Postal code',
          required: true,
        },
      },
    };
  },
  computed: {
    ...mapState(['countriesList', 'authError']),
    ...mapGetters(['currencyNames', 'countriesNames']),
    fields() {
      if (this.step === 1) {
        return this.fieldsStep1;
      }
      return this.fieldsStep2;
    },
  },
  validations: {
    fieldsStep1: {
      email: { value: { required, email } },
      password: {
        value: {
          required,
          maxLength: maxLength(100),
          passwordCheck,
        },
      },
    },
    fieldsStep2: {
      firstName: {
        value: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(100),
        },
      },
      lastName: {
        value: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(100),
        },
      },
      birthDate: { value: { required } },
      city: {
        value: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(100),
        },
      },
      address: {
        value: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(500),
        },
      },
      postalCode: {
        value: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(100),
        },
      },
    },
  },
  methods: {
    ...mapActions(['registerUser']),
    showNextStep() {
      if (this.step !== 4) this.step += 1;
    },
    showPreviousStep() {
      if (this.step !== 1) this.step -= 1;
    },
    onSelectDate(dateStr, field, step) {
      const date = new Date(dateStr).toISOString();
      const fieldStep = `fieldsStep${step}`;
      this[fieldStep][field].value = date;
    },
    onClickSubmitBtn() {
      const payload = {};

      if (this.step === 1) {
        this.$v.fieldsStep1.$touch();
        if (this.$v.fieldsStep1.$error) return;
        this.step = 2;
      } else {
        this.$v.fieldsStep2.$touch();
        if (this.$v.fieldsStep2.$error) return;
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const key in this.fieldsStep1) {
          if (key === 'country') {
            // eslint-disable-next-line max-len
            const entry = Object.entries(this.countriesList).find((i) => i[1] === this.fieldsStep1.country.value);
            // eslint-disable-next-line prefer-destructuring
            payload.country = entry[0];
          } else payload[key] = this.fieldsStep1[key].value;
        }
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const key in this.fieldsStep2) {
          payload[key] = this.fieldsStep2[key].value;
        }
        payload.wlSlug = 'roomcasino';
        this.registerUser(payload).then(() => {
          if (!this.authError) this.$emit('redirectLogin');
        });
      }
    },
  },
  created() {
    // eslint-disable-next-line prefer-destructuring
    this.fieldsStep1.currency.items = this.currencyNames;
    // eslint-disable-next-line prefer-destructuring
    this.fieldsStep1.currency.value = this.currencyNames[0];
    // eslint-disable-next-line prefer-destructuring
    this.fieldsStep1.country.items = this.countriesNames;
    // eslint-disable-next-line prefer-destructuring
    this.fieldsStep1.country.value = this.countriesNames[0];
  },
};
</script>

<style lang="scss">
.AuthDialog {
  &-RegistrationHeader {
    padding-top: 34px;
    margin-bottom: 34px;
  }

  &-Content--step1 {
    background-image: url('./../assets/img/auth-bg1.png');
    background-repeat: no-repeat;

    @media(min-width: $screen-m) {
      background-image: url('./../assets/img/auth-bg1-large.png');
    }
  }

  &-Field {
    width: 100%;
    height: 55px;
    margin-bottom: 4px;
    background: transparent;
    border: 2px solid var(--color-border-ghost);

    &--2col {
      width: calc(50% - 3px);
    }

    &--error {
      border-color: rgba(235, 28, 42, 0.3);
    }
  }

  &-Radio {
    padding-right: 20px;
    padding-left: 20px;
  }

  &-Input {
    width: 100%;
    height: 100%;
    padding: 20px;
    color: var(--color-text-main);
    background: transparent;

    &::placeholder {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--color-text-ghost);
    }
  }

  &-Datepicker {
    border: none;
  }

  &-Dropdown {
    border: 2px solid var(--color-border-ghost);
  }

  &-Checkbox {
    margin-top: 15px;
  }

  &-Label, &-Placeholder {
    font-size: 12px;
    line-height: 1.66;
    color: var(--color-text-ghost);
  }

  &-Label--radio {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }

  &-Placeholder {
    left: 20px;
    font-weight: 700;
    line-height: 55px;
    text-transform: uppercase;
  }

  &-Error {
    margin-bottom: 5px;
    font-size: 10px;
    color: var(--color-error);
  }

  &-Row {
    display: flex;
    justify-content: space-between;
  }

  a {
    color: var(--color-text-main);
  }
}
</style>
