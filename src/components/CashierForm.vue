<template>
  <modal
    name="cashier"
    height="95%"
    @opened="initializeCashier()"
    @closed="onCloseCashierForm()"
    :shiftY="0.5"
    draggable
  >
    <div id="cashier" class="CashierForm"></div>
  </modal>
</template>

<script>
import _PaymentIQCashier from 'paymentiq-cashier-bootstrapper';
import { mapActions, mapMutations, mapState } from 'vuex';

const mode = process.env.NODE_ENV;
const billingSession = (mode === 'production') ? 'billingSession' : 'fakeBillingSession';

export default {
  name: 'CashierForm',
  computed: {
    ...mapState(['billingSession', 'fakeBillingSession', 'shouldCashout']),
  },
  methods: {
    ...mapMutations(['setCashoutFalse']),
    ...mapActions(['getBillingSession', 'getProfile']),
    initializeCashier() {
      this.getBillingSession().then(() => {
        const method = this.shouldCashout ? 'withdrawal' : 'deposit';
        // eslint-disable-next-line no-unused-vars
        const CashierInstance = new _PaymentIQCashier('#cashier', {
          merchantId: this[billingSession].merchantId,
          userId: this[billingSession].userId,
          sessionId: this[billingSession].sessionId,
          environment: 'test',
          containerHeight: '95vh',
          method,
        }, (api) => {
          api.on({
            cashierInitLoad: () => console.log('Cashier init load'),
            update: (data) => console.log('The passed in data was set', data),
            success: (data) => {
              console.log('Transaction was completed successfully', data);
              this.getProfile();
            },
            failure: (data) => console.log('Transaction failed', data),
            isLoading: (data) => console.log('Data is loading', data),
            doneLoading: (data) => console.log('Data has been successfully downloaded', data),
            newProviderWindow: (data) => console.log('A new window / iframe has opened', data),
            paymentMethodSelect: (data) => console.log('Payment method was selected', data),
            paymentMethodPageEntered: (data) => console.log('New payment method page was opened', data),
            navigate: (data) => console.log('Path navigation triggered', data),
          });
          api.set({
            config: {
              amount: 10,
            },
          });
          api.css(`
          .your-custom-css {
            color: blue;
          }
        `);
        });
      });
    },
    onCloseCashierForm() {
      if (this.shouldCashout) this.setCashoutFalse();
    },
  },
};
</script>

<style lang="scss">
//#cashier {
//  background: var(--color-body) !important;
//}

.CashierForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .vm--modal {
    overflow: auto !important;
  }
}
</style>
