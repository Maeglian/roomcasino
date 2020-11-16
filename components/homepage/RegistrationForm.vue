<template>
<form
  class="AuthDialog-Registration
  AuthDialog-Form"
  @submit.prevent="onSubmitForm"
>
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
          class="AuthDialog-Field AuthDialog-Dropdown AuthDialog-Row"
          :items="field.items"
          :key="name"
          @set-dropdown-value="field.value = $event"
        />
      </template>
      <div v-else-if="field.type === 'radio'" class="AuthDialog-Row" :key="name">
        <div
          v-for="value in field.values"
          class="AuthDialog-Radio AuthDialog-Field AuthDialog-Col"
          :key="value"
        >
          <BaseCheckbox
            class="AuthDialog-Checkbox"
            labelClass="AuthDialog-Label AuthDialog-Label--radio"
            :name="name"
            v-model="field.value"
            type="radio"
            :value="value"
            @change="field.value = $event"
          >
            {{ value }}
          </BaseCheckbox>
        </div>
      </div>
      <div v-else-if="field.type === 'date'" class="AuthDialog-Row">
        <template v-if="!$v[`fieldsStep${step}`][name].parts.$invalid">
          <div
            v-if="!$v[`fieldsStep${step}`][name].value.dateCheck"
            class="AuthDialog-Error"
          >
            Date is invalid
          </div>
          <div
            v-else-if="!$v[`fieldsStep${step}`][name].value.ageCheck"
            class="AuthDialog-Error"
          >
            You are under age of 18
          </div>
        </template>
        <BaseInput
          v-for="(item, itemName) in field.parts"
          class="AuthDialog-Col"
          errorClass="AuthDialog-Error"
          :key="itemName"
          :inputType="item.type"
          :inputClass="[$v[`fieldsStep${step}`][name].$dirty && $v[`fieldsStep${step}`][name].$invalid ? 'BaseInput-Input--error AuthDialog-Field AuthDialog-Input' : 'AuthDialog-Field AuthDialog-Input']"
          v-model="item.value"
          :v="$v[`fieldsStep${step}`][name].parts[itemName].value"
        >
          <template v-slot:beforeInput-absolute>
            <span
              v-if="item.required && !$v[`fieldsStep${step}`][name].parts[itemName].value.required"
              class="AuthDialog-Placeholder"
            >
              {{ item.placeholder }}
              <span class="AuthDialog-Placeholder--required">*</span>
            </span>
          </template>
        </BaseInput>
      </div>
      <template v-else-if="field.type === 'checkbox'">
        <BaseCheckbox
          class="AuthDialog-Checkbox AuthDialog-Row"
          labelClass="AuthDialog-Label"
          :key="name"
          v-model="field.value"
          @change="field.value = $event"
        >
          <span v-html="field.label"></span>
        </BaseCheckbox>
      </template>
      <template v-else>
        <BaseInput
          class="AuthDialog-Wrapper AuthDialog-Row"
          :key="name"
          :inputType="field.type"
          inputClass="AuthDialog-Field AuthDialog-Input"
          errorClass="AuthDialog-Error"
          v-model="field.value"
          :autocorrect="field.autocorrect || undefined"
          :autocomplete="field.autocomplete || undefined"
          :pattern="field.pattern || undefined"
          :v="$v[`fieldsStep${step}`][name].value"
        >
          <template v-slot:beforeInput-absolute>
            <span
              v-if="field.required && !$v[`fieldsStep${step}`][name].value.required"
              class="AuthDialog-Placeholder"
            >
              {{ field.placeholder }}
              <span class="AuthDialog-Placeholder--required">*</span>
            </span>
          </template>
        </BaseInput>
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
  >
    Sign up
  </button>
</form>
</template>

<script>
import BaseInput from '@/components/base/BaseInput.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';
import BaseDropdown from '@/components/base/BaseDropdown.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapActions, mapGetters, mapState } from 'vuex';
import moment from 'moment';
import {
  required, email, minLength, maxLength, numeric, between, helpers,
} from 'vuelidate/lib/validators';

const Datepicker = () => import('vuejs-datepicker');

const passwordCheck = helpers.regex('passwordCheck', /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/);
const termsCheck = (value) => value === true;
const ageCheck = (value) => moment(value).add(18, 'years') < moment();
const dateCheck = (value) => moment(value, 'YYYY-MM-DD', true).isValid()
  && moment(value) < moment() && moment(value).year() > 1900;

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
          autocapitalize: "off",
          autocorrect: "off",
          autocomplete: 'email',
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
          autocorrect: "off",
        },
        lastName: {
          value: '',
          type: 'text',
          placeholder: 'Last Name',
          required: true,
          autocorrect: "off",
        },
        birthDate: {
          value: '',
          parts: {
            day: {
              value: '',
              type: 'number',
              placeholder: 'DD',
              required: true,
            },
            month: {
              value: '',
              type: 'number',
              placeholder: 'MM',
              required: true,
            },
            year: {
              value: '',
              type: 'number',
              placeholder: 'YYYY',
              required: true,
            },
          },
          type: 'date',
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
          autocorrect: "off",
          autocomplete: 'address-level2',
        },
        address: {
          value: '',
          type: 'text',
          placeholder: 'Address',
          required: true,
          autocorrect: "off",
          autocomplete: "address-line1"
        },
        postalCode: {
          value: '',
          type: 'text',
          placeholder: 'Postal code',
          required: true,
          autocorrect: "off",
          autocomplete: "postal-code",
          pattern: "\d*"
        },
      },
    };
  },
  watch: {
    birthDate() {
      this.fieldsStep2.birthDate.value = this.birthDate;
    },
  },
  computed: {
    ...mapState(['countriesList', 'authError']),
    ...mapGetters(['currencyNames', 'countriesNames']),
    birthDate() {
      const {
        birthDate: {
          parts: {
            day, month, year
          }
        }
      } = this.fieldsStep2;
      return `${year.value}-${month.value}-${day.value}`;
    },
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
          maxLength: maxLength(32),
          passwordCheck,
        },
      },
      confirmAgeAndTerms: { value: { termsCheck } },
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
      birthDate: {
        value: {
          dateCheck,
          ageCheck
        },
        parts: {
          day: {
            value: {
              required,
            }
          },
          month: {
            value: {
              required,
            }
          },
          year: {
            value: {
              required,
            }
          },
        }
      },
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
    onSubmitForm() {
      const payload = {};

      if (this.step === 1) {
        this.$v.fieldsStep1.$touch();
        if (this.$v.fieldsStep1.$error) return;
        this.step = 2;
      } else {
        this.$v.fieldsStep2.$touch();
        if (this.$v.fieldsStep2.$error) return;
        for (const key in this.fieldsStep1) {
          if (key === 'country') {
            const entry = Object.entries(this.countriesList).find((i) => i[1] === this.fieldsStep1.country.value);
            payload.country = entry[0];
          } else payload[key] = this.fieldsStep1[key].value;
        }
        for (const key in this.fieldsStep2) {
          payload[key] = this.fieldsStep2[key].value;
        }
        this.registerUser(payload).then(() => {
          if (!this.authError) this.$emit('redirectLogin');
        });
      }
    },
  },
  created() {
    this.fieldsStep1.currency.items = this.currencyNames;
    this.fieldsStep1.currency.value = this.currencyNames[0];
    this.fieldsStep1.country.items = this.countriesNames;
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
    background-image: url('../../assets/img/auth-bg1-large.png');
    background-repeat: no-repeat;
    background-position: top right;

    @media(min-width: $screen-m) {
      background-image: url('../../assets/img/auth-bg1-large.png');
    }
  }

  &-Field {
    width: 100%;
    height: 55px;
    background: transparent;
    border: 2px solid var(--color-border-ghost);

    &--error {
      border-color: rgba(235, 28, 42, 0.3);
    }
  }

  &-Col {
    margin-right: 4px;

    &:last-child {
      margin-right: 0;
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
    position: absolute;
    top: 0;
    left: 20px;
    font-weight: 700;
    line-height: 55px;
    text-transform: uppercase;

    &--required {
      color: var(--color-error);
    }
  }

  &-Error {
    position: absolute;
    top: -13px;
    left: 0;
    margin-bottom: 5px;
    font-size: 10px;
    color: var(--color-error);
  }

  &-Row {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 12px;
  }

  a {
    color: var(--color-text-main);
  }
}
</style>
