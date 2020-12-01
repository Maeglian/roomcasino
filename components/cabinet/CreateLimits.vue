<template>
  <div class="Modal">
    <div class="Close Modal-Close" @click="$emit('close')"></div>
    <div v-if="!isConfirm" class="CreateLimits">
      <div class="CabinetPage-Header CabinetPage-Section">
        <template v-if="isEdit"> Edit {{ type.name }} </template>
        <template v-else>
          Create limits
        </template>
      </div>
      <BaseDropdown
        v-if="!isEdit"
        v-model="type"
        class="CabinetPage-Dropdown CabinetPage-Section"
        :items="limitTypes"
        @set-dropdown-value="type = $event"
      />
      <div class="CabinetPage-Section CabinetPage-Text CreateLimits-Text">
        {{ limits[type.value].text }}
      </div>
      <div
        v-if="
          type.value === 'lossLimit' || type.value === 'wagerLimit' || type.value === 'depositLimit'
        "
        class="CreateLimits-Row"
      >
        <BaseInput
          v-model.number="currencyLimitList[0].value"
          class="CreateLimits-Amount"
          input-type="text"
          input-class="CreateLimits-Input"
        >
          <template #afterInput-absolute>
            <span class="CreateLimits-InputCurrency">
              {{ currencyLimitList[0].currency }}
            </span>
          </template>
        </BaseInput>
        <BaseDropdown
          v-model="period"
          class="CreateLimits-Period"
          :items="periods"
          @set-dropdown-value="period = $event"
        />
      </div>
      <BaseInput
        v-if="type.value === 'sessionLimit'"
        v-model.number="limitAmount"
        input-type="text"
        class="CreateLimits-Field CreateLimits-Amount"
        input-class="CreateLimits-Input"
      >
        <template #afterInput-absolute>
          <span class="CreateLimits-InputCurrency">
            min
          </span>
        </template>
      </BaseInput>
      <BaseDropdown
        v-if="type.value === 'reality_check'"
        v-model="period"
        class="CreateLimits-Row CabinetPage-Dropdown CabinetPage-Section"
        :items="realityCheckPeriods"
        @set-dropdown-value="period = $event"
      />
      <BaseDropdown
        v-if="type.value === 'self_exclusion'"
        v-model="period"
        class="CreateLimits-Row CabinetPage-Dropdown CabinetPage-Section"
        :items="selfExclusionPeriods"
        @set-dropdown-value="period = $event"
      />
      <button class="Btn Btn--full Btn--color CreateLimits-Btn" @click="onClickLimitBtn">
        <template v-if="isEdit">
          Save limits
        </template>
        <template v-else>
          Add limits
        </template>
      </button>
    </div>
    <div v-else>
      <ConfirmDialog
        title="Confirm limit update"
        :text="`Are you sure you want to set ${type.name}?`"
        ok-btn-text="set limit"
        @cancel="$emit('close')"
        @ok="onClickLimitBtn"
      />
    </div>
  </div>
</template>

<script>
import BaseDropdown from '@/components/base/BaseDropdown';
import BaseInput from '@/components/base/BaseInput';
import ConfirmDialog from '@/components/cabinet/ConfirmDialog';
import { LIMIT_PERIODS, LIMIT_TYPES } from '@/config';
import { findValInArr } from '@/utils/helpers';
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'CreateLimits',
  components: {
    BaseDropdown,
    BaseInput,
    ConfirmDialog,
  },
  props: {
    isEdit: {
      type: Boolean,
      isRequired: false,
      default: false,
    },
    item: {
      type: Object,
      isRequired: false,
      default: () => ({}),
    },
    onUpdateLimit: {
      type: [Function, Boolean],
      isRequired: false,
      default: false,
    },
  },
  data() {
    return {
      isConfirm: false,
      limits: {
        // loss: {
        //   name: 'Loss limits',
        //   text:
        //     'Your account can be set with loss limits. This setting limits the amount you can lose per day, week or mounth.',
        //   fields: ['limitState', 'limitAmount', 'currentPeriod', 'isMoney', 'reset', 'title'],
        // },
        // wager: {
        //   name: 'Wager limits',
        //   text:
        //     'Your account can be set with wager limits. This setting controls the amount of money you can wager per day, week or mounth.',
        //   fields: ['limitState', 'limitAmount', 'currentPeriod', 'isMoney', 'reset', 'title'],
        // },
        depositLimit: {
          name: 'Deposit limits',
          text:
            'Your account can be set with deposit limits. This setting limits  the amount you can deposit per day, week or mounth.',
          fields: ['type', 'period', 'currencyLimitList'],
        },
        sessionLimit: {
          name: 'Session limit',
          title: 'time spent gambling',
          text:
            'The restriction takes effect instantly. If you hit the limit, you will be automatically logged out of your  account.',
          fields: ['type', 'limitState', 'limitAmount', 'isMoney', 'title'],
        },
        // self_exclusion: {
        //   name: 'Self exclusion',
        //   title: 'blocked address',
        //   text:
        //     'You can set a self-exclusion limit for a definite or an indefinite period of time.  During the set period you will not be able to log into your account. To be excluded from gambiling on our site for an indefinite period of time, please, contact our support team via live-chat.',
        //   fields: ['isMoney', 'title', 'period'],
        // },
        // reality_check: {
        //   name: 'Reality check',
        //   title: 'notification',
        //   text:
        //     "Do you want to track your activity? We'll send you  an hourly notification in-game to remind you of how much you have spent at the Casino. It'll help you to get an overview of your gambing and perhaps consider pausing play for a while. You can get the notification every 15,30,45 and 60 minutes.",
        //   fields: ['isMoney', 'title', 'period'],
        // },
      },
      type: findValInArr(this.item.type, LIMIT_TYPES) || findValInArr('depositLimit', LIMIT_TYPES),
      limitAmount: this.item.limitAmount || 0,
      currencyLimitList: [{}],
      periods: LIMIT_PERIODS,
      period:
        findValInArr(this.item.period, LIMIT_PERIODS) || findValInArr('dailyLimit', LIMIT_PERIODS),
      realityCheckPeriods: ['none', '30 min', '60 min', '120 min'],
      selfExclusionPeriods: ['none', '1 day', '1 week', '1 month', '6 month', '1 year'],
      limitState: this.item.limitState || 0,
    };
  },
  created() {
    this.currencyLimitList[0].currency = this.activeAccount.currency;
    this.currencyLimitList[0].value = this.item.targetValue || 0;
  },
  computed: {
    ...mapGetters(['activeAccount', 'accountList']),
    limitTypes() {
      return Object.entries(this.limits).map(entry => {
        return {
          value: entry[0],
          name: entry[1].name,
        };
      });
    },
    isMoney() {
      if (
        this.type.value === 'sessionLimit' ||
        this.type.value === 'self_exclusion' ||
        this.type.value === 'reality_check'
      )
        return false;
      return true;
    },
    reset() {
      let date;
      if (this.currentPeriod === 'daily') date = moment().add(1, 'days');
      if (this.currentPeriod === 'weekly') date = moment().add(7, 'days');
      if (this.currentPeriod === 'monthly') date = moment().add(30, 'days');
      return moment(date).format();
    },
    title() {
      return this.limits[this.type.value].title || `${this.currentPeriod} limit`;
    },
  },
  // watch: {
  //   accountList: {
  //     immediate: true,
  //   },
  // },
  methods: {
    ...mapActions(['addLimit', 'getLimits']),
    onClickLimitBtn() {
      if (!this.isConfirm) {
        this.isConfirm = true;
        return;
      }

      const payload = {};

      this.limits[this.type.value].fields.forEach(field => {
        payload[field] = this[field].value || this[field];
      });

      this.addLimit(payload).then(() => {
        this.getLimits();
        this.isConfirm = false;
        this.$emit('close');
      });

      // if (this.isEdit) {
      //   this.onUpdateLimit(limit);
      // } else this.addLimits(limit);
      // this.$emit('close');
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
    flex-wrap: wrap;
    height: 55px;
    margin-bottom: 4px;
  }

  &-Period {
    width: 130px;
    margin-left: 4px;
    font-size: 10px;
    text-transform: uppercase;
  }

  &-Amount {
    flex-grow: 1;
  }

  &-Input {
    padding: 0 50px 0 16px;
    color: var(--color-text-main);
    background: var(--color-bg);
    border: none;
  }

  &-InputCurrency {
    position: absolute;
    right: 16px;
    z-index: 2;
    font-size: 10px;
    font-weight: 700;
    line-height: 55px;
    color: var(--color-text-ghost);
    text-transform: uppercase;
  }

  &-Btn {
    font-size: 12px;
  }
}
</style>
