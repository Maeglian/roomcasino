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
    <template v-for="field in fields">
      <template v-if="field.type === 'dropdown'">
        <BaseDropdown
          class="AuthDialog-Field AuthDialog-Dropdown"
          :items="field.items"
          :key="field.name"
          @set-dropdown-value="$data.formFields[field.name] = $event"
        />
      </template>
      <div class="AuthDialog-Row" v-else-if="field.type === 'radio'" :key="field.name">
        <div
          v-for="value in field.values"
          class="AuthDialog-Radio AuthDialog-Field AuthDialog-Field--2col"
          :key="value"
        >
          <BaseCheckbox
            class="AuthDialog-Checkbox"
            blockClass="AuthDialog"
            :name="field.name"
            :label="value"
            type="radio"
            :value="value"
            :checked="$data.formFields[field.name] === value"
            @onInput="$data.formFields[field.name] = $event"
          />
        </div>
      </div>
      <template v-else-if="field.type === 'date'">
        <Datepicker
          :key="field.name"
          format="dd - MM - yyyy"
          class="AuthDialog-Field Datepicker CabinetPage-Datepicker"
          calendar-class="Datepicker-Inner"
          input-class="AuthDialog-Input Datepicker-Input"
          :placeholder="field.placeholder"
          @selected="$data.formFields[field.name] = $event"
        />
      </template>
      <template v-else-if="field.type === 'checkbox'">
        <BaseCheckbox
          class="AuthDialog-Checkbox"
          blockClass="AuthDialog"
          :key="field.name"
          :label="field.label"
          :checked="$data.formFields[field.name]"
          @onInput="$data.formFields[field.name] = $event"
        />
      </template>
      <template v-else>
        <BaseInput
          blockClass="AuthDialog"
          :key="field.name"
          :inputType="field.type"
          :placeholder="field.placeholder"
          :value="$data.formFields[field.name]"
          @onInput="$data.formFields[field.name] = $event"
        />
      </template>
    </template>
  </div>
  <button
    type="submit"
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
import { mapActions } from 'vuex';
import Datepicker from 'vuejs-datepicker';

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
      fieldsStep1: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Your email',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Your password',
        },
        {
          name: 'currency',
          type: 'dropdown',
          items: [
            'EUR', 'USD', 'RUB',
          ],
        },
        {
          name: 'country',
          type: 'dropdown',
          items: [
            'USA', 'Canada', 'France', 'Germany', 'Norway', 'Russia', 'Ukraine', 'China', 'Japan',
          ],
        },
        {
          name: 'promos',
          type: 'checkbox',
          label: 'Receive Email Promos',
        },
        {
          name: 'terms',
          type: 'checkbox',
          label: 'I am 18 years old and I accept the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>',
        },
      ],
      fieldsStep2: [
        {
          name: 'firstName',
          type: 'text',
          placeholder: 'First Name',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          placeholder: 'Last Name',
          required: true,
        },
        {
          name: 'birthDate',
          type: 'date',
          placeholder: 'DD - MM - YYYY',
          required: true,
        },
        {
          name: 'gender',
          type: 'radio',
          values: ['Male', 'Female'],
        },
        {
          name: 'city',
          type: 'text',
          placeholder: 'City',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
          placeholder: 'Address',
          required: true,
        },
        {
          name: 'postalCode',
          type: 'text',
          placeholder: 'Postal code',
          required: true,
        },
      ],
      formFields: {
        email: '',
        password: '',
        currency: '',
        country: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: 'Male',
        city: '',
        address: '',
        postalCode: '',
        promos: true,
        terms: true,
      },
    };
  },
  computed: {
    fields() {
      if (this.step === 2) return this.fieldsStep2;
      return this.fieldsStep1;
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
    onClickSubmitBtn() {
      if (this.step === 1) this.step = 2;
      else {
        this.registerUser(this.formFields);
      }
    },
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

  &-Label {
    font-size: 12px;
    line-height: 1.66;
    color: var(--color-text-ghost);
  }

  &-Label--radio {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
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
