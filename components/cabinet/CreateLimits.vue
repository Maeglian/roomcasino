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
          error-class="CreateLimits-Error"
          input-class="CreateLimits-Input"
          :v="$v.currencyLimitList.$each.$iter[0].value"
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
      <div
        v-if="type.value === 'sessionLimit' || type.value === 'coolingOffLimit'"
        class="CreateLimits-Row"
      >
        <BaseInput
          v-model.number="value"
          input-type="text"
          class="CreateLimits-Field CreateLimits-Amount CreateLimits-Row"
          error-class="CreateLimits-Error"
          input-class="CreateLimits-Input"
          :v="$v.value"
        >
          <template v-if="type.value === 'sessionLimit'" #afterInput-absolute>
            <span class="CreateLimits-InputCurrency">
              min
            </span>
          </template>
        </BaseInput>
        <BaseDropdown
          v-if="type.value === 'coolingOffLimit'"
          v-model="period"
          class="CreateLimits-Period"
          :items="periods"
          @set-dropdown-value="period = $event"
        />
      </div>
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
      <button
        class="Btn Btn--common Btn--full Btn--color CreateLimits-Btn"
        @click="onClickLimitBtn"
      >
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
        :text="`Are you sure you want to set ${type.name}? ${limits[type.value].editRules}`"
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
import { LIMIT_PERIODS, LIMIT_TYPES, LIMIT_DETAILS, LIMIT_COOL_PERIODS } from '@/config';
import { findValInArr } from '@/utils/helpers';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import moment from 'moment';
import { checkIfNullOrPositiveNumbers, checkIfPositiveNumbers } from '@/utils/formCheckers';

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
      limits: LIMIT_DETAILS,
      type: findValInArr(this.item.type, LIMIT_TYPES) || findValInArr('depositLimit', LIMIT_TYPES),
      limitAmount: this.item.limitAmount || 0,
      currencyLimitList: [
        {
          currency: '',
          value: 0,
        },
      ],
      limitTypes: LIMIT_TYPES,
      periods: LIMIT_PERIODS,
      period:
        findValInArr(this.item.period, LIMIT_PERIODS) || findValInArr('dayLimit', LIMIT_PERIODS),
      realityCheckPeriods: ['none', '30 min', '60 min', '120 min'],
      selfExclusionPeriods: ['none', '1 day', '1 week', '1 month', '6 month', '1 year'],
      limitState: this.item.limitState || 0,
      value: 1,
    };
  },
  validations: {
    currencyLimitList: {
      $each: {
        value: { checkIfNullOrPositiveNumbers },
      },
    },
    value: { checkIfPositiveNumbers },
  },
  computed: {
    ...mapState(['createLimitError']),
    ...mapGetters(['activeAccount', 'accountList']),
    // limitTypes() {
    //   return Object.entries(this.limits).map(entry => {
    //     return {
    //       value: entry[0],
    //       name: entry[1].name,
    //     };
    //   });
    // },
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
  },
  watch: {
    type: {
      immediate: true,
      handler() {
        if (this.type.value === 'coolingOffLimit') {
          this.period = findValInArr('dayLimit', LIMIT_COOL_PERIODS);
          this.periods = LIMIT_COOL_PERIODS;
        }
      },
    },
  },
  created() {
    this.currencyLimitList[0].currency = this.activeAccount.currency;
    this.currencyLimitList[0].value = this.item.targetValue || 0;
  },
  // watch: {
  //   accountList: {
  //     immediate: true,
  //   },
  // },
  methods: {
    ...mapMutations(['pushNotificationAlert']),
    ...mapActions(['addLimit', 'getLimits']),
    onClickLimitBtn() {
      this.$v.$touch();
      if (this.$v.$error) return;

      if (!this.isConfirm) {
        this.isConfirm = true;
        return;
      }

      const payload = {};

      this.limits[this.type.value].fields.forEach(field => {
        payload[field] = this[field].value || this[field];
      });

      if (this.type.value === 'sessionLimit') payload.period = 'noLimit';

      this.addLimit(payload).then(() => {
        if (this.createLimitError) {
          this.$emit('close');
          this.pushNotificationAlert({
            type: 'error',
            text: this.createLimitError,
          });
        } else {
          if (this.isEdit) {
            this.pushNotificationAlert({
              type: 'success',
              text: `You successfully edited your limit. ${
                LIMIT_DETAILS[this.item.type].editRules
              }`,
            });
          }
          this.getLimits();
          this.isConfirm = false;
          this.$emit('close');
        }
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

  &-Error {
    position: absolute;
    top: 2px;
    left: 5px;
    z-index: 2;
  }

  &-Btn {
    font-size: 12px;
  }
}
</style>
