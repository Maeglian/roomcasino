<template>
  <div class="Modal">
    <div class="Close Modal-Close" @click="$emit('close')"></div>
    <div v-if="!isConfirm" class="CreateLimits">
      <div class="CabinetPage-Header CabinetPage-Section">
        <template v-if="isEdit">
          {{ $t('buttons.edit') }} {{ $t(`profile.limits.limits.${type.value}.name`) }}
        </template>
        <template v-else> {{ $t('profile.limits.createLimits') }} </template>
      </div>
      <BaseDropdown
        v-if="!isEdit"
        v-model="type"
        class="CabinetPage-Dropdown CabinetPage-Section"
        :items="limitTypes"
        @set-dropdown-value="type = $event"
      />
      <div class="CabinetPage-Section CabinetPage-Text CreateLimits-Text">
        {{ $t(`profile.limits.limits.${type.value}.text`) }}
      </div>
      <div
        v-if="
          type.value === 'lossLimit' || type.value === 'wagerLimit' || type.value === 'depositLimit'
        "
        class="CreateLimits-Row"
      >
        <BaseInput
          v-model="currencyLimitList[0].value"
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
            <span class="CreateLimits-InputCurrency"> {{ $t('profile.limits.periods.min') }} </span>
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
        class="Btn Btn--common Btn--full Btn--color Btn--bottomCorners CreateLimits-Btn"
        @click="onClickLimitBtn"
      >
        <template v-if="isEdit"> {{ $t('profile.limits.save') }} </template>
        <template v-else> {{ $t('profile.limits.addLimits') }} </template>
      </button>
    </div>
    <div v-else>
      <ConfirmDialog
        :title="$t('profile.limits.confirmUpdate')"
        :text="
          `${$t('profile.limits.sureSet')} ${$t(`profile.limits.limits.${type.value}.name`)}? ${$t(
            `profile.limits.limits.${type.value}.editRules`,
          )}`
        "
        :ok-btn-text="$t('profile.limits.setLimit')"
        @cancel="$emit('close')"
        @ok="onClickLimitBtn"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import moment from 'moment';
import { maxLength } from 'vuelidate/lib/validators';
import BaseDropdown from '@/components/base/BaseDropdown';
import BaseInput from '@/components/base/BaseInput';
import ConfirmDialog from '@/components/profile/ConfirmDialog';
import { LIMIT_DETAILS } from '@/config';
import { findValInArr } from '@/utils/helpers';
import { checkIfNullOrPositiveNumbers, checkIfPositiveNumbers } from '@/utils/formCheckers';
import limits from '@/mixins/limits';

export default {
  name: 'CreateLimits',
  components: {
    BaseDropdown,
    BaseInput,
    ConfirmDialog,
  },
  mixins: [limits],
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
      type: {},
      limitAmount: this.item.limitAmount || 0,
      currencyLimitList: [
        {
          currency: '',
          value: 0,
        },
      ],
      limitTypes: [
        { name: this.$t('profile.limits.limits.depositLimit.name'), value: 'depositLimit' },
        { name: this.$t('profile.limits.limits.wagerLimit.name'), value: 'wagerLimit' },
        { name: this.$t('profile.limits.limits.lossLimit.name'), value: 'lossLimit' },
        { name: this.$t('profile.limits.limits.sessionLimit.name'), value: 'sessionLimit' },
        { name: this.$t('profile.limits.limits.coolingOffLimit.name'), value: 'coolingOffLimit' },
      ],
      period: {},
      limitCoolPeriods: [
        {
          name: this.$t('profile.limits.periods.days'),
          value: 'dayLimit',
        },
        {
          name: this.$t('profile.limits.periods.weeks'),
          value: 'weekLimit',
        },
        {
          name: this.$t('profile.limits.periods.months'),
          value: 'monthLimit',
        },
      ],
      realityCheckPeriods: ['none', '30 min', '60 min', '120 min'],
      selfExclusionPeriods: ['none', '1 day', '1 week', '1 month', '6 month', '1 year'],
      limitState: this.item.limitState || 0,
      value: 1,
    };
  },
  validations: {
    currencyLimitList: {
      $each: {
        value: { checkIfNullOrPositiveNumbers, maxLength: maxLength(10), numeric: true },
      },
    },
    value: { checkIfPositiveNumbers },
  },
  computed: {
    ...mapState('profile', ['createLimitError']),
    ...mapGetters(['activeAccount']),
    // limitTypes() {
    //   return Object.entries(this.limits).map(entry => {
    //     return {
    //       value: entry[0],
    //       name: entry[1].name,
    //     };
    //   });
    // },
    isMoney() {
      return !(
        this.type.value === 'sessionLimit' ||
        this.type.value === 'self_exclusion' ||
        this.type.value === 'reality_check'
      );
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
          this.period = findValInArr('dayLimit', this.limitCoolPeriods);
          this.periods = this.limitCoolPeriods;
        }
      },
    },
  },
  created() {
    this.currencyLimitList[0].currency = this.activeAccount.currency;
    this.currencyLimitList[0].value = this.item.targetValue || 0;
    this.type =
      findValInArr(this.item.type, this.limitTypes) ||
      findValInArr('depositLimit', this.limitTypes);
    this.period =
      findValInArr(this.item.period, this.periods) || findValInArr('dayLimit', this.periods);
  },
  // watch: {
  //   accountList: {
  //     immediate: true,
  //   },
  // },
  methods: {
    ...mapMutations(['pushNotificationAlert']),
    ...mapActions('profile', ['addLimit', 'getLimits']),
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
    top: 50%;
    right: 16px;
    z-index: 2;
    font-size: 10px;
    font-weight: 700;
    line-height: 55px;
    color: var(--color-text-ghost);
    text-transform: uppercase;
    transform: translate(0, -50%);
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
