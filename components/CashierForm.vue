<template>
  <div class="CashierForm">
    <modal
      name="cashier"
      :height="'auto'"
      :min-height="700"
      width="400px"
      adaptive
      scrollable
      @before-open="beforeInitializeCashier()"
      @closed="onCloseCashierForm()"
    >
      <div class="Modal">
        <div class="Close Modal-Close" @click="$modal.hide('cashier')" />
        <Loader v-if="billingSessionIsLoading || cashierIsLoading" class="CashierForm-Loader" />
        <div id="cashier" class="CashierForm-Content"></div>
      </div>
    </modal>
    <BaseModal name="goPlay" class="CashierForm-GoPlay" :ok-btn="false" :width="300">
      <div class="Modal-Title">
        Congratulations!
      </div>
      <div class="Modal-Text">
        Now you can play the game.
      </div>
      <NuxtLink
        class="Btn Btn--common CashierForm-Btn"
        :to="{ path: '/', hash: '#games' }"
        @click.native="$modal.hide('goPlay')"
      >
        Play now
      </NuxtLink>
    </BaseModal>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
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
    ]),
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
      // eslint-disable-next-line no-unused-vars,no-undef
      const CashierInstance = new _PaymentIQCashier(
        '#cashier',
        {
          merchantId: this[billingSession].merchantId,
          userId: this[billingSession].userId,
          sessionId: this[billingSession].sessionId,
          environment,
          containerHeight: 'auto',
          containerMinHeight: '700px',
          method,
          accountDelete: false,
          showFooter: false,
          showAmountLimits: true,
          allowMobilePopup: true,
          amount: 50,
          predefinedAmounts: [50, 75, 125, 250, 500],
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
              this.getBonusHistoryList();

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
          api.css(`
            #cashier {
              --buttons-color: #EB1C2A;
              --button-hover-color: #c40916;
              --labels-color: #fff;
              --margin-size: 4px;
              --headings-color: #fff;
              --error-color: #EB1C2A;
              --input-fontSize: 12px;
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

            .spinner, .spinner-label, .zebraff-walker, .loading-circle {
              display: none !important;
            }
          `);
        },
      );
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
