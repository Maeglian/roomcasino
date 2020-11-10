<template>
<div class="ProfileInfo ProfilePage-Content">
  <form class="ProfileInfo-Form">
    <div class="CabinetPage-Header">
      General Info
    </div>
    <div class="ProfileInfo-Fields">
      <template v-for="(val, name) in fields">
        <BaseInput
          class="CabinetForm-Row"
          :key="name"
          :value="val"
          inputType="text"
          :inputId="name | formatLabel"
          inputClass="CabinetForm-Input"
          wrapperClass="CabinetForm-Wrapper"
        >
          <template v-slot:beforeInput-relative>
            <label
              :for="name | formatLabel"
              class="CabinetForm-Field CabinetForm-Label"
            >
              {{ name }}
            </label>
          </template>
          <template v-if="name === 'mobile'" v-slot:afterInput-absolute>
            <div class="CabinetForm-Verified">
              Verify
              <svg class="CabinetForm-Icon" width="17" height="17" >
                <use xlink:href="@/assets/img/icons.svg#verify"></use>
              </svg>
            </div>
          </template>
        </BaseInput>
<!--        <CabinetInput-->
<!--          :key="name"-->
<!--          :label="name"-->
<!--          :value="val"-->
<!--          type="text"-->
<!--          :verified="name === 'mobile'"-->
<!--        />-->
      </template>
    </div>
    <div class="CabinetPage-Header">
      Subscriptions
    </div>
    <div class="ProfileInfo-Subscriptions">
      <BaseCheckbox
        v-for="(item, name) in subscriptions"
        :key="name"
        type="checkbox"
        class="CabinetForm-Row"
        inputClass="CabinetForm-Checkbox"
        labelClass="CabinetForm-CheckboxLabel CabinetForm-Field CabinetForm-Label"
        v-model="item.value"
        @change="item.value = $event"
      >
        {{ item.text }}
      </BaseCheckbox>
    </div>
    <div class="CabinetForm-Row CabinetForm-Row--right">
      <button type="submit" class="Btn ProfilePage-Btn">
        Save changes
      </button>
    </div>
  </form>
</div>
</template>

<script>
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseCheckbox from '../../../components/base/BaseCheckbox.vue';
import { mapGetters } from 'vuex';

// const info = (process.env.NUXT_ENV_MODE === 'sandbox') ? 'fake' : 'real';
const info = 'fake';

export default {
  name: 'ProfileInfo',
  components: {
    BaseInput,
    BaseCheckbox
  },
  data() {
    return {
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
        }
      }
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    fields() {
      return (info === 'real') ? this.userInfo : this.fakeFields;
    },
  },
  filters: {
    formatLabel(str) {
      const arr = str.trim().split(' ');
      arr.forEach((word) => word.toUpperCase());
      return arr.join('');
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
    text-transform: uppercase;
    color: var(--color-text-ghost);
    background-color: var(--color-bg);
    white-space: nowrap;
  }

  &-CheckboxLabel {
    position: relative;
    width: 100%;
    margin-left: 59px;
    padding-left: 20px;

    &:before {
      z-index: 1;
      top: calc(50% - 8.5px);
      left: -39px;
    }

    &:after {
      content: '';
      position: absolute;
      left: -59px;
      top: 0;
      width: 55px;
      height: 100%;
      background-color: var(--color-bg);
    }
  }

  &-Input {
    height: 100%;
    padding: 0 16px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-main);
    background: var(--color-bg);

    &--verified {
      padding-right: 92px;
    }
  }

  &-Checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;

    + .CabinetForm-Custom:before {
      position: absolute;
      top: 50%;
      left: 50%;
      content: '';
      display: block;
      width: 17px;
      height: 17px;
      background: var(--color-main1);
      transform: translate(-50%, -50%);
    }

    &:checked + .CabinetForm-Custom:before {
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("data:image/svg+xml,%3Csvg width='7' height='6' viewBox='0 0 7 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.75926 1.65079C7.11868 1.23147 7.07012 0.600166 6.65079 0.240743C6.23147 -0.118679 5.60017 -0.0701173 5.24074 0.349209L6.75926 1.65079ZM3 4.5L2.28976 5.20396C2.48638 5.40234 2.75702 5.50945 3.03616 5.49935C3.31529 5.48925 3.57748 5.36286 3.75926 5.15079L3 4.5ZM1.71024 1.77819C1.32146 1.38593 0.688299 1.38312 0.296043 1.7719C-0.0962134 2.16069 -0.0990272 2.79384 0.289758 3.1861L1.71024 1.77819ZM3.71024 3.79604L1.71024 1.77819L0.289758 3.1861L2.28976 5.20396L3.71024 3.79604ZM5.24074 0.349209L2.24074 3.84921L3.75926 5.15079L6.75926 1.65079L5.24074 0.349209Z' fill='%230E152F'/%3E%3C/svg%3E%0A");
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
    z-index: 2;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-ghost);
  }
}
</style>
