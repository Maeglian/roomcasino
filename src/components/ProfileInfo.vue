<template>
<div class="ProfileInfo ProfilePage-Content">
  <form class="ProfileInfo-Form">
    <div class="CabinetPage-Header">
      General Info
    </div>
    <div class="ProfileInfo-Fields">
      <div v-for="field in fields" :key="field.label" class="ProfileInfo-Row">
        <CabinetInput
          :label="field.label"
          :value="field.value"
          :type="field.type"
          :verified="field.verified"
        />
      </div>
    </div>
    <div class="CabinetPage-Header">
      Subscriptions
    </div>
    <div class="ProfileInfo-Subscriptions">
      <label class="ProfileInfo-Row">
        <input
          class="ProfileInfo-Checkbox"
          type="checkbox"
        />
        <div class="ProfileInfo-Custom">
        </div>
        <div class="ProfileInfo-CustomLabel ProfileInfo-Field ProfileInfo-Label">
          Send promos by e-mail
        </div>
      </label>
      <label class="ProfileInfo-Row">
        <input
          class="ProfileInfo-Checkbox"
          type="checkbox"
        />
        <div class="ProfileInfo-Custom">
        </div>
        <div class="ProfileInfo-CustomLabel ProfileInfo-Field ProfileInfo-Label">
          Send promos by sms
        </div>
      </label>
    </div>
    <div class="ProfileInfo-Row ProfileInfo-Row--right">
      <button type="submit" class="Btn ProfileInfo-Btn">
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

  &-Btn {
    padding: 20px 30px;
    font-size: 12px;
    background: rgba(235, 28, 42, 0.4);
  }

  &-Verified {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-ghost);
  }

  &-Icon {
    margin-left: 10px;
  }
}
</style>
