<template>
  <section class="SupportPage SupportPage--paddings">
    <h1 class="SupportPage-Title Title Title--type-h1">
      {{ $t('supportPages.responsibleGaming.title') }}
    </h1>
    <div class="SupportPage-Text">
      <h4 class="Title">{{ $t('supportPages.responsibleGaming.section1.title') }}</h4>
      <p class="Text">{{ $t('supportPages.responsibleGaming.section1.text.p1') }}</p>
      <p class="Text">{{ $t('supportPages.responsibleGaming.section1.text.p2') }}</p>
      <p class="Text">
        <i18n path="supportPages.responsibleGaming.section1.text.p3">
          <template #quiz>
            <a
              href="https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem"
              class="SupportPage-Link"
            >
              {{ $t('supportPages.responsibleGaming.section1.text.quiz') }}
            </a>
          </template>
        </i18n>
      </p>
    </div>
    <div class="SupportPage-Text">
      <h4 class="Title">{{ $t('supportPages.responsibleGaming.section2.title') }}</h4>
      <p class="Text">
        <i18n path="supportPages.responsibleGaming.section2.text1">
          <template v-if="isLoggedIn" #toLimits>
            <NuxtLink :to="localePath('/profile/limits')" class="SupportPage-Link"
              >{{ $t('supportPages.responsibleGaming.section2.here') }}.</NuxtLink
            >
          </template>
          <template v-else #buttonLog>
            <button class="SupportPage-Link" @click="showRegistrationDialog('registration')">
              {{ $t('supportPages.responsibleGaming.section2.here') }}.
            </button>
          </template>
        </i18n>
      </p>
      <p
        v-for="(text, index) in $t('supportPages.responsibleGaming.section2.text2')"
        :key="index"
        class="Text"
        v-html="text"
      ></p>
    </div>
    <div class="SupportPage-Text">
      <h4 class="Title">{{ $t('supportPages.responsibleGaming.section3.title') }}</h4>
      <p
        v-for="(text, index) in $t('supportPages.responsibleGaming.section3.text')"
        :key="index"
        class="Text"
        v-html="text"
      ></p>
    </div>
    <div class="SupportPage-Text">
      <h4 class="Title">{{ $t('supportPages.responsibleGaming.section4.title') }}</h4>
      <p
        v-for="(text, index) in $t('supportPages.responsibleGaming.section4.text')"
        :key="index"
        class="Text"
        v-html="text"
      ></p>
    </div>
    <div class="SupportPage-Text">
      <h4 class="Title">{{ $t('supportPages.responsibleGaming.section5.title') }}</h4>
      <p
        v-for="(text, index) in $t('supportPages.responsibleGaming.section5.text')"
        :key="index"
        class="Text"
        v-html="text"
      ></p>
      <ul class="SupportPage-List">
        <li class="SupportPage-Item">
          <a href="http://www.cyberpatrol.com" class="SupportPage-Link">{{
            $t('supportPages.responsibleGaming.section5.list.text1')
          }}</a>
        </li>
        <li class="SupportPage-Item">
          <a href="http://www.gamblock.com" class="SupportPage-Link">{{
            $t('supportPages.responsibleGaming.section5.list.text2')
          }}</a>
        </li>
        <li class="SupportPage-Item">
          <a href="http://www.solidoak.com" class="SupportPage-Link">{{
            $t('supportPages.responsibleGaming.section5.list.text3')
          }}</a>
        </li>
        <li class="SupportPage-Item">
          <a href="http://www.netnanny.com" class="SupportPage-Link">{{
            $t('supportPages.responsibleGaming.section5.list.text4')
          }}</a>
        </li>
      </ul>
    </div>
    <div class="SupportPage-Text">
      <h4 class="Title">{{ $t('supportPages.responsibleGaming.section6.title') }}</h4>
      <p
        v-for="(text, index) in $t('supportPages.responsibleGaming.section6.text')"
        :key="index"
        class="Text"
        v-html="text"
      ></p>
    </div>
    <div class="SupportPage-Text">
      <h4 class="Title">{{ $t('supportPages.responsibleGaming.section7.title') }}</h4>
      <p class="Text" v-html="$t('supportPages.responsibleGaming.section7.text')"></p>
      <ul class="SupportPage-List">
        <li class="SupportPage-Item">
          <a href="http://www.gamblersanonymous.org/ga" class="SupportPage-Link">
            {{ $t('supportPages.responsibleGaming.section7.list.text1') }}
          </a>
        </li>
        <li class="SupportPage-Item">
          <a href="http://www.gamcare.org.uk" class="SupportPage-Link">
            {{ $t('supportPages.responsibleGaming.section7.list.text2') }}
          </a>
        </li>
        <li class="SupportPage-Item">
          <a href="https://www.gamblingtherapy.org" class="SupportPage-Link">
            {{ $t('supportPages.responsibleGaming.section7.list.text3') }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'PrivacyPolicyPage',
  mixins: [showAuthDialog],
  layout: 'page',
  head() {
    return {
      title: 'Responsible And Controlled Gambling Exclusively In Our RoomCasino',
      meta: [
        {
          description:
            'Our casino offers you responsible gambling. We have the full set of features that allow taking control over your losses. Gamble without the risk of going broke',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.SupportPage-Text {
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
}

.SupportPage-List {
  list-style-type: disc;
}

.SupportPage-Item {
  margin-left: 18px;
  padding-left: 0;

  &:before {
    display: none;
  }
}

button {
  cursor: pointer;
}
</style>
