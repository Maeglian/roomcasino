<template>
  <modal
    name="cashier"
    height="95%"
    width="400px"
    :shift-y="0.5"
    draggable
    adaptive
    @opened="initializeCashier()"
    @closed="onCloseCashierForm()"
  >
    <div slot="top-right">
      <div class="Close Modal-Close" @click="$modal.hide('cashier')" />
    </div>
    <div id="cashier" class="CashierForm"></div>
  </modal>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

const billingSession =
  process.env.NUXT_ENV_MODE === 'sandbox' ? 'fakeBillingSession' : 'billingSession';

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
        // eslint-disable-next-line no-unused-vars,no-undef
        const CashierInstance = new _PaymentIQCashier(
          '#cashier',
          {
            merchantId: this[billingSession].merchantId,
            userId: this[billingSession].userId,
            sessionId: this[billingSession].sessionId,
            environment: 'test',
            containerHeight: '95vh',
            method,
            predefinedAmounts: [100,200,300,500,1000],
            containerWidth: '100%',
            theme: { 
              input: { 
                color: '#fff', 
                fontSize: '12px', 
                borderRadius: '0', 
              }, 
              inputbackground: { 
                color: '#1B2138',
              }, 
              labels: { 
                color: '#fff', 
              }, 
              headings: { 
                color: '#1B2138', 
                fontSize: '12px', 
              }, 
              loader: { 
                color: '', 
              }, 
              buttons: { 
                color: '#F3B233', 
              }, 
              headerbackground: { 
                color: 'rgba(5, 12, 36, 0.9);', 
              }, 
              background: { 
                color: 'rgba(5, 12, 36, 0.9)', 
              }, 
              cashierbackground: { 
                color: 'rgba(5, 12, 36, 0.9)', 
              }, 
              cardbackground: { 
                color: 'rgba(5, 12, 36, 0.9)', 
              }, 
              margin: { 
                size: '4px', 
              }, 
            }, 
          },
          api => {
            const closeIcon = document.querySelector('.Modal-Close');

            api.on({
              cashierInitLoad: () => console.log('Cashier init load'),
              update: data => {
                closeIcon.style.display = 'none';
                console.log('The passed in data was set', data);
              },
              success: data => {
                console.log('Transaction was completed successfully', data);
                this.getProfile();
              },
              failure: data => console.log('Transaction failed', data),
              isLoading: data => console.log('Data is loading', data),
              doneLoading: data => {
                console.log('Data has been successfully downloaded', data);
                const modal = document.querySelector('.vm--modal');
                const prevStyles = modal.style.cssText;
                const iframeLeftPosition = modal.getBoundingClientRect().left;
                modal.style.cssText = prevStyles + 'position: relative; top: 20px;';
                closeIcon.style.left = `-${iframeLeftPosition}px`;
                closeIcon.style.display = 'block';
              },
              newProviderWindow: data => console.log('A new window / iframe has opened', data),
              paymentMethodSelect: data => console.log('Payment method was selected', data),
              paymentMethodPageEntered: data =>
                console.log('New payment method page was opened', data),
              navigate: data => console.log('Path navigation triggered', data),
            });
            api.set({
              config: {
                amount: 10,
              },
            });
            api.css(`
              #app-container { 
                border-radius: 0!important; 
              } 
              #app-container > #cachier {
                background: red !important;
              }
              #cachier.container.flex.flex-column.layout-vertical {
                background: red !important;
              }
              #cashier * { 
                font-family: 'Montserrat', sans-serif!important; 
                color: #ffffff; 
                font-size: 12px; 
              } 
              #cashier .dropdown-container { 
                border: none!important; 
                padding: 0px; 
              } 
              #cashier .dropdown-toggler { 
                background: #1B2138; 
                padding: 16px; 
                border: none; 
                border-radius: 0; 
              } 
              #cashier .tabs { 
                background: #0E152F; 
                margin-bottom: 4px; 
                height: 55px; 
                margin-top: 0px !important; 
              } 
              #cashier .tabs .tab { 
                font-size: 14px !important; 
                margin-right: 15px !important; 
                text-transform: capitalize; 
              } 
              #cashier .tabs .tab:after { 
                display: none; 
              } 
              #cashier .payment-method { 
                margin-top: 0!important; 
              } 
              #cashier h3.tab { 
                color: #ffffff!important; 
              } 
              #cashier section.payment-method { 
                margin-bottom: 0; 
              } 
              #cashier section.payment-method > * + * { 
                margin-top: 4px; 
              } 
              #cashier .set-amount { 
                display: flex; 
                flex-direction: column; 
                margin: 0; 
                background: #0E152F!important; 
                border-radius: 0!important; 
                overflow: hidden; 
              } 
              #cashier .generic-inputs-container, #cashier .credit-card-inputs-wrapper form { 
                margin: 4px; 
              } 
              #cashier .predefinedvalues { 
                justify-content: space-between!important; 
                margin-bottom: 0!important; 
                margin-top: 0!important; 
                padding: 0px; 
              } 
              #cashier .predefinedvalue.active { 
                background: #1B2138; 
                color: #fff!important; 
                border: 2px solid #F3B233 !important; 
              } 
              #cashier .predefinedvalue { 
                border-radius: 0; 
                border: 2px solid #1B2138!important; 
                color: #ffffff!important; 
                background: #1B2138!important; 
                padding: 15px 10px!important; 
              } 
              #cashier .predefinedvalues-btn { 
                flex-grow: 0; 
                flex-shrink: 0; 
              } 
              #cashier .submit-button { 
                background: #F3B233; 
                text-transform: uppercase; 
                border-radius: 0!important; 
                font-size: 12px!important; 
                padding: 13px!important; 
                font-weight: 700!important; 
              } 
              #cashier .payment-method-details { 
                padding: 0!important; 
              } 
              #cashier .transaction-overview-row { 
                border-color: #1B2138!important; 
              } 
              #cashier .total-container span, #cashier .total-container .label { 
                color: #ffffff!important; 
                font-weight: 400!important; 
              } 
              #cashier .overview-submit-container { 
                padding: 0; 
                background: #1B2138; 
              } 
              #cashier .transaction-overview-row span, #cashier .dropdown-toggler { 
                font-size: 12px!important; 
              } 
              #cashier .transaction-overview-row { 
                border-bottom: 2px solid; 
                margin-bottom: 0; 
              } 
              #cashier .transaction-overview { 
                border: none!important; 
              } 
              #cashier .predefinedvalues + .seperator { 
                display: none!important; 
              } 
              #cashier .set-amount .input-container { 
                margin-top: 0!important; 
                order: 1; 
              } 
              #cashier .predefinedvalues { 
                order: 0; 
              } 
              #cashier .set-amount-label { 
                order: -1; 
                margin-top: 4px; 
                padding: 0 10px; 
              } 
              #cashier .set-amount .input-border input { 
                border: 0!important; 
                background: #0E152F; 
                border-bottom: none!important; 
              } 
              #cashier .input-container input { 
                border-radius: 0!important; 
                text-align: left!important; 
              } 
              #cashier .btn:disabled:after { 
                border-radius: 0; 
              } 
              #cashier .input.input-prefix-wrapper .input-container { 
                text-align: left; 
                display: flex!important; 
                flex-direction: row-reverse!important; 
                justify-content: flex-end!important; 
              } 
              #cashier .input.input-prefix-wrapper span { 
                text-align: right!important; 
                color: #ffffff!important; 
                width: auto; 
                padding: 0!important; 
                border-radius: 0!important; 
                font-weight: 400!important; 
                display: inline-block!important; 
              } 
              .submit-button-container { 
                padding: 0; 
              } 
              .delete-account-wrapper { 
                position: relative; 
                right: 4px; 
              } 
              .account-options-container { 
                display: none !important; 
              } 
              .transaction-overview-row { 
                padding: 17px 12px 17px 18px !important; 
              } 
              .set-amount .predefinedvalues { 
                grid-template-columns: 1fr 1fr 1fr !important; 
              } 
              .payment-method { 
                padding-bottom: 0 !important; 
                border-bottom: 2px solid #F3B233 !important;
              } 
              .footer { 
                display: none !important; 
              } 
              .payment-method-label {
                color: #fff !important;
              }
              .payment-method-header:hover {
                opacity: .5 !important;
                background: transparent !important;
              }
              #cashier .input-container input {
                background: #1B2138 !important;
              }
              .input-wrapper {
                margin-top: 3px !important;
              }
              .input {
                border: 1px solid #F3B233 !important;
              }
              input.hosted-input-container.input-container {
                border: 1px solid #F3B233 !important;
                border-color: #F3B233 !important;
              }
              #hosted-field-single-iframe #frmCCNum {
                border: 1px solid #F3B233 !important;
                border-color: #F3B233 !important;
              }
          `); 
          },
        );
      });
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
</style>
