<template>
  <section class="SupportPage SupportPage--paddings">
    <h1 class="SupportPage-Title Title Title--type-h1">
      responsible gaming
    </h1>
    <div class="SupportPage-Text">
      <h4 class="Title">
        HOW WE COMMIT TO RESPONSIBLE GAMING?
      </h4>
      <p class="Text">
        Gambling at an online casino should always be aimed at entertainment. However, there is a
        certain percentage of people who lose control over themselves while gambling. Before
        starting to play, it is important to realise that gambling shall never be viewed as a source
        of income or means of recovery from debts. It is useful to keep track of the time and the
        amount of money spent at an online casino daily.
      </p>
      <p class="Text">
        If you think that you start spending more money than you can afford, or in case gaming
        starts interfering with your normal daily routines, we strongly advise to consider several
        measures that can help, such as setting Personal Limits on your gaming activities, opting
        for Self-Exclusion, and seeking help and support from trusted independent bodies.
      </p>
      <p class="Text">
        You can take the gambling addiction
        <a
          href="https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem"
          class="SupportPage-Link"
          >quiz</a
        >
        to determine whether you are exhibiting the signs of an addiction to gambling.
      </p>
    </div>
    <div class="SupportPage-Text">
      <h4 class="Title">
        HOW CAN I LIMIT MY SPEND OR LOSSES?
      </h4>
      <p class="Text">
        To assist you in gambling responsibly we offer the Personal Limits feature. You can set
        limits on the amount you deposit, lose, wager, spend in one game, or on your account
        activity on the whole. This functionality can be accessed within your account in the
        “Personal Limits” section
        <NuxtLink v-if="isLoggedIn" to="/cabinet/limits" class="SupportPage-Link">here.</NuxtLink>
        <button v-else class="SupportPage-Link" @click="showRegistrationDialog('registration')">
          here.
        </button>
      </p>
      <p class="Text">
        Limits can be amended at any time. A decrease in the limit will take effect immediately,
        however an increase may only occur after email confirmation and only after the previous
        limit of the same type expires, in order to avoid rash decisions. If you require further
        information or assistance regarding Personal Limits, please contact our support team at
        contact@ninecasino.com.
      </p>
      <p class="Text">
        Deposit Limit. A limit on your deposits for a day, a week, or a month.
      </p>
      <p class="Text">
        Loss Limit. A limit on your losses in the casino for a day, a week, or a month. Please note
        the loss is based on the initial deposit and not winnings attributed to the deposited
        amount. If for example you deposit €50, put a Loss Limit of €10 and then go on to win
        €1,000, you can still lose more than €10 of the €1,000 balance as it is based on the initial
        deposit instead of the winnings.
      </p>
      <p class="Text">
        Wager Limit. A limit on the wagered amount for a day, a week, or a month.
      </p>
      <p class="Text">
        Session Limit. A limit on the amount of time in minutes spent playing a game.
      </p>
    </div>
    <div class="SupportPage-Text">
      <h4 class="Title">
        NEED A BREATHER?
      </h4>
      <p class="Text">
        Cooling-Off Limit. You can set a Cooling-Off Period for 1 week, 1 month, 3 months, or 6
        months. While the limit is active you cannot deposit to the Casino and you will be excluded
        from all promotional offers, although you may withdraw the remaining funds during this
        period. Cooling-Off period is applied to your account immediately. Upon its expiring your
        account will automatically be re-activated.
      </p>
      <p class="Text">
        Self-Exclusion Limit. You can set a Self-Exclusion Limit for 6 months, 9 months, or 1 year.
        Upon doing so your Player Account will immediately be disabled and you will be excluded from
        all promotional offers for the set period. You will not be able to deposit or withdraw funds
        when the limit is active. Upon its expiring your account will not be automatically
        re-activated.
      </p>
    </div>
    <div class="SupportPage-Text">
      <h4 class="Title">
        WHAT IS SELF-EXCLUSION?
      </h4>
      <p class="Text">
        Setting Self-exclusion lets us know that we need to take all measures to block your access
        to your account and make sure that you receive no promotional materials. You may also
        contact our support team at contact@ninecasino.com and inform us about your decision to stop
        gambling at the Website for a certain period of time or forever.
      </p>
      <p class="Text">
        Please note that if you are self excluded from the casino for indefinite period of time, the
        funds remaining on balance will be paid according to the casino limits. If you are self
        excluded for a definite period of time, the funds remaining on balance will be paid
        according to the casino limits only when a period of self exclusion expires.
      </p>
    </div>
    <div class="SupportPage-Text">
      <h4 class="Title">
        LET’S SEE SOME ID?
      </h4>
      <p class="Text">
        The Casino only accepts players who are at least 18 years old and uses all available methods
        to stop any attempts of minors to register and play at our Website. The Casino reserves the
        right to ask for proof of identity and in case the player has not reached the legal age to
        play, access to the Website will be denied immediately.
      </p>
      <p class="Text">
        However, we realise that due to a wide availability and nature of the Internet people under
        the legal age still have a chance to register and play at an online casino. We therefore
        strongly encourage parents to cooperate in protecting their children from free access to
        gaming websites. There is special software that can help in this matter. Please visit the
        following websites for more information:
      </p>
      <ul class="SupportPage-List">
        <li class="SupportPage-Item">
          <a href="http://www.cyberpatrol.com" class="SupportPage-Link">CyberPatrol</a>
        </li>
        <li class="SupportPage-Item">
          <a href="http://www.gamblock.com" class="SupportPage-Link">GamBlock®</a>
        </li>
        <li class="SupportPage-Item">
          <a href="http://www.solidoak.com" class="SupportPage-Link">Solid Oak Software</a>
        </li>
        <li class="SupportPage-Item">
          <a href="http://www.netnanny.com" class="SupportPage-Link">Net Nanny</a>
        </li>
      </ul>
    </div>
    <div class="SupportPage-Text">
      <h4 class="Title">
        WHAT IS REALITY CHECK?
      </h4>
      <p class="Text">
        Getting caught up is easy when you are having fun, therefore we will send you an hourly
        notification in-game to remind you of how much you have spent at the Casino. Regardless of
        how many games you are playing at the same time, the message will let you know where you are
        at. This is meant to provide some time to reflect on your bets and perhaps consider pausing
        play for a while.
      </p>
    </div>
    <div class="SupportPage-Text">
      <h4 class="Title">
        SEEKING OUTSIDE HELP?
      </h4>
      <p class="Text">
        You may contact any of the following organizations for consultation and support:
      </p>
      <ul class="SupportPage-List">
        <li class="SupportPage-Item">
          <a href="http://www.gamblersanonymous.org/ga" class="SupportPage-Link">
            Gamblers Anonymous
          </a>
        </li>
        <li class="SupportPage-Item">
          <a href="http://www.gamcare.org.uk" class="SupportPage-Link">
            GamCare
          </a>
        </li>
        <li class="SupportPage-Item">
          <a href="https://www.gamblingtherapy.org" class="SupportPage-Link">
            Gambling Therapy
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
