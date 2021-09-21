<template>
  <div class="CashierForm">
    <modal
      name="cashier"
      :height="'auto'"
      width="400px"
      adaptive
      scrollable
      @before-open="beforeInitializeCashier($event)"
      @opened="onAfterOpenCashier()"
      @closed="onCloseCashierForm()"
    >
      <div class="Modal">
        <div class="Close Modal-Close Modal-Close--thick" @click="$modal.hide('cashier')" />
        <Loader v-if="billingSessionIsLoading || cashierIsLoading" class="CashierForm-Loader" />
        <div id="cashier" class="CashierForm-Content"></div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import Loader from '@/components/Loader.vue';
import showAuthDialog from '@/mixins/showAuthDialog';
import openGame from '@/mixins/openGame';
import gtagEvents from '@/mixins/gtagEvents';

const environment = process.env.NUXT_ENV_MODE === 'production' ? 'production' : 'test';

export default {
  name: 'CashierForm',
  components: {
    Loader,
  },
  mixins: [showAuthDialog, openGame, gtagEvents],
  data() {
    return {
      cashierIsLoading: false,
      depositIsDone: false,
    };
  },
  computed: {
    ...mapState([
      'billingSession',
      'billingSessionIsLoading',
      'getBillingSessionError',
      'shouldCashout',
      'user',
    ]),
    ...mapState('profile', ['availableBonusList']),
    ...mapState('games', ['gameToStart']),
    ...mapGetters(['activeAccount']),
  },
  methods: {
    ...mapMutations(['setCashoutFalse', 'pushNotificationAlert']),
    ...mapActions(['getBillingSession', 'getProfile']),
    ...mapActions('profile', [
      'getBonusList',
      'getAvailableBonusList',
      'getBonusHistoryList',
      'getTransactionHistoryList',
      'getFreeSpinList',
    ]),
    async beforeInitializeCashier() {
      try {
        await this.getBillingSession();
        if (this.getBillingSessionError)
          this.pushNotificationAlert({ type: 'error', text: this.getBillingSessionError });

        if (this.billingSession.needPlayerProfileData) {
          this.showRegistrationDialog('registration', true, true);
          this.$modal.hide('cashier');
        }
      } catch {
        this.$modal.hide('cashier');
      }

      this.cashierIsLoading = true;

      const method = this.shouldCashout ? 'withdrawal' : 'deposit';
      let locale;
      if (this.$i18n.locale === 'en-CA') locale = 'en';
      else if (this.$i18n.locale === 'fr-CA') locale = 'fr';
      // eslint-disable-next-line prefer-destructuring
      else locale = this.$i18n.locale;

      // eslint-disable-next-line no-unused-vars
      const CashierInstance = new this.$_Cashier(
        '#cashier',
        {
          merchantId: this.billingSession.merchantId,
          userId: this.billingSession.userId,
          sessionId: this.billingSession.sessionId,
          environment,
          fetchConfig: true,
          method,
          locale: `${locale}_${this.user.country}`,
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
              if (this.$route.name !== 'game-gameName' && method !== 'withdrawal')
                this.depositIsDone = true;

              if (this.availableBonusList.length) {
                this.getBonusList();
                this.getAvailableBonusList();
              }
              this.getFreeSpinList();
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
            cancelledPendingWD: () => this.getTransactionHistoryList(),
          });
          api.set({
            attributes: {
              affiliateId: this.user.affiliateId,
            },
          });
        },
      );

      // eslint-disable-next-line no-unused-vars,no-undef
    },
    onCloseCashierForm() {
      if (this.depositIsDone) {
        if (this.gameToStart) {
          this.getGame({ game: this.gameToStart });
        }

        this.depositIsDone = false;
      }
      if (this.shouldCashout) this.setCashoutFalse();
    },
    onAfterOpenCashier() {
      this.gtagSendEvent('deposit_screen_shown', {});
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
