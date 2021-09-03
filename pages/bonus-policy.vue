<template>
  <section class="SupportPage SupportPage--paddings">
    <h1 class="SupportPage-Title Title Title--type-h1">
      {{ $t('supportPages.bonusPolicyPage.title') }}
    </h1>
    <div class="SupportPage-Text">
      <p
        v-for="(text, index) in $t('supportPages.bonusPolicyPage.text')"
        :key="index"
        class="Text"
        v-html="text"
      ></p>
    </div>
    <ul class="SupportPage-List">
      <div class="Title Title-Div">{{ $t('supportPages.bonusPolicyPage.general.title') }}</div>
      <li
        v-for="(text, index) in $t('supportPages.bonusPolicyPage.general.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="text"></p>
      </li>

      <div class="Title Title-Div">{{ $t('supportPages.bonusPolicyPage.requirements.title') }}</div>

      <li
        v-for="(text, index) in $t('supportPages.bonusPolicyPage.requirements.text1')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="text"></p>
      </li>
      <li class="SupportPage-Item">
        <p class="Text">
          {{ $t('supportPages.bonusPolicyPage.requirements.text2') }}
        </p>
        <ul class="SupportPage-InnerList" type="a">
          <li
            v-for="(text, index) in $t('supportPages.bonusPolicyPage.requirements.list1')"
            :key="index"
            class="SupportPage-InnerItem"
          >
            <p class="Text" v-html="text"></p>
          </li>
        </ul>
      </li>
      <li class="SupportPage-Item">
        <p class="Text">
          {{ $t('supportPages.bonusPolicyPage.requirements.text3') }}
        </p>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>0.5 {{ $t('supportPages.bonusPolicyPage.requirements.points') }}</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td>1.00</td>
            </tr>
            <tr>
              <td>GBP</td>
              <td>1.00</td>
            </tr>
            <tr>
              <td>USD</td>
              <td>1.00</td>
            </tr>
            <tr>
              <td>CAD</td>
              <td>1.00</td>
            </tr>
            <tr>
              <td>AUD</td>
              <td>1.00</td>
            </tr>
            <tr>
              <td>DKK</td>
              <td>10.00</td>
            </tr>
            <tr>
              <td>SEK</td>
              <td>10.00</td>
            </tr>
            <tr>
              <td>NOK</td>
              <td>10.00</td>
            </tr>
            <tr>
              <td>ZAR</td>
              <td>10.00</td>
            </tr>
            <tr>
              <td>RUB</td>
              <td>70.00</td>
            </tr>
            <tr>
              <td>THB</td>
              <td>50.00</td>
            </tr>
            <tr>
              <td>INR</td>
              <td>80.00</td>
            </tr>
          </tbody>
        </table>
      </li>
      <li class="SupportPage-Item">
        <p class="Text">
          {{ $t('supportPages.bonusPolicyPage.requirements.text4') }}
        </p>
        <ul class="SupportPage-InnerList" type="a">
          <li
            v-for="(text, index) in $t('supportPages.bonusPolicyPage.requirements.list2')"
            :key="index"
            class="SupportPage-InnerItem"
          >
            <p class="Text" v-html="text"></p>
          </li>
        </ul>
      </li>
      <li
        v-for="(text, index) in $t('supportPages.bonusPolicyPage.requirements.text5')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="text"></p>
      </li>

      <div class="Title Title-Div">
        {{ $t('supportPages.bonusPolicyPage.irregularFairPlay.title') }}
      </div>

      <li
        v-for="(text, index) in $t('supportPages.bonusPolicyPage.irregularFairPlay.text1')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="text"></p>
      </li>
      <li class="SupportPage-Item">
        <p class="Text">
          {{ $t('supportPages.bonusPolicyPage.irregularFairPlay.text2') }}
        </p>
        <ul class="SupportPage-InnerList" type="a">
          <li
            v-for="(text, index) in $t('supportPages.bonusPolicyPage.irregularFairPlay.list')"
            :key="index"
            class="SupportPage-InnerItem"
          >
            <p class="Text" v-html="text"></p>
          </li>
        </ul>
      </li>
      <li
        v-for="(text, index) in $t('supportPages.bonusPolicyPage.irregularFairPlay.text3')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="text"></p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'PrivacyPolicyPage',
  layout: 'page',
  head() {
    return {
      title: 'Bonus Policy Of The Ninecasino Gaming Platform',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Detailed Information About Bonus Policy Of Ninecasino',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
table {
  color: var(--color-text-faded);
}

.Title-Div {
  margin-bottom: 20px;
}

.SupportPage-Item {
  padding-left: 19px;

  @media (min-width: $screen-xxs) {
    padding-left: 35px;
  }

  &:before {
    top: 2.3px;
  }
}

.SupportPage-InnerItem {
  padding-left: 6px;

  @media (min-width: $screen-m) {
    padding-left: 19px;
  }

  @media (min-width: $screen-l) {
    padding-left: 22px;
  }
}
</style>
