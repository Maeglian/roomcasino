<template>
  <div class="CreateLimits">
    <div class="CabinetPage-Header CabinetPage-Section">
      Create limits
    </div>
    <BaseDropdown
      class="CabinetPage-Dropdown CabinetPage-Section"
      :items="limitTypes"
      @set-dropdown-value="currentLimitType = $event"
    />
    <div class="CabinetPage-Section CabinetPage-Text CreateLimits-Text">
      {{ limitOptions[currentLimitType].text }}
    </div>
    <div
      v-if="currentLimitType === 'Loss limits' || currentLimitType === 'Wager limits' || currentLimitType === 'Deposit limits'"
      class="CreateLimits-Row"
    >
      <BaseInput
        class="CreateLimits-Amount"
        blockClass="CreateLimits"
        v-model="limitAmount"
        :clarification="currency"
      />
      <BaseDropdown
        class="CreateLimits-Period"
        v-model="currentPeriod"
        :items="periods"
        @set-dropdown-value="currentPeriod = $event"
      />
    </div>
    <button
      class="Btn Btn--full Btn--color CreateLimits-Btn"
      @click="onAddLimit()"
    >
      Add limits
    </button>
  </div>
</template>

<script>
import BaseDropdown from '@/components/base/BaseDropdown.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'CreateLimits',
  components: {
    BaseDropdown,
    BaseInput,
  },
  data() {
    return {
      limitTypes: ['Loss limits', 'Wager limits', 'Deposit limits', 'Session limit', 'Self exclusion', 'Reality check'],
      limitOptions: {
        'Loss limits': {
          text: 'Your account can be set with loss limits. This setting limits the amount you can lose per day, week or mounth.',
          fields: ['limitAmount', 'currentPeriod'],
        },
        'Wager limits': {
          name: 'Wager limits',
          text: 'Your account can be set with wager limits. This setting controls the amount of money you can wager per day, week or mounth.',
          fields: ['limitAmount', 'currentPeriod'],
        },
        'Deposit limits': {
          name: 'Deposit limits',
          text: 'Your account can be set with deposit limits. This setting limits  the amount you can deposit per day, week or mounth.',
          fields: ['limitAmount', 'currentPeriod'],
        },
        'Session limit': {
          name: 'Session limit',
          text: 'The restriction takes effect instantly. If you hit the limit, you will beautomatically logged out of your  account.',
        },
        'Self exclusion': {
          name: 'Self exclusion',
          text: 'You can set a self-exclusion limit for a definite or an indefinite period of time.  During the set period you will not be able to log into your account. To be excluded from gambiling on our site for an indefinite period of time, please, contact our support team via live-chat.',
        },
        'Reality check': {
          name: 'Reality check',
          text: 'Do you want to track your activity? We\'llsend you  an hourly notification in-game to remnd you of how much you have spent at the Casino. It\'ll help you to get an overview of your gambing and perhaps consider pausing play for a while. You can get the notification every 15,30,45 and 60 minutes.',
        },
      },
      currentLimitType: 'Loss limits',
      limitAmount: 0,
      periods: ['daily', 'weekly', 'monthly'],
      currentPeriod: 'daily',
    };
  },
  computed: {
    ...mapState(['currency']),
  },
  methods: {
    ...mapMutations(['addLimits']),
    onAddLimit() {
      const limit = {
        name: this.currentLimitType,
        content: {},
      };

      this.limitOptions[this.currentLimitType].fields.forEach((field) => {
        limit.content[field] = this[field];
      });

      this.addLimits(limit);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
.CreateLimits {
  height: 100%;
  background: var(--color-body);

  &-Text {
    padding: 16px;
  }

  &-Row {
    display: flex;
    height: 55px;
  }

  &-Period {
    width: 130px;
  }

  &-Amount {
    flex-grow: 1;
    margin-right: 4px;
  }

  &-Input {
    padding: 0 50px 0 16px;
  }

  &-Сlarification {
    right: 16px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 55px;
    color: var(--color-text-ghost);
  }

  &-Btn {
    margin-top: 4px;
  }
}
</style>
