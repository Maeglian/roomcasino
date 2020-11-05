<template>
<div class="ProfileInfo ProfilePage-Content">
  <form class="ProfileInfo-Form">
    <div class="CabinetPage-Header">
      General Info
    </div>
    <div class="ProfileInfo-Fields">
      <template v-for="(val, name) in fields">
        <CabinetInput
          :key="name"
          :label="name"
          :value="val"
          type="text"
          :verified="name === 'mobile'"
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
import CabinetInput from '@/components/cabinet/CabinetInput.vue';
import { mapGetters } from 'vuex';

const mode = process.env.NODE_ENV;
const devLocal = process.env.VUE_APP_DEV_LOCAL;
const info = (devLocal || mode === 'production') ? 'real' : 'fake';

export default {
  name: 'ProfileInfo',
  components: {
    CabinetInput,
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
</style>
