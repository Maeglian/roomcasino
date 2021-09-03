<template>
  <section class="PaymentPage Wrapper">
    <h1 class="Title Title--type-h1 PaymentPage-Title">Payments</h1>
    <p class="Text PaymentPage-Text">
      We are proud to be a safe multi-currency online casino. Currently, we accept the following
      currencies: <br />
      Euro, US Dollars, Canadian Dollar, Australian Dollar, Ruble, Japanese Yen, Bitcoins, Bitcoin
      Cash, Ethereum, Dogecoin, Litecoin and Theter.
    </p>
    <div class="PaymentPage-Content">
      <div class="PaymentPage-Deposit">
        <h2 class="Title Title--type-h2 PaymentPage-Subtitle">DEPOSIT METHODS</h2>
        <div class="PaymentPage-List">
          <div v-for="payment in paymentsMethods" :key="payment.alt" class="PaymentPage-Item">
            <div class="PaymentPage-Logo">
              <img
                class="PaymentPage-Icon"
                :src="require(`@/assets/img/${payment.icon}.svg`)"
                :alt="payment.alt"
              />
            </div>
            <div class="PaymentPage-Item-Content">
              <div class="PaymentPage-Item-Info">
                <div class="PaymentPage-Item-Title">Type</div>
                <div class="PaymentPage-Item-Text">{{ payment.type }}</div>
              </div>
              <div class="PaymentPage-Item-Info">
                <div class="PaymentPage-Item-Title">Fee</div>
                <div class="PaymentPage-Item-Text">{{ payment.fee }}</div>
              </div>
              <div class="PaymentPage-Item-Info">
                <div class="PaymentPage-Item-Title">Processing Time</div>
                <div class="PaymentPage-Item-Text">{{ payment.progressTime }}</div>
              </div>
              <div class="PaymentPage-Item-Info">
                <div class="PaymentPage-Item-Title">Limits Per Transaction</div>
                <div class="PaymentPage-Item-Text">{{ payment.limits }}</div>
              </div>
            </div>
            <div class="PaymentPage-BtnBox">
              <a href="" class="Btn Btn--common PaymentPage-Item-Btn">DEPOSIT</a>
            </div>
          </div>
        </div>
      </div>

      <div class="PaymentPage-Withdrawal">
        <h2 class="Title Title--type-h2 PaymentPage-Subtitle">WITHDRAWAL METHODS</h2>
        <div class="PaymentPage-List">
          <div v-for="payment in paymentsMethods" :key="payment.alt" class="PaymentPage-Item">
            <div class="PaymentPage-Logo">
              <img
                class="PaymentPage-Icon"
                :src="require(`@/assets/img/${payment.icon}.svg`)"
                :alt="payment.alt"
              />
            </div>
            <div class="PaymentPage-Item-Content">
              <div class="PaymentPage-Item-Info">
                <div class="PaymentPage-Item-Title">Type</div>
                <div class="PaymentPage-Item-Text">{{ payment.type }}</div>
              </div>
              <div class="PaymentPage-Item-Info">
                <div class="PaymentPage-Item-Title">Fee</div>
                <div class="PaymentPage-Item-Text">{{ payment.fee }}</div>
              </div>
              <div class="PaymentPage-Item-Info">
                <div class="PaymentPage-Item-Title">Processing Time</div>
                <div class="PaymentPage-Item-Text">{{ payment.progressTime }}</div>
              </div>
              <div class="PaymentPage-Item-Info">
                <div class="PaymentPage-Item-Title">Limits Per Transaction</div>
                <div class="PaymentPage-Item-Text">{{ payment.limits }}</div>
              </div>
            </div>
            <div class="PaymentPage-BtnBox">
              <a href="" class="Btn Btn--common PaymentPage-Item-Btn">DEPOSIT</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PaymentMethodsPage',
  layout: 'page',
  head() {
    return {
      title: 'Available Payments On Multi-currency Online Platform Ninecasino',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'What are the conventional and digital currencies supported by the site for carrying financial transactions? Ways to make deposits and withdrawals',
        },
      ],
    };
  },
  computed: {
    ...mapState(['paymentsMethods']),
  },
};
</script>

<style lang="scss">
.PaymentPage {
  padding-top: 16px;
  padding-bottom: 60px;

  @media (min-width: $screen-m) {
    padding-top: 31px;
    padding-bottom: 70px;
  }

  @media (min-width: $screen-xl) {
    padding-top: 71px;
    padding-bottom: 108px;
  }

  &-Title {
    margin-bottom: 20px;

    @media (min-width: $screen-m) {
      margin-bottom: 22px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 30px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 36px;
    }
  }

  &-Text {
    max-width: 284px;
    margin-bottom: 38px;

    @media (min-width: $screen-xxs) {
      margin-bottom: 40px;
    }

    @media (min-width: $screen-m) {
      max-width: 736px;
      margin-bottom: 30px;
    }

    @media (min-width: $screen-l) {
      max-width: 778px;
      margin-bottom: 38px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 48px;
    }
  }

  &-Logo {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-right: 4px;
    background-color: var(--color-bg);
  }

  &-BtnBox {
    width: 100%;
    max-width: 100%;
    margin-left: 4px;
    background-color: var(--color-bg);

    @media (min-width: $screen-m) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 141px;
      height: 100%;
      padding: 1px 16px;
    }

    @media (min-width: $screen-l) {
      max-width: 180px;
    }

    @media (min-width: $screen-xl) {
      max-width: 281px;
      padding: 1px 24px;
    }
  }

  //&-Icon {
  //  width: 100%;
  //  max-width: 100%;
  //  height: 61px;
  //  margin-bottom: 4px;
  //  background-color: var(--color-bg);
  //
  //  @media (min-width: $screen-m) {
  //    width: 114px;
  //    height: 100%;
  //    margin-bottom: 0;
  //
  //    img {
  //      width: 50%;
  //    }
  //  }
  //
  //  @media (min-width: $screen-l) {
  //    width: 155px;
  //  }
  //
  //  @media (min-width: $screen-xl) {
  //    width: 202px;
  //  }
  //}
}

.PaymentPage-Content {
  color: var(--color-text-main);
}

.PaymentPage-Deposit {
  margin-bottom: 60px;

  @media (min-width: $screen-m) {
    margin-bottom: 46px;
  }

  @media (min-width: $screen-l) {
    margin-bottom: 60px;
  }

  @media (min-width: $screen-xl) {
    margin-bottom: 80px;
  }
}

.PaymentPage-Item {
  margin-bottom: 20px;

  @media (min-width: $screen-m) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 82px;
    margin-bottom: 4px;
  }

  @media (min-width: $screen-l) {
    height: 104px;
  }
  @media (min-width: $screen-xl) {
    height: 114px;
  }
}

.PaymentPage-Item-Content {
  margin-bottom: 4px;
  padding: 20px 14px;
  background-color: var(--color-bg);

  @media (min-width: $screen-m) {
    display: grid;
    align-items: center;
    width: 473px;
    height: 100%;
    margin-bottom: 0;
    padding: 20px 18px;
    grid-template-columns: 25% 12% 23% 40%;
  }

  @media (min-width: $screen-l) {
    width: 585px;
  }
  @media (min-width: $screen-xl) {
    width: 725px;
    grid-template-columns: 25% 15% 25% 35%;
  }
}

.PaymentPage-Item-Info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;

  @media (min-width: $screen-m) {
    flex-direction: column;
    margin-bottom: 0;
    font-size: 9px;

    &:last-child {
      text-align: right;
    }
  }

  @media (min-width: $screen-l) {
    font-size: 11px;
  }

  @media (min-width: $screen-xl) {
    font-size: 12px;
  }
}

.PaymentPage-Item-Title {
  width: 45%;
  color: var(--color-text-ghost);

  @media (min-width: $screen-m) {
    width: 100%;
    margin-bottom: 6px;
  }

  @media (min-width: $screen-l) {
    margin-bottom: 8px;
  }

  @media (min-width: $screen-xl) {
    margin-bottom: 10px;
  }
}

.PaymentPage-Item-Text {
  width: 55%;
  text-align: right;

  @media (min-width: $screen-m) {
    width: 100%;
    text-align: left;

    &:last-child {
      text-align: inherit;
    }
  }
}

.PaymentPage-Item-Btn {
  width: 100%;

  @media (min-width: $screen-m) {
    padding: 15px 26px;
    font-size: 12px;
  }

  @media (min-width: $screen-l) {
    padding: 20px 26px;
    font-size: 14px;
  }

  @media (min-width: $screen-xl) {
    padding: 23.5px 26px;
    font-size: 16px;
  }
}
</style>
