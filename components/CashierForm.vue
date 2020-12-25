<template>
  <modal
    name="cashier"
    :height="'auto'"
    width="400px"
    draggable
    adaptive
    @opened="initializeCashier()"
    @closed="onCloseCashierForm()"
  >
    <div class="Modal">
      <div class="Close Modal-Close" @click="$modal.hide('cashier')" />
      <div id="cashier" class="CashierForm"></div>
    </div>
  </modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

const billingSession =
  process.env.NUXT_ENV_MODE === 'sandbox' ? 'fakeBillingSession' : 'billingSession';

export default {
  name: 'CashierForm',
  computed: {
    ...mapState(['billingSession', 'fakeBillingSession', 'shouldCashout']),
    ...mapGetters(['availableDepositBonuses']),
  },
  methods: {
    ...mapMutations(['setCashoutFalse']),
    ...mapActions(['getBillingSession', 'getBonusList', 'getProfile']),
    async initializeCashier() {
      try {
        await this.getBillingSession();
      } catch {
        this.$modal.hide('cashier');
      }

      const method = this.shouldCashout ? 'withdrawal' : 'deposit';
      // eslint-disable-next-line no-unused-vars,no-undef
      const CashierInstance = new _PaymentIQCashier(
        '#cashier',
        {
          merchantId: this[billingSession].merchantId,
          userId: this[billingSession].userId,
          sessionId: this[billingSession].sessionId,
          environment: 'test',
          containerHeight: 'auto',
          containerMinHeight: '700px',
          method,
          accountDelete: false,
          showFooter: false,
          amount: '20',
          font: 'Montserrat',
          predefinedAmounts: [100, 200, 300, 500, 1000],
          containerWidth: '100%',
          theme: {
            input: {
              color: '#FFF',
              fontSize: '12px',
              height: '55px',
              borderRadius: '0',
            },
            inputbackground: {
              color: '#0E152F',
            },
            labels: {
              color: '#FFF;',
            },
            headings: {
              color: '#FFF;',
            },
            buttons: {
              color: '#EB1C2A;',
            },
            headerbackground: {
              color: '#060E2A',
            },
            background: {
              color: '#060E2A',
            },
            cashierbackground: {
              color: '#060E2A',
            },
            border: {
              radius: '0',
            },
          },
        },
        api => {
          const closeIcon = document.querySelector('.Modal-Close');

          api.on({
            cashierInitLoad: () => console.log('Cashier init load'),
            update: data => {
              console.log('The passed in data was set', data);
            },
            success: data => {
              console.log('Transaction was completed successfully', data);
              this.getProfile();
              if (this.availableDepositBonuses.length) this.getBonusList();
            },
            failure: data => console.log('Transaction failed', data),
            isLoading: data => console.log('Data is loading', data),
            doneLoading: data => {
              console.log('Data has been successfully downloaded', data);
              closeIcon.style.display = 'block';
            },
            newProviderWindow: data => console.log('A new window / iframe has opened', data),
            paymentMethodSelect: data => console.log('Payment method was selected', data),
            paymentMethodPageEntered: data =>
              console.log('New payment method page was opened', data),
            navigate: data => console.log('Path navigation triggered', data),
          });
          api.css(`
            #cashier {
              --buttons-color: #EB1C2A;
              --button-hover-color: #c40916;
              --labels-color: #fff;
              --margin-size: 4px;
              --headings-color: #fff;
              --error-color: #EB1C2A;
              font-family: 'Montserrat', sans-serif;
              font-size: 12px !important;
              font-weight: bold !important;
              color: #fff !important;
              text-transform: uppercase !important;
            }

            #cashier .payment-method-header {
              padding: 25px !important;
            }

            #cashier .predefinedvalues {
              grid-gap: 4px;
            }

            #cashier .predefinedvalues button {
              background: #1B2138;
              text-transform: uppercase;
              height: 55px !important;
              padding: 0 !important;
            }

            #cashier .set-amount .predefinedvalues button {
              border: none;
            }

            #cashier .predefinedvalue.active {
              background: #1B2138;
              padding: 13px !important;
              border: 2px solid #F3B233 !important;
            }

            #cashier .input-label-float.active {
              margin-top: 5px !important;
            }

            #cashier .input {
              font-weight: bold !important;
              text-transform: uppercase !important;
            }

            #cashier .submit-button {
              text-transform: uppercase;
            }

            #cashier .single-iframe-input-container > div:first-child {
              margin-bottom: 4px !important;
            }

            #cashier .receipt, #cashier .status {
              padding-bottom: 35px;
            }

            #cashier .disable-app-overlay {
              background: #060E2A
            }
          `);
        },
      );
    },
    onCloseCashierForm() {
      if (this.shouldCashout) this.setCashoutFalse();
    },
  },
};
</script>

<style lang="scss">
.CashierForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.Close {
  display: none;
}
</style>
