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
            v-model="field.value"
            class="AuthDialog-Field AuthDialog-Dropdown AuthDialog-Row"
            :class="{ 'AuthDialog-Field--error': $v[`fieldsStep${step}`][name].value.$error }"
            :items="field.items"
            :placeholder="field.placeholder"
            error-class="AuthDialog-Error"
            :v="$v[`fieldsStep${step}`][name].value"
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
          <template v-if="!$v[`fieldsStep${step}`][name].children.$invalid">
            <div v-if="!$v[name].dateCheck" class="AuthDialog-Error">
              Date is invalid
            </div>
            <div v-else-if="!$v[name].ageCheck" class="AuthDialog-Error">
              You are under age of 18
            </div>
          </template>
          <BaseInput
            v-for="(item, itemName) in field.children"
            :key="itemName"
            v-model="item.value"
            class="AuthDialog-Col"
            error-class="AuthDialog-Error"
            :input-type="item.type"
            :input-class="
              $v[`fieldsStep${step}`][name].children.$dirty && $v[name].$invalid
                ? 'BaseInput-Input--error AuthDialog-Field AuthDialog-Input'
                : 'AuthDialog-Field AuthDialog-Input'
            "
            :v="$v[`fieldsStep${step}`][name].children[itemName].value"
            :inputmode="item.inputmode"
          >
            <template #beforeInput-absolute>
              <span
                v-if="
                  item.required && !$v[`fieldsStep${step}`][name].children[itemName].value.required
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
            :class="{
              Wibro:
                $v[`fieldsStep${step}`][name] &&
                $v[`fieldsStep${step}`][name].$dirty &&
                $v[`fieldsStep${step}`][name].$error,
            }"
            label-class="AuthDialog-Label AuthDialog-CheckboxLabel"
            @change="field.value = $event"
            @animationend="$v[`fieldsStep${step}`][name].$reset()"
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
            :autocorrect="field.autocorrect"
            :autocomplete="field.autocomplete"
            :pattern="field.pattern"
            :inputmode="field.inputmode"
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
    <BaseButton
      class="BaseButton--full AuthDialog-Btn"
      :is-loading="authStatus === 'loading'"
      :disabled="$v.$error"
    >
      Sign up
    </BaseButton>
  </form>
</template>

<script>
import BaseInput from '@/components/base/BaseInput.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';
import BaseDropdown from '@/components/base/BaseDropdown.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import { required, email, minLength, maxLength, numeric } from 'vuelidate/lib/validators';
import {
  getObjValuesFromLocalStorage,
  writeObjValuesToLocalStorage,
  deleteObjValuesFromLocalStorage,
} from '@/utils/helpers';
import { passwordCheck, termsCheck, ageCheck, dateCheck } from '@/utils/formCheckers';
import RegistrationBonus from '@/components/homepage/RegistrationBonus';
import BaseButton from '@/components/base/BaseButton';

export default {
  name: 'RegistrationForm',
  components: {
    BaseInput,
    BaseDropdown,
    BaseCheckbox,
    BaseButton,
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
          inputmode: 'email',
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
          required: true,
        },
        country: {
          value: '',
          type: 'dropdown',
          placeholder: 'country',
          items: [],
          required: true,
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
            'I am 18 years old and I accept the<br/> <a class="AuthDialog-RegistrationLink" href="/terms">Terms&nbsp;and&nbsp;Conditions</a> and <a class="AuthDialog-RegistrationLink" href="/privacy-policy">Privacy&nbsp;Policy</a>',
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
          children: {
            day: {
              value: '',
              type: 'text',
              placeholder: 'DD',
              required: true,
              inputmode: 'tel',
            },
            month: {
              value: '',
              type: 'text',
              placeholder: 'MM',
              required: true,
              inputmode: 'tel',
            },
            year: {
              value: '',
              type: 'text',
              placeholder: 'YYYY',
              required: true,
              inputmode: 'tel',
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
          inputmode: 'numeric',
        },
      },
    };
  },
  computed: {
    ...mapState(['width', 'countriesList', 'authStatus', 'authError']),
    ...mapGetters(['currencyNames', 'countriesNames']),
    birthDate() {
      const {
        birthDate: {
          children: { day, month, year },
        },
      } = this.fieldsStep2;
      return `${year.value}-${month.value.padStart(2, '0')}-${day.value.padStart(2, '0')}`;
    },
    fields() {
      if (this.step === 1) {
        return this.fieldsStep1;
      }
      return this.fieldsStep2;
    },
  },
  validations: {
    birthDate: {
      dateCheck,
      ageCheck,
    },
    fieldsStep1: {
      email: { value: { required, email } },
      password: {
        value: {
          required,
          maxLength: maxLength(32),
          passwordCheck,
        },
      },
      currency: {
        value: {
          required,
        },
      },
      country: {
        value: {
          required,
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
        children: {
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
  mounted() {
    getObjValuesFromLocalStorage(this.fieldsStep1);
    getObjValuesFromLocalStorage(this.fieldsStep2);
    this.fieldsStep1.currency.items = this.currencyNames;
    this.fieldsStep1.country.items = this.countriesNames;
  },
  beforeDestroy() {
    writeObjValuesToLocalStorage(this.fieldsStep1);
    writeObjValuesToLocalStorage(this.fieldsStep2);
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
          if (key === 'birthDate') payload[key] = this.birthDate;
          else payload[key] = this.fieldsStep2[key].value;
        }
        this.registerUser(payload).then(() => {
          if (!this.authError) {
            deleteObjValuesFromLocalStorage(this.fieldsStep1);
            deleteObjValuesFromLocalStorage(this.fieldsStep2);
            this.$emit('close');
            this.$modal.show(
              RegistrationBonus,
              {},
              {
                reset: true,
                width: this.width > 360 ? 328 : 288,
                height: 'auto',
                adaptive: true,
              },
            );
          }
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
    font-size: 16px;
    color: var(--color-text-main);
    background: transparent;

    @media (min-width: $screen-s) {
      font-size: 12px;
    }

    &::placeholder {
      font-size: 12px;
      font-weight: 700;
      color: var(--color-text-ghost);
      text-transform: uppercase;
    }
  }

  &-Dropdown {
    font-size: 12px;
    text-transform: uppercase;
    border: 2px solid var(--color-border-ghost);
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

  &-Checkbox {
    margin-top: 15px;
  }

  &-CheckboxLabel,
  &-Label--radio {
    padding-left: 41px;
    line-height: 17px;

    &:before {
      top: 0;
      left: 0;
    }
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
    line-height: 58px;
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
