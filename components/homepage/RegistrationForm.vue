<template>
  <form
    class="AuthDialog-Registration
  AuthDialog-Form"
    @submit.prevent="onSubmitForm"
  >
    <div class="AuthDialog-Content" :class="{ 'AuthDialog-Content--step1': step === 1 }">
      <div v-if="step === 1" class="AuthDialog-RegistrationHeader">
        <div class="AuthDialog-Title">
          Sign up <span class="Colored">&</span> get<br />
          welcome bonus
        </div>
        <div class="AuthDialog-Subtitle">€ 100 <span class="Colored">+</span> 55 free spins</div>
      </div>
      <div v-if="step === 2" class="AuthDialog-Text">
        Please, fill the information below!
      </div>
      <template v-for="(field, name) in fields">
        <template v-if="field.type === 'dropdown'">
          <BaseDropdown
            :key="name"
            class="AuthDialog-Field AuthDialog-Dropdown AuthDialog-Row"
            :items="field.items"
            :placeholder="field.placeholder"
            @set-dropdown-value="field.value = $event"
          />
        </template>
        <div v-else-if="field.type === 'radio'" :key="name" class="AuthDialog-Row">
          <div
            v-for="value in field.values"
            :key="value"
            class="AuthDialog-Radio AuthDialog-Field AuthDialog-Col"
          >
            <BaseCheckbox
              v-model="field.value"
              class="AuthDialog-Checkbox"
              label-class="AuthDialog-Label AuthDialog-Label--radio"
              :name="name"
              type="radio"
              :value="value"
              @change="field.value = $event"
            >
              {{ value }}
            </BaseCheckbox>
          </div>
        </div>
        <div v-else-if="field.type === 'date'" :key="field.value" class="AuthDialog-Row">
          <template v-if="!$v[`fieldsStep${step}`][name].parts.$invalid">
            <div v-if="!$v[`fieldsStep${step}`][name].value.dateCheck" class="AuthDialog-Error">
              Date is invalid
            </div>
            <div v-else-if="!$v[`fieldsStep${step}`][name].value.ageCheck" class="AuthDialog-Error">
              You are under age of 18
            </div>
          </template>
          <BaseInput
            v-for="(item, itemName) in field.parts"
            :key="itemName"
            v-model="item.value"
            class="AuthDialog-Col"
            error-class="AuthDialog-Error"
            :input-type="item.type"
            :input-class="
              $v[`fieldsStep${step}`][name].parts.$dirty && $v[`fieldsStep${step}`][name].$invalid
                ? 'BaseInput-Input--error AuthDialog-Field AuthDialog-Input'
                : 'AuthDialog-Field AuthDialog-Input'
            "
            :v="$v[`fieldsStep${step}`][name].parts[itemName].value"
          >
            <template #beforeInput-absolute>
              <span
                v-if="
                  item.required && !$v[`fieldsStep${step}`][name].parts[itemName].value.required
                "
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
            :key="name"
            v-model="field.value"
            class="AuthDialog-Checkbox AuthDialog-Row"
            label-class="AuthDialog-Label"
            @change="field.value = $event"
          >
            <span v-html="field.label"></span>
          </BaseCheckbox>
        </template>
        <template v-else>
          <BaseInput
            :key="name"
            v-model="field.value"
            class="AuthDialog-Row"
            :input-type="field.type"
            input-class="AuthDialog-Field AuthDialog-Input"
            error-class="AuthDialog-Error"
            :autocorrect="field.autocorrect || undefined"
            :autocomplete="field.autocomplete || undefined"
            :pattern="field.pattern || undefined"
            :v="$v[`fieldsStep${step}`][name].value"
          >
            <template #beforeInput-absolute>
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
      <div v-if="authError" class="AuthDialog-Error AuthDialog-Error--registration">
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
import { mapActions, mapGetters, mapState } from 'vuex';
import moment from 'moment';
import { required, email, minLength, maxLength, numeric, helpers } from 'vuelidate/lib/validators';

const passwordCheck = helpers.regex('passwordCheck', /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/);
const termsCheck = value => value === true;
const ageCheck = value => moment(value).add(18, 'years') < moment();
const dateCheck = value =>
  moment(value, 'YYYY-MM-DD', true).isValid() &&
  moment(value) < moment() &&
  moment(value).year() > 1900;

export default {
  name: 'RegistrationForm',
  components: {
    BaseInput,
    BaseDropdown,
    BaseCheckbox,
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
          autocapitalize: 'off',
          autocorrect: 'off',
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
          placeholder: 'currency',
          items: [],
        },
        country: {
          value: '',
          type: 'dropdown',
          placeholder: 'country',
          items: [],
        },
        receiveEmailPromos: {
          value: false,
          type: 'checkbox',
          label: 'Receive Email Promos',
        },
        confirmAgeAndTerms: {
          value: false,
          type: 'checkbox',
          label:
            'I am 18 years old and I accept the <a class="AuthDialog-RegistrationLink" href="/terms">Terms&nbsp;and&nbsp;Conditions</a> and <a class="AuthDialog-RegistrationLink" href="/privacy-policy">Privacy&nbsp;Policy</a>',
        },
      },
      fieldsStep2: {
        firstName: {
          value: '',
          type: 'text',
          placeholder: 'First Name',
          required: true,
          autocorrect: 'off',
        },
        lastName: {
          value: '',
          type: 'text',
          placeholder: 'Last Name',
          required: true,
          autocorrect: 'off',
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
          autocorrect: 'off',
          autocomplete: 'address-level2',
        },
        address: {
          value: '',
          type: 'text',
          placeholder: 'Address',
          required: true,
          autocorrect: 'off',
          autocomplete: 'address-line1',
        },
        postalCode: {
          value: '',
          type: 'text',
          placeholder: 'Postal code',
          required: true,
          autocorrect: 'off',
          autocomplete: 'postal-code',
        },
      },
    };
  },
  computed: {
    ...mapState(['countriesList', 'authError']),
    ...mapGetters(['currencyNames', 'countriesNames']),
    birthDate() {
      const {
        birthDate: {
          parts: { day, month, year },
        },
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
  watch: {
    birthDate() {
      this.fieldsStep2.birthDate.value = this.birthDate;
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
          ageCheck,
        },
        parts: {
          day: {
            value: {
              required,
            },
          },
          month: {
            value: {
              required,
            },
          },
          year: {
            value: {
              required,
            },
          },
        },
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
          numeric,
          minLength: minLength(1),
          maxLength: maxLength(100),
        },
      },
    },
  },
  created() {
    this.fieldsStep1.currency.items = this.currencyNames;
    this.fieldsStep1.currency.value = this.currencyNames[0];
    this.fieldsStep1.country.items = this.countriesNames;
    this.fieldsStep1.country.value = this.countriesNames[0];
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
            const entry = Object.entries(this.countriesList).find(
              i => i[1] === this.fieldsStep1.country.value,
            );
            payload.country = entry[0];
          } else payload[key] = this.fieldsStep1[key].value;
        }
        for (const key in this.fieldsStep2) {
          payload[key] = this.fieldsStep2[key].value;
        }
        this.registerUser(payload).then(() => {
          if (!this.authError) this.$emit('redirect-login');
        });
      }
    },
  },
};
</script>

<style lang="scss">
.AuthDialog {

  &-RegistrationHeader {
    margin-bottom: 34px;
    padding-top: 34px;
  }

  &-Content--step1 {
    background-image: url('../../assets/img/auth-bg1-large.png');
    background-repeat: no-repeat;
    background-position: top right;

    @media (min-width: $screen-m) {
      background-image: url('../../assets/img/auth-bg1-large.png');
    }
  }

  &-Field {
    width: 100%;
    height: 55px;
    background: transparent;
    border: 2px solid var(--color-border-ghost);

    &--error {
      border-color: rgba(235, 28, 42, .3);
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
      color: var(--color-text-ghost);
      text-transform: uppercase;
    }
  }

  &-Dropdown {
    font-size: 12px;
    border: 2px solid var(--color-border-ghost);
  }

  &-Checkbox {
    margin-top: 15px;
  }

  &-Label,
  &-Placeholder {
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

  &-RegistrationLink {
    color: var(--color-text-main);
    text-decoration: underline;
  }
}
</style>
