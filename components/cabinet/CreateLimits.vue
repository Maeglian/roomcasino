<template>
  <div class="Modal">
    <div class="Close Modal-Close" @click="$emit('close')"></div>
    <div v-if="!isConfirm" class="CreateLimits">
      <div class="CabinetPage-Header CabinetPage-Section">
        <template v-if="isEdit"> Edit {{ item.type }} limits </template>
        <template v-else>
          Create limits
        </template>
      </div>
      <BaseDropdown
        v-if="!isEdit"
        class="CabinetPage-Dropdown CabinetPage-Section"
        :items="limitTypes"
        @set-dropdown-value="currentLimitType = $event"
      />
      <div class="CabinetPage-Section CabinetPage-Text CreateLimits-Text">
        {{ limits[currentLimitType].text }}
      </div>
      <div
        v-if="
          currentLimitType === 'loss' ||
            currentLimitType === 'wager' ||
            currentLimitType === 'deposit'
        "
        class="CreateLimits-Row"
      >
        <BaseInput
          v-model.number="limitAmount"
          class="CreateLimits-Amount"
          input-type="text"
          input-class="CreateLimits-Input"
        >
          <template #afterInput-absolute>
            <span class="CreateLimits-InputCurrency">
              {{ currency }}
            </span>
          </template>
        </BaseInput>
        <BaseDropdown
          v-model="currentPeriod"
          class="CreateLimits-Period"
          :items="periods"
          @set-dropdown-value="currentPeriod = $event"
        />
      </div>
      <BaseInput
        v-if="currentLimitType === 'session'"
        v-model.number="limitAmount"
        input-type="text"
        class="CreateLimits-Row CreateLimits-Amount"
        input-class="CreateLimits-Input"
      >
        <template #afterInput-absolute>
          <span class="CreateLimits-InputCurrency">
            min
          </span>
        </template>
      </BaseInput>
      <BaseDropdown
        v-if="currentLimitType === 'reality_check'"
        v-model="period"
        class="CreateLimits-Row CabinetPage-Dropdown CabinetPage-Section"
        :items="realityCheckPeriods"
        @set-dropdown-value="period = $event"
      />
      <BaseDropdown
        v-if="currentLimitType === 'self_exclusion'"
        v-model="period"
        class="CreateLimits-Row CabinetPage-Dropdown CabinetPage-Section"
        :items="selfExclusionPeriods"
        @set-dropdown-value="period = $event"
      />
      <button class="Btn Btn--full Btn--color CreateLimits-Btn" @click="onClickLimitBtn()">
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
        :text="`Are you sure you want to set ${currentLimitType} limit to ${limitAmount}?`"
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
import { mapMutations, mapState } from 'vuex';
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
        loss: {
          name: 'Loss limits',
          text:
            'Your account can be set with loss limits. This setting limits the amount you can lose per day, week or mounth.',
          fields: ['limitState', 'limitAmount', 'currentPeriod', 'isMoney', 'reset', 'title'],
        },
        wager: {
          name: 'Wager limits',
          text:
            'Your account can be set with wager limits. This setting controls the amount of money you can wager per day, week or mounth.',
          fields: ['limitState', 'limitAmount', 'currentPeriod', 'isMoney', 'reset', 'title'],
        },
        deposit: {
          name: 'Deposit limits',
          text:
            'Your account can be set with deposit limits. This setting limits  the amount you can deposit per day, week or mounth.',
          fields: ['limitState', 'limitAmount', 'currentPeriod', 'isMoney', 'reset', 'title'],
        },
        session: {
          name: 'Session limit',
          title: 'time spent gambling',
          text:
            'The restriction takes effect instantly. If you hit the limit, you will beautomatically logged out of your  account.',
          fields: ['limitState', 'limitAmount', 'isMoney', 'title'],
        },
        self_exclusion: {
          name: 'Self exclusion',
          title: 'blocked address',
          text:
            'You can set a self-exclusion limit for a definite or an indefinite period of time.  During the set period you will not be able to log into your account. To be excluded from gambiling on our site for an indefinite period of time, please, contact our support team via live-chat.',
          fields: ['isMoney', 'title', 'period'],
        },
        reality_check: {
          name: 'Reality check',
          title: 'notification',
          text:
            "Do you want to track your activity? We'llsend you  an hourly notification in-game to remnd you of how much you have spent at the Casino. It'll help you to get an overview of your gambing and perhaps consider pausing play for a while. You can get the notification every 15,30,45 and 60 minutes.",
          fields: ['isMoney', 'title', 'period'],
        },
      },
      currentLimitType: this.item.type || 'loss',
      limitAmount: this.item.limitAmount || 0,
      periods: ['daily', 'weekly', 'monthly'],
      currentPeriod: this.item.currentPeriod || 'daily',
      realityCheckPeriods: ['none', '30 min', '60 min', '120 min'],
      selfExclusionPeriods: ['none', '1 day', '1 week', '1 month', '6 month', '1 year'],
      period: this.item.period || 'none',
      limitState: this.item.limitState || 0,
    };
  },
  computed: {
    ...mapState(['currency']),
    limitTypes() {
      return Object.keys(this.limits);
    },
    isMoney() {
      if (
        this.currentLimitType === 'session' ||
        this.currentLimitType === 'self_exclusion' ||
        this.currentLimitType === 'reality_check'
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
      return this.limits[this.currentLimitType].title || `${this.currentPeriod} limit`;
    },
  },
  methods: {
    ...mapMutations(['addLimits']),
    onClickLimitBtn() {
      if (this.isEdit && !this.isConfirm) {
        this.isConfirm = true;
        return;
      }

      const limit = {
        content: {},
      };

      if (!this.isEdit) limit.name = this.limits[this.currentLimitType].name;

      limit.content.type = this.currentLimitType;

      this.limits[this.currentLimitType].fields.forEach(field => {
        limit.content[field] = this[field];
      });

      if (this.isEdit) {
        this.onUpdateLimit(limit);
      } else this.addLimits(limit);
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
    font-size: 10px;
  }

  &-Amount {
    flex-grow: 1;
    margin-right: 4px;
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
    margin-top: 4px;
    font-size: 12px;
  }
}
</style>
