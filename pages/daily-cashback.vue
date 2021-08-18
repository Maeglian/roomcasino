<template>
  <section class="Page DailyCashback">
    <div class="Page-Header DailyCashback-Header">
      <h1
        class="Wrapper Title Title--type-h1 Page-Title PromotionsPage-Title"
        v-html="$t('dailyCashback.title')"
      ></h1>
      <div class="Page-Text Text Text--additional" v-html="$t('dailyCashback.text1')"></div>
      <button class="Btn Btn--common DailyCashback-Btn" @click="onClickBtn()">
        {{ isLoggedIn ? $t('buttons.deposit') : $t('buttons.createAccount') }}
      </button>
    </div>
    <div class="DailyCashback-Scheme">
      <div
        class="Page-Text Page-Text--long Text Text--additional DailyCashback-SchemeText"
        v-html="$t('dailyCashback.text2')"
      ></div>
      <div class="DailyCashback-Items">
        <div
          v-for="(item, i) in $t(`dailyCashback.items`)"
          :key="`item${i}`"
          class="DailyCashback-Item"
        >
          <div class="DailyCashback-ItemBlock">
            <svg class="DailyCashback-Icon">
              <use xlink:href="@/assets/img/icons.svg#promotions"></use>
            </svg>
            <div class="DailyCashback-Num">
              {{ item.cashbackNum }}
            </div>
            <div class="DailyCashback-ItemText DailyCashback-Cashback">
              {{ $t('dailyCashback.cashback') }}
            </div>
          </div>
          <div class="DailyCashback-ItemBlock">
            <div class="DailyCashback-ItemText DailyCashback-Sum">
              {{ item.cashbackSum }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <h2 class="Title Title--type-h2 Page-Subtitle DailyTournamentPage-Subtitle">
      {{ $t('dailyCashback.terms') }}
    </h2>
    <div class="Page-Blocks">
      <div v-for="(item, i) in $t(`dailyCashback.termsList`)" :key="`txt${i}`" class="Page-Block">
        <div class="Page-Number">{{ i + 1 }}.</div>
        <div class="Text Text--additional" v-html="item.text"></div>
      </div>
    </div>
  </section>
</template>

<script>
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'DailyCashback',
  mixins: [showAuthDialog],
  layout: 'page',
};
</script>

<style lang="scss">
.DailyCashback {
  &-Header {
    text-align: center;

    @media (min-width: $screen-m) {
      background-image: url(~@/assets/img/cashback_768.png);
      background-repeat: no-repeat;
      background-size: 100% auto;
    }

    @media (min-width: $screen-l) {
      background-image: url(~@/assets/img/cashback_960.png);
    }

    @media (min-width: $screen-xl) {
      background-image: url(~@/assets/img/cashback_1248.png);
    }

    @media (min-width: 1632px) {
      background-image: url(~@/assets/img/cashback_1632.png);
    }
  }

  &-Btn {
    margin-top: 30px;
    margin-bottom: 34px;

    @media (min-width: $screen-m) {
      margin-top: 32px;
      margin-bottom: 74px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 58px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 92px;
    }
  }

  &-SchemeText {
    display: none;

    @media (min-width: $screen-m) {
      display: block;
      margin-bottom: 30px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 37px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 46px;
    }
  }

  &-Icon {
    width: 40px;
    height: 40px;
    margin-bottom: 12px;
    fill: var(--color-main1);

    @media (min-width: $screen-m) {
      width: 45px;
      height: 45px;
    }

    @media (min-width: $screen-l) {
      width: 50px;
      height: 50px;
    }

    @media (min-width: $screen-xl) {
      width: 55px;
      height: 55px;
    }
  }

  &-Items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 40px;

    @media (min-width: $screen-m) {
      flex-wrap: nowrap;
      margin-bottom: 60px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 80px;
    }
  }

  &-Item {
    width: calc(50% - 6px);

    @media (min-width: $screen-m) {
      margin-right: 16px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &-ItemBlock {
    margin-bottom: 16px;
    padding: 20px;
    text-align: center;
    background: var(--color-bg);

    @media (min-width: $screen-l) {
      padding: 25px;
    }
  }

  &-Num {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-main1);

    @media (min-width: $screen-m) {
      font-size: 20px;
    }

    @media (min-width: $screen-l) {
      font-size: 26px;
    }
  }

  &-ItemText {
    font-weight: 700;
    color: var(--color-text-main);
  }

  &-Cashback {
    font-size: 10px;

    @media (min-width: $screen-m) {
      font-size: 12px;
    }

    @media (min-width: $screen-l) {
      font-size: 14px;
    }

    @media (min-width: $screen-xl) {
      font-size: 16px;
    }
  }

  &-Sum {
    font-size: 12px;
    text-transform: capitalize;

    @media (min-width: $screen-l) {
      font-size: 16px;
    }
  }
}
</style>
