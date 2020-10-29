<template>
  <modal
    name="cashier"
    height="95%"
    @opened="initializeCashier()"
    :shiftY="0.5"
    draggable
  >
    <div id="cashier" class="CashierForm"></div>
  </modal>
</template>

<script>
import _PaymentIQCashier from 'paymentiq-cashier-bootstrapper';
import { mapState } from 'vuex';

export default {
  name: 'CashierForm',
  computed: {
    ...mapState(['billingSession', 'fakeBillingSession']),
  },
  methods: {
    initializeCashier() {
      // eslint-disable-next-line no-unused-vars
      const CashierInstance = new _PaymentIQCashier('#cashier', {
        merchantId: this.fakeBillingSession.merchantId,
        userId: this.fakeBillingSession.userId,
        sessionId: this.fakeBillingSession.sessionId,
        environment: 'test',
        containerHeight: '95vh',
      }, (api) => {
        api.on({
          cashierInitLoad: () => console.log('Cashier init load'),
          update: (data) => console.log('The passed in data was set', data),
          success: (data) => console.log('Transaction was completed successfully', data),
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
}
</style>
