<template>
  <div class="ProfileInfo ProfilePage-Content">
    <form class="ProfileInfo-Form" @submit.prevent="onSubmit">
      <div class="CabinetPage-Header">
        General Info
      </div>
      <Loader v-if="profileIsLoading" />
      <div v-else class="ProfileInfo-Fields">
        <template v-for="(val, name) in fields">
          <div v-if="name === 'country'" :key="name" class="CabinetForm-Row">
            <label :for="name | formatLabel" class="CabinetForm-Field CabinetForm-Label">
              {{ name }}
            </label>
            <BaseDropdown
              v-model="fields[name]"
              class="CabinetForm-Row CabinetForm-Dropdown"
              :items="countriesNames"
              @set-dropdown-value="fields[name] = $event"
            />
          </div>
          <div v-else-if="name === 'gender'" :key="name" class="CabinetForm-Row">
            <label :for="name | formatLabel" class="CabinetForm-Field CabinetForm-Label">
              {{ name }}
            </label>
            <BaseDropdown
              v-model="fields[name]"
              class="CabinetForm-Row CabinetForm-Dropdown"
              :items="['male', 'female']"
              @set-dropdown-value="fields[name] = $event"
            />
          </div>
          <BaseInput
            v-else
            :key="name"
            v-model="fields[name]"
            class="CabinetForm-Row"
            :disabled="name === 'email'"
            input-type="text"
            :input-id="name | formatLabel"
            input-class="CabinetForm-Input"
            wrapper-class="CabinetForm-Wrapper"
          >
            <template #beforeInput-relative>
              <label :for="name | formatLabel" class="CabinetForm-Field CabinetForm-Label">
                {{ name }}
              </label>
            </template>
            <template v-if="name === 'mobile'" #afterInput-absolute>
              <div class="CabinetForm-Verified">
                Verify
                <svg class="CabinetForm-Icon" width="17" height="17">
                  <use xlink:href="@/assets/img/icons.svg#verify"></use>
                </svg>
              </div>
            </template>
          </BaseInput>
        </template>
      </div>
      <div class="CabinetPage-Header">
        Subscriptions
      </div>
      <div class="ProfileInfo-Subscriptions">
        <BaseCheckbox
          v-for="(item, name) in subscriptions"
          :key="name"
          v-model="item.value"
          type="checkbox"
          class="CabinetForm-Row"
          input-class="CabinetForm-Checkbox"
          label-class="CabinetForm-CheckboxLabel CabinetForm-Field CabinetForm-Label"
          @change="item.value = $event"
        >
          {{ item.text }}
        </BaseCheckbox>
      </div>
      <div class="CabinetForm-Row">
        <div v-if="updateProfileError" class="Error ProfilePage-Error">
          {{ updateProfileError }}
        </div>
        <BaseButton class="Btn Btn--darkColor ProfilePage-Btn" :is-loading="profileIsUpdating">
          Save changes
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseDropdown from '@/components/base/BaseDropdown.vue';
import Loader from '@/components/Loader';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseCheckbox from '../../../components/base/BaseCheckbox.vue';

// const info = process.env.NUXT_ENV_MODE === 'sandbox' ? 'fake' : 'real';
// const info = 'fake';

export default {
  name: 'ProfileInfo',
  components: {
    BaseInput,
    BaseCheckbox,
    BaseButton,
    BaseDropdown,
    Loader,
  },
  filters: {
    formatLabel(str) {
      const arr = str.trim().split(' ');
      arr.forEach(word => word.toUpperCase());
      return arr.join('');
    },
  },
  middleware: 'clearUpdateProfileError',
  data() {
    return {
      fields: {},
      fakeFields: {
        email: 'fillypkfillypk@gmail.com',
        firstName: 'Fillyp',
        lastName: 'Fillypkin',
        birthDate: '1979-01-04',
        gender: 'male',
        country: 'RUS',
        city: 'Moscow',
        address: '-',
        postalCode: '864520',
        mobile: '+3588****89',
      },
      subscriptions: {
        byEmail: {
          value: true,
          text: 'Send promos by e-mail',
        },
        bySms: {
          value: true,
          text: 'Send promos by sms',
        },
      },
    };
  },
  computed: {
    ...mapState(['profileIsLoading', 'profileIsUpdating', 'updateProfileError', 'countriesList']),
    ...mapGetters(['userInfo', 'countriesNames']),
    // fields() {
    //   return info === 'real' ? this.userInfo : this.fakeFields;
    // },
  },
  watch: {
    userInfo: {
      immediate: true,
      handler() {
        console.log(this.userInfo);
        this.fields = { ...this.userInfo };
      },
    },
  },
  methods: {
    ...mapMutations(['clearUpdateProfileError']),
    ...mapActions(['updateProfile']),
    onSubmit() {
      if (JSON.stringify(this.fields) === JSON.stringify(this.userInfo)) return;
      const payload = {};
      for (const key in this.fields) {
        if (key === 'country') {
          const entry = Object.entries(this.countriesList).find(i => i[1] === this.fields.country);
          payload.country = entry[0];
        } else payload[key] = this.fields[key];
      }

      payload.receiveEmailPromos = this.subscriptions.byEmail.value;
      payload.receiveSmsPromos = this.subscriptions.bySms.value;
      this.updateProfile(payload);
    },
  },
};
</script>

<style lang="scss">
.ProfileInfo {
  &-Fields {
    margin-bottom: 24px;
  }

  &-Subscriptions {
    margin-bottom: 18px;
  }
}

.CabinetForm {
  &-Row {
    position: relative;
    display: flex;
    width: 100%;
    height: 55px;
    margin-bottom: 4px;

    &--right {
      justify-content: flex-end;
    }
  }

  &-Wrapper {
    width: 100%;
  }

  &-Label {
    width: 105px / 320px * 100%;
    margin-right: 4px;
    padding: 0 16px;
    font-size: 10px;
    font-weight: 700;
    line-height: 55px;
    color: var(--color-text-ghost);
    text-transform: uppercase;
    white-space: nowrap;
    background-color: var(--color-bg);
  }

  &-CheckboxLabel {
    position: relative;
    width: 100%;
    margin-left: 59px;
    padding-left: 20px;

    &:before {
      top: calc(50% - 8.5px);
      left: -39px;
      z-index: 1;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: -59px;
      width: 55px;
      height: 100%;
      background-color: var(--color-bg);
    }
  }

  &-Input {
    height: 100%;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-main);
    background: var(--color-bg);
    border: none;

    @media (min-width: $screen-s) {
      font-size: 12px;
    }

    &:disabled {
      color: var(--color-text-ghost);
    }

    &::placeholder {
      font-size: 10px;
      font-weight: 700;
      color: var(--color-text-ghost);
      text-transform: uppercase;
    }

    &--verified {
      padding-right: 92px;
    }
  }

  &-Checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:checked + .CabinetForm-Custom:before {
      background-image: url("data:image/svg+xml,%3Csvg width='7' height='6' viewBox='0 0 7 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.75926 1.65079C7.11868 1.23147 7.07012 0.600166 6.65079 0.240743C6.23147 -0.118679 5.60017 -0.0701173 5.24074 0.349209L6.75926 1.65079ZM3 4.5L2.28976 5.20396C2.48638 5.40234 2.75702 5.50945 3.03616 5.49935C3.31529 5.48925 3.57748 5.36286 3.75926 5.15079L3 4.5ZM1.71024 1.77819C1.32146 1.38593 0.688299 1.38312 0.296043 1.7719C-0.0962134 2.16069 -0.0990272 2.79384 0.289758 3.1861L1.71024 1.77819ZM3.71024 3.79604L1.71024 1.77819L0.289758 3.1861L2.28976 5.20396L3.71024 3.79604ZM5.24074 0.349209L2.24074 3.84921L3.75926 5.15079L6.75926 1.65079L5.24074 0.349209Z' fill='%230E152F'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;
      background-position: center center;
    }

    + .CabinetForm-Custom:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 17px;
      height: 17px;
      background: var(--color-main1);
      transform: translate(-50%, -50%);
    }
  }

  &-Custom {
    position: relative;
    width: 55px;
    height: 55px;
    margin-right: 4px;
    background: var(--color-bg);
  }

  &-CustomLabel {
    user-select: none;
  }

  &-Icon {
    margin-left: 10px;
  }

  &-Verified {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 2;
    display: flex;
    align-items: center;
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-ghost);
    text-transform: uppercase;
  }

  &-Error {
    position: absolute;
    top: -13px;
    left: 0;
  }

  &-Dropdown {
    font-size: 12px;
    text-transform: capitalize;
  }
}
</style>
