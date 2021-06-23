<template>
  <form class="AuthDialog-Registration AuthDialog-Form" @submit.prevent="onSubmitForm">
    <div class="AuthDialog-Content" :class="{ 'AuthDialog-Content--step1': step === 1 }">
      <div v-if="step === 1" class="AuthDialog-RegistrationHeader">
        <div class="AuthDialog-Title" v-html="$t('auth.signUpTitle')"></div>
        <div class="AuthDialog-Subtitle">
          {{ $t('auth.bonus') }} <span class="Colored">+</span> {{ $t('auth.freeSpins') }}
        </div>
      </div>
      <div v-if="step === 2" class="AuthDialog-Text">{{ $t('auth.step2Title') }}</div>
      <template v-for="(field, name) in fields">
        <template v-if="field.type === 'dropdown'">
          <BaseDropdown
            :key="name"
            v-model="field.value"
            autocomplete
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
            v-for="(value, i) in field.values"
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
              {{ (field.names && field.names[i]) || value }}
            </BaseCheckbox>
          </div>
        </div>
        <div v-else-if="field.type === 'date'" :key="field.value" class="AuthDialog-Row">
          <template v-if="!$v[`fieldsStep${step}`][name].children.$invalid">
            <div
              v-if="!$v[name].dateCheck && $v.fieldsStep2.birthDate.children.$anyDirty"
              class="AuthDialog-Error"
            >
              {{ $t('errors.invalidDate') }}
            </div>
            <div
              v-else-if="!$v[name].ageCheck && $v.fieldsStep2.birthDate.children.$anyDirty"
              class="AuthDialog-Error"
            >
              {{ $t('errors.minAge', { minAge }) }}
            </div>
          </template>
          <BaseInput
            v-for="(item, itemName) in field.children"
            :key="itemName"
            :ref="item.ref"
            v-model="item.value"
            class="AuthDialog-Col"
            error-class="AuthDialog-Error"
            :input-type="item.type"
            :input-class="
              $v[`fieldsStep${step}`][name].children.$anyDirty &&
              !$v.fieldsStep2.birthDate.children.$invalid &&
              (!$v[name].dateCheck || !$v[name].ageCheck)
                ? 'BaseInput-Input--error AuthDialog-Field AuthDialog-Input'
                : 'AuthDialog-Field AuthDialog-Input'
            "
            :v="$v[`fieldsStep${step}`][name].children[itemName].value"
            :inputmode="item.inputmode"
            :should-display-field-is-valid="
              $v.fieldsStep2.birthDate.children.$invalid ||
                ($v[name].dateCheck && $v[name].ageCheck)
            "
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
            <span v-if="name === 'receiveEmailPromos'">{{ $t('auth.emails') }}</span>
            <i18n v-if="name === 'confirmAgeAndTerms'" path="auth.terms" tag="span">
              <template #minAge>
                <span>{{ minAge }}</span>
              </template>
              <template #terms>
                <a class="AuthDialog-RegistrationLink" href="/terms" target="_blank">{{
                  $t('pages.terms')
                }}</a>
              </template>
              <template #policy>
                <a class="AuthDialog-RegistrationLink" href="/privacy-policy" target="_blank">{{
                  $t('pages.privacyPolicy')
                }}</a>
              </template>
              <template #br>
                <br />
              </template>
              <span class="AuthDialog-Required">*</span>
            </i18n>
          </BaseCheckbox>
        </template>
        <div v-else-if="field.type === 'phone'" :key="name" class="AuthDialog-Row">
          <div
            v-if="
              !$v[name].phoneWithPlusCheck &&
                $v[`fieldsStep${step}`][name].tel.value.$dirty &&
                !$v[`fieldsStep${step}`][name].tel.value.$invalid
            "
            class="AuthDialog-Error"
          >
            {{ $t('errors.phone') }}
          </div>
          <BaseDropdown
            v-model="field.code.value"
            autocomplete
            item-name="phoneCode"
            key-name="countryCode"
            class="AuthDialog-Field AuthDialog-Dropdown AuthDialog-Dropdown--phoneCode"
            :class="{ 'AuthDialog-Field--error': $v[`fieldsStep${step}`][name].code.value.$error }"
            :items="phoneCodeList"
            :placeholder="field.code.placeholder"
            error-class="AuthDialog-Error"
            :v="$v[`fieldsStep${step}`][name].code.value"
            @set-dropdown-value="field.code.value = $event"
          >
            <template #default="slotProps">
              <slot>
                <img class="AuthDialog-CountryImg" :src="slotProps.item.countryImage" />
              </slot>
            </template>
          </BaseDropdown>
          <BaseInput
            v-model="field.tel.value"
            class="AuthDialog-Row"
            :input-type="field.tel.type"
            :input-class="[
              'AuthDialog-Field AuthDialog-Input',
              {
                'BaseInput-Input--error':
                  $v[`fieldsStep${step}`][name].tel.value.$dirty && $v.phoneNumber.$invalid,
              },
            ]"
            error-class="AuthDialog-Error"
            :autocorrect="field.tel.autocorrect"
            :autocomplete="field.tel.autocomplete"
            :pattern="field.tel.pattern"
            :inputmode="field.tel.inputmode"
            :v="$v[`fieldsStep${step}`][name].tel.value"
            :should-display-field-is-valid="!$v.phoneNumber.$invalid"
          >
            <template #beforeInput-absolute>
              <span
                v-if="field.tel.required && !$v[`fieldsStep${step}`][name].tel.value.required"
                class="AuthDialog-Placeholder"
              >
                {{ field.tel.placeholder }}
                <span class="AuthDialog-Placeholder--required">*</span>
              </span>
            </template>
          </BaseInput>
        </div>
        <template v-else>
          <BaseInput
            :key="name"
            :ref="field.ref"
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
            should-display-field-is-valid
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
            <template v-if="name === 'phoneNumber'" #afterInput-absolute>
              <div class="AuthDialog-PhonePlus">+</div>
            </template>
          </BaseInput>
        </template>
      </template>
      <div v-if="authError && step === 1" class="AuthDialog-Error AuthDialog-Error--registration">
        {{ authError }}
      </div>
      <div
        v-if="updateProfileError && step === 2"
        class="AuthDialog-Error AuthDialog-Error--registration"
      >
        {{ updateProfileError }}
      </div>
    </div>
    <div class="AuthDialog-Buttons">
      <BaseButton
        v-if="step === 1"
        class="AuthDialog-Btn"
        :is-loading="authStatus === 'loading'"
        :disabled="$v.$error"
      >
        {{ $t('buttons.signUp') }}
      </BaseButton>
      <BaseButton
        v-if="step === 2"
        class="AuthDialog-Btn"
        :is-loading="authStatus === 'loading'"
        :disabled="$v.$error"
      >
        {{ $t('buttons.save') }}
      </BaseButton>
    </div>
  </form>
</template>

<script>
import BaseInput from '@/components/base/BaseInput.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';
import BaseDropdown from '@/components/base/BaseDropdown.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import { email, maxLength, minLength, numeric, required } from 'vuelidate/lib/validators';
import {
  deleteObjValuesFromLocalStorage,
  getObjValuesFromLocalStorage,
  writeObjValuesToLocalStorage,
  transformAustriaPhone,
} from '@/utils/helpers';
import {
  dateCheck,
  dayCheck,
  monthCheck,
  phoneWithPlusCheck,
  postalCodeCheck,
  termsCheck,
  yearCheck,
} from '@/utils/formCheckers';
import RegistrationBonus from '@/components/homepage/RegistrationBonus';
import BaseButton from '@/components/base/BaseButton';
import moment from 'moment';

export default {
  name: 'RegistrationForm',
  components: {
    BaseInput,
    BaseDropdown,
    BaseCheckbox,
    BaseButton,
  },
  props: {
    beforeDeposit: {
      type: Boolean,
      isRequired: false,
      default: false,
    },
    beforeStartGame: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      step: this.beforeDeposit || this.beforeStartGame ? 2 : 1,
      fieldsStep1: {
        email: {
          value: '',
          type: 'email',
          placeholder: this.$t('auth.placeholders.email'),
          required: true,
          autocapitalize: 'off',
          autocorrect: 'off',
          autocomplete: 'email',
          inputmode: 'email',
        },
        password: {
          value: '',
          type: 'password',
          placeholder: this.$t('auth.placeholders.password'),
          required: true,
        },
        currency: {
          value: '',
          type: 'dropdown',
          placeholder: this.$t('common.currency'),
          items: [],
          required: true,
        },
        country: {
          value: '',
          type: 'dropdown',
          placeholder: this.$t('auth.placeholders.country'),
          items: [],
          required: true,
        },
        receiveEmailPromos: {
          value: false,
          type: 'checkbox',
        },
        confirmAgeAndTerms: {
          value: false,
          type: 'checkbox',
        },
      },
      fieldsStep2: {
        firstName: {
          value: '',
          type: 'text',
          placeholder: this.$t('auth.placeholders.firstName'),
          required: true,
          autocorrect: 'off',
        },
        lastName: {
          value: '',
          type: 'text',
          placeholder: this.$t('auth.placeholders.lastName'),
          required: true,
          autocorrect: 'off',
        },
        gender: {
          value: 'male',
          type: 'radio',
          values: ['male', 'female'],
          names: [this.$t('auth.placeholders.male'), this.$t('auth.placeholders.female')],
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
              ref: 'month',
              type: 'text',
              placeholder: 'MM',
              required: true,
              inputmode: 'tel',
            },
            year: {
              value: '',
              ref: 'year',
              type: 'text',
              placeholder: this.$t('auth.placeholders.year'),
              required: true,
              inputmode: 'tel',
            },
          },
          type: 'date',
        },
        city: {
          value: '',
          ref: 'city',
          type: 'text',
          placeholder: this.$t('auth.placeholders.city'),
          required: true,
          autocorrect: 'off',
          autocomplete: 'address-level2',
        },
        address: {
          value: '',
          type: 'text',
          placeholder: this.$t('auth.placeholders.address'),
          required: true,
          autocorrect: 'off',
          autocomplete: 'address-line1',
        },
        postalCode: {
          value: '',
          type: 'text',
          placeholder: this.$t('auth.placeholders.postalCode'),
          required: true,
          autocorrect: 'off',
          autocomplete: 'postal-code',
        },
        phoneNumber: {
          type: 'phone',
          code: {
            value: '',
            type: 'dropdown',
            placeholder: 'Code',
            required: true,
          },
          tel: {
            value: '',
            type: 'tel',
            placeholder: this.$t('auth.placeholders.phone'),
            required: true,
            autocorrect: 'off',
            autocomplete: 'tel-national',
            inputmode: 'numeric',
          },
        },
      },
    };
  },
  computed: {
    ...mapState([
      'width',
      'currencyList',
      'countriesList',
      'phoneCodeList',
      'authStatus',
      'authError',
      'defaultCurrency',
      'updateProfileError',
      'phoneCodeList',
    ]),
    ...mapGetters(['defaultCountry', 'userInfo', 'minAge']),
    birthDate() {
      const {
        birthDate: {
          children: { day, month, year },
        },
      } = this.fieldsStep2;
      return `${year.value}-${month.value.padStart(2, '0')}-${day.value.padStart(2, '0')}`;
    },
    phoneNumber() {
      const {
        phoneNumber: { code, tel },
      } = this.fieldsStep2;

      const codeNumber = code.value ? code.value.phoneCode.replace(' ', '') : '';

      return transformAustriaPhone(codeNumber + tel.value);
    },
    fields() {
      if (this.step === 1) {
        return this.fieldsStep1;
      }
      return this.fieldsStep2;
    },
    labels() {
      return {
        receiveEmailPromos: this.$t('auth.emails'),
        confirmAgeAndTerms: `I am ${this.minAge} years old and I accept the<br/> <a class="AuthDialog-RegistrationLink" href="/terms" target="_blank">Terms&nbsp;and&nbsp;Conditions</a> and <a class="AuthDialog-RegistrationLink" href="/privacy-policy" target="_blank">Privacy&nbsp;Policy</a>&nbsp;<span class="AuthDialog-Required">*</span>`,
      };
    },
  },
  validations: {
    birthDate: {
      dateCheck,
      ageCheck(value) {
        return moment(value).add(this.minAge, 'years') < moment();
      },
    },
    phoneNumber: {
      phoneWithPlusCheck,
    },
    fieldsStep1: {
      email: { value: { required, email } },
      password: {
        value: {
          required,
          maxLength: maxLength(32),
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
              dayCheck,
            },
          },
          month: {
            value: {
              required,
              monthCheck,
            },
          },
          year: {
            value: {
              required,
              yearCheck,
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
          minLength: minLength(5),
          maxLength: maxLength(500),
        },
      },
      postalCode: {
        value: {
          required,
          postalCodeCheck,
          minLength: minLength(1),
          maxLength: maxLength(100),
        },
      },
      phoneNumber: {
        code: {
          value: { required },
        },
        tel: {
          value: {
            required,
            numeric,
          },
        },
      },
    },
  },
  // created() {
  //   if (this.beforeDeposit) this.step = 2;
  // },
  watch: {
    userInfo: {
      immediate: true,
      handler() {
        if (this.userInfo.country) {
          this.fieldsStep2.phoneNumber.code.value = this.phoneCodeList.find(
            item => item.countryCode === this.userInfo.country.code,
          );
        }
      },
    },
    'fieldsStep2.birthDate.children.day.value': function(val) {
      if (this.$v.fieldsStep2.$anyDirty) {
        if (val.length === 2 && !this.$v.fieldsStep2.birthDate.children.day.value.$invalid) {
          const el =
            this.fieldsStep2.birthDate.children.month.value.length !== 2
              ? this.$refs.month[0].$el
              : this.fieldsStep2.birthDate.children.year.value.length !== 4
              ? this.$refs.year[0].$el
              : this.$refs.city[0].$el;
          const input = el.querySelector('input');
          input.focus();
        }
      }
    },
    'fieldsStep2.birthDate.children.month.value': function(val) {
      if (this.$v.fieldsStep2.$anyDirty) {
        if (val.length === 2 && !this.$v.fieldsStep2.birthDate.children.month.value.$invalid) {
          const el =
            this.fieldsStep2.birthDate.children.year.value.length !== 4
              ? this.$refs.year[0].$el
              : this.$refs.city[0].$el;
          const input = el.querySelector('input');
          input.focus();
        }
      }
    },
    'fieldsStep2.birthDate.children.year.value': function(val) {
      if (this.$v.fieldsStep2.$anyDirty) {
        if (
          val.length === 4 &&
          !this.$v.fieldsStep2.birthDate.children.year.value.$invalid &&
          !this.$v.birthDate.$invalid
        ) {
          const el = this.$refs.city[0].$el;
          const input = el.querySelector('input');
          input.focus();
        }
      }
    },
  },
  mounted() {
    getObjValuesFromLocalStorage(this.fieldsStep1);
    getObjValuesFromLocalStorage(this.fieldsStep2);
    this.fieldsStep2.gender.value = 'male';
    this.fieldsStep1.currency.items = this.currencyList;
    if (!this.fieldsStep1.currency.value) this.fieldsStep1.currency.value = this.defaultCurrency;
    if (!this.currencyList.includes(this.fieldsStep1.currency.value))
      this.fieldsStep1.currency.value = this.currencyList[0];
    this.fieldsStep1.country.items = this.countriesList;
    if (!this.fieldsStep1.country.value) this.fieldsStep1.country.value = this.defaultCountry;
    if (this.beforeDeposit) {
      for (const key in this.fieldsStep2) {
        if (key === 'birthDate') {
          if (this.userInfo.birthDate) {
            const date = moment(this.userInfo.birthDate);
            this.fieldsStep2.birthDate.children.day.value = String(date.date());
            this.fieldsStep2.birthDate.children.month.value = String(date.month() + 1);
            this.fieldsStep2.birthDate.children.year.value = String(date.year());
          }
        } else if (this.userInfo[key]) this.fieldsStep2[key].value = this.userInfo[key];
      }
    }
  },
  beforeDestroy() {
    writeObjValuesToLocalStorage(this.fieldsStep1);
    writeObjValuesToLocalStorage(this.fieldsStep2);
  },
  methods: {
    ...mapActions(['registerUser', 'updateProfile']),
    onSubmitForm() {
      if (this.step === 1) {
        this.$v.fieldsStep1.$touch();
        if (this.$v.fieldsStep1.$error) return;

        const regData = {};
        for (const key in this.fieldsStep1) {
          if (key === 'country') {
            regData.country = this.fieldsStep1.country.value.code;
          } else regData[key] = this.fieldsStep1[key].value;
        }
        if (localStorage.getItem('cxd')) regData.cxd = localStorage.getItem('cxd');
        regData.locale = navigator.language || navigator.userLanguage;
        regData.language = this.$i18n.locale === 'en-ca' ? 'en' : this.$i18n.locale;
        this.registerUser(regData).then(() => {
          if (!this.authError) {
            deleteObjValuesFromLocalStorage(this.fieldsStep1);
            this.step = 2;
          }
        });
      } else {
        this.$v.fieldsStep2.$touch();
        this.$v.birthDate.$touch();
        if (this.$v.fieldsStep2.$error || this.$v.birthDate.$error) return;

        const profileData = { ...this.userInfo };
        for (const key in this.fieldsStep2) {
          if (!profileData[key]) {
            if (key === 'birthDate' || key === 'phoneNumber') profileData[key] = this[key];
            else profileData[key] = this.fieldsStep2[key].value;
          }
        }

        profileData.country = this.userInfo.country.code;

        this.updateProfile(profileData).then(() => {
          if (!this.updateProfileError) {
            deleteObjValuesFromLocalStorage(this.fieldsStep2);
            this.$emit('close');
            scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
            if (this.beforeDeposit) {
              this.$modal.show('cashier');
            } else if (this.beforeStartGame) {
              this.$emit('profile-updated');
            } else
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
@import 'AuthDialog.scss';
</style>
