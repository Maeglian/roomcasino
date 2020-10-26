<template>
<div class="ProfileInfo ProfilePage-Content">
  <form class="ProfileInfo-Form">
    <div class="CabinetPage-Header">
      General Info
    </div>
    <div class="ProfileInfo-Fields">
      <template v-for="field in fields">
        <CabinetInput
          :key="field.label"
          :label="field.label"
          :value="field.value"
          :type="field.type"
          :verified="field.verified"
        />
      </template>
    </div>
    <div class="CabinetPage-Header">
      Subscriptions
    </div>
    <div class="ProfileInfo-Subscriptions">
      <label class="CabinetForm-Row">
        <input
          class="CabinetForm-Checkbox"
          type="checkbox"
        />
        <div class="CabinetForm-Custom">
        </div>
        <div class="CabinetForm-CustomLabel CabinetForm-Field CabinetForm-Label">
          Send promos by e-mail
        </div>
      </label>
      <label class="CabinetForm-Row">
        <input
          class="CabinetForm-Checkbox"
          type="checkbox"
        />
        <div class="CabinetForm-Custom">
        </div>
        <div class="CabinetForm-CustomLabel CabinetForm-Field CabinetForm-Label">
          Send promos by sms
        </div>
      </label>
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
import CabinetInput from '@/components/CabinetInput.vue';

const fields = [
  {
    label: 'First name',
    value: 'Fillyp',
  },
  {
    label: 'Last name',
    value: 'Fillypkin',
  },
  {
    label: 'Date of birth',
    value: 'Fillypkin',
  },
  {
    label: 'Gender',
    value: 'Male',
  },
  {
    label: 'Email',
    value: 'fillypkfillypk@gmail.com',
    type: 'email',
  },
  {
    label: 'Country',
    value: 'Finland',
  },
  {
    label: 'City',
    value: 'Finland',
  },
  {
    label: 'Address',
    value: '-',
  },
  {
    label: 'Postal code',
    value: '864520',
  },
  {
    label: 'Mobile phone',
    value: '+3588****89',
    verified: true,
  },
];

export default {
  name: 'ProfileInfo',
  components: {
    CabinetInput,
  },
  data() {
    return {
      fields,
    };
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
</style>
