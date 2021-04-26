<template>
  <div class="CashierForm">
    <modal
      name="cashier"
      :height="'auto'"
      width="400px"
      adaptive
      scrollable
      @before-open="beforeInitializeCashier()"
      @closed="onCloseCashierForm()"
    >
      <div class="Modal">
        <div class="Close Modal-Close Modal-Close--thick" @click="$modal.hide('cashier')" />
        <Loader v-if="billingSessionIsLoading || cashierIsLoading" class="CashierForm-Loader" />
        <div id="cashier" class="CashierForm-Content"></div>
      </div>
    </modal>
    <BaseModal name="goPlay" class="CashierForm-GoPlay" :ok-btn="false" :width="300">
      <div class="Modal-Title">{{ $t('modals.congratulations') }}!</div>
      <div class="Modal-Text">{{ $t('modals.playGame') }}.</div>
      <NuxtLink
        class="Btn Btn--common CashierForm-Btn"
        :to="localePath({ path: '/', hash: '#games' })"
        @click.native="$modal.hide('goPlay')"
      >
        {{ $t('buttons.playNow') }}
      </NuxtLink>
    </BaseModal>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import Loader from '@/components/Loader';
import BaseModal from '@/components/base/BaseModal';
import showAuthDialog from '@/mixins/showAuthDialog';

const billingSession =
  process.env.NUXT_ENV_MODE === 'sandbox' ? 'fakeBillingSession' : 'billingSession';

const environment = process.env.NUXT_ENV_MODE === 'production' ? 'production' : 'test';

export default {
  name: 'CashierForm',
  components: {
    Loader,
    BaseModal,
  },
  mixins: [showAuthDialog],
  data() {
    return {
      cashierIsLoading: false,
      depositIsDone: false,
    };
  },
  computed: {
    ...mapState([
      'availableBonusList',
      'billingSession',
      'billingSessionIsLoading',
      'getBillingSessionError',
      'fakeBillingSession',
      'shouldCashout',
      'user',
    ]),
    ...mapGetters(['activeAccount']),
  },
  methods: {
    ...mapMutations(['setCashoutFalse', 'pushNotificationAlert']),
    ...mapActions([
      'getBillingSession',
      'getBonusList',
      'getAvailableBonusList',
      'getProfile',
      'getBonusHistoryList',
    ]),
    async beforeInitializeCashier(event) {
      try {
        await this.getBillingSession();
        if (this.getBillingSessionError)
          this.pushNotificationAlert({ type: 'error', text: this.getBillingSessionError });

        if (this.billingSession.needPlayerProfileData) {
          this.showRegistrationDialog('registration', true);
          event.cancel();
        }
      } catch {
        this.$modal.hide('cashier');
      }

      this.cashierIsLoading = true;

      const method = this.shouldCashout ? 'withdrawal' : 'deposit';

      // eslint-disable-next-line no-unused-vars
      const CashierInstance = new this.$_Cashier(
        '#cashier',
        {
          merchantId: this[billingSession].merchantId,
          userId: this[billingSession].userId,
          sessionId: this[billingSession].sessionId,
          environment,
          fetchConfig: true,
          method,
          locale: `${this.$i18n.locale}_${this.user.country}`,
          containerMinHeight: '700px',
        },
        api => {
          api.on({
            cashierInitLoad: () => {
              console.log('Cashier init load');
            },
            update: data => {
              console.log('The passed in data was set', data);
            },
            success: data => {
              console.log('Transaction was completed successfully', data);
              this.getProfile();
              if (this.$route.name !== 'game' && method !== 'withdrawal') this.depositIsDone = true;

              if (this.availableBonusList.length) {
                this.getBonusList();
                this.getAvailableBonusList();
              }
            },
            failure: data => console.log('Transaction failed', data),
            isLoading: data => console.log('Data is loading', data),
            doneLoading: data => {
              console.log('Data has been successfully downloaded', data);
              this.cashierIsLoading = false;
            },
            newProviderWindow: data => console.log('A new window / iframe has opened', data),
            paymentMethodSelect: data => console.log('Payment method was selected', data),
            paymentMethodPageEntered: data =>
              console.log('New payment method page was opened', data),
            navigate: data => console.log('Path navigation triggered', data),
          });
        },
      );

      // eslint-disable-next-line no-unused-vars,no-undef
    },
    onCloseCashierForm() {
      if (this.depositIsDone) {
        this.$modal.show('goPlay');
        this.depositIsDone = false;
      }
      if (this.shouldCashout) this.setCashoutFalse();
    },
  },
};
</script>

<style lang="scss">
.CashierForm {
  &-Content {
    min-height: 705px;
  }

  &-Loader {
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
  }

  &-GoPlay {
    text-align: center;
  }

  &-Btn {
    margin-top: 20px;
  }
}
</style>
