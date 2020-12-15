<template>
  <section class="FaqPage">
    <h1
      v-if="tabsSectionIsActive || width >= 768"
      class="Title Title--type-h1 Page-Title FaqPage-Title"
    >
      Have a question?
    </h1>
    <div class="FaqPage-Content">
      <BaseTabs
        v-if="tabsSectionIsActive || width >= 768"
        class="FaqPage-Tabs"
        :items="tabs"
        :current-item="activeItem"
        :is-vertical-form="true"
        @choose-tab="onChooseTab"
      />
      <div v-if="!tabsSectionIsActive || width >= 768" class="FaqPage-Answers">
        <button class="FaqPage-Back" @click="tabsSectionIsActive = true">
          Back
        </button>
        <h2 class="Title Title--type-h1 FaqPage-SectionTitle">
          {{ items[activeItem].title }}
        </h2>
        <Accordion
          v-for="(item, name) in items[activeItem].items"
          :key="name"
          :title="item.title"
          :content="item.answer"
        />
      </div>
    </div>
  </section>
</template>

<script>
import BaseTabs from '@/components/base/BaseTabs.vue';
import Accordion from '@/components/Accordion.vue';
import { mapState } from 'vuex';

export default {
  name: 'FaqPage',
  components: {
    BaseTabs,
    Accordion,
  },
  layout: 'page',
  data() {
    return {
      items: {
        account: {
          title: 'Account',
          items: [
            {
              title: 'I forgot my password. What should I do?',
              answer:
                'For security reasons, we do not keep a record of your password. You will need to click on the ‘Forgot Your Password?’ option which you will find just underneath the box asking for your password. You will then be requested to answer the ‘Secret Question’ that you submitted upon registration. You should receive a message saying ‘Your password has now been changed. You may now log in to the Casino.’ Another email will be sent to your registered email address confirming your new password.',
            },
            {
              title: 'How can I verify my account?',
              answer:
                "Upon registration, we will send a welcome email to your account's registered email address. In that email, you will find a link where you will be able to verify your account. Verifying your account ensures you will receive our emails so you can stay up to date and informed on all our new promotions and games!",
            },
            {
              title: 'My game is stuck. How can I close Roomcasino?',
              answer:
                'If your game is frozen in the middle of a bet, we highly recommend that you close the software using the Task Manager (Activity Monitor for Mac). Simply click simultaneously on CTRL + ALT + DEL to open the list of functions and then select Start Task Manager. That way, your game will resume when you log in to the casino again.',
            },
            {
              title: "While logging in, I received the error message 'Player already connected'",
              answer:
                'If you are unable to log in to the download version of Roomcasino, you may not have logged out properly from the instant version. Please ensure you are logging out correctly from the instant version by clicking on the Log out button.',
            },
            {
              title:
                "While trying to open the Cashier I received an error message 'Your browser is using a pop-up blocker. To continue playing, please enable popups for this site'.",
              answer:
                'To configure the pop-up blocker from Internet Explorer, follow these steps:<br/><br/><ol><li>Click Start, point to All Programs, and then click Internet Explorer.</li><li>On the Tools menu, click Internet Options.</li><li>Click the Privacy tab, and then select the Block pop-ups check box to turn off the Pop-up Blocker.</li><li>Click Apply, and then click OK.</li></ol>To configure the pop-up blocker in Google Chrome, follow these steps:<br/><br/><ol><li>Click the Chrome menu on the browser toolbar.</li><li>Select Settings.</li><li>Click Show advanced settings.</li><li>In the Privacy section, click the "content" settings button.</li><li>In the Pop-ups section, select Allow all sites to show pop-ups.</li><li>Click Apply and OK. Then restart your browser.</li></ol>',
            },
          ],
        },
        bonuses: {
          title: 'Bonuses',
          items: [
            {
              title: 'How do I claim my free bonus?',
              answer:
                'Congratulations! If you have received an exclusive free bonus, you are moments away from enjoying your present. Please open the Cashier, navigate to the Bonuses Section, type in the relevant Coupon Code and click the Submit button. The bonus is then yours!',
            },
            {
              title: 'On which games can I play with my bonus?',
              answer:
                "Unless otherwise stated, all bonuses have 'Standard Wagering' terms, meaning that you can place bets on Slots and Scratch games. It’s important to note, however, that eligible games may differ from one offer to another, so we recommend you review our Bonus Policy by <a href='/bonus-policy' class='TextLink'>clicking here</a> to avoid any confusion.",
            },
            {
              title: 'Where can I check my bonus wagering requirements?',
              answer:
                "You can keep track of your bonus wagering requirements by accessing the Cashier and then navigating to the Bonuses section. Its important to note that wagering requirements may differ from one offer to another so we recommended you review our Bonus Policy by <a href='/bonus-policy' class='TextLink'>clicking here</a> to avoid any confusion.",
            },
          ],
        },
        deposits: {
          title: 'Deposits & withdrawals',
          items: [
            {
              title: 'What methods can I use to deposit money into my account?',
              answer:
                "Once you are ready to play with real money, you will find that depositing at Roomcasino couldn't be easier. We accept all major payment methods including credit/debit cards, Neteller, Skrill and many other e-payment options. You can find all the methods available for your country in the Deposit section of the Cashier. Availability depends on your country.",
            },
            {
              title: 'I’ve just requested a withdrawal. Do I need to send any documentation?',
              answer:
                "As part of our security procedure, we require standard verification documents upon customers' first withdrawal request. If your funds are being returned by Wire Transfer or your withdrawal is general winnings above the amount you have deposited, we kindly ask you to provide us with the following:<br/><br/><ol><li>Utility bill no older than 6 months</li><li>Copy of the front of your credit card (for security reasons, please ensure that the middle 8 digits on the front of your credit card are hidden)</li><li>Proof of ID (Passport/Driving Licence etc.)</li><li>If you are withdrawing to an E-Wallet account, please provide us with your account number/email address attached to the account.</li></ol>We check documents as quickly as possible, usually less than 12 hours. It could take longer if extra verification is needed, so if you haven’t heard from us within 48 hours, please contact customer support.",
            },
            {
              title: 'How long will it take to receive my withdrawal?',
              answer:
                "Our Lightning Withdrawals means you'll get your cash within 24 hours, subject to providing any information we require in accordance with our terms and conditions.For a complete timetable of when you should expect to see your funds in your account, please visit the Withdraw section of the Cashier.",
            },
            {
              title: 'How long will it take to receive my withdrawal?',
              answer:
                "Our Lightning Withdrawals means you'll get your cash within 24 hours, subject to providing any information we require in accordance with our terms and conditions.<br/><br/>For a complete timetable of when you should expect to see your funds in your account, please visit the Withdraw section of the Cashier.",
            },
            {
              title:
                'I received the error message: You cannot withdraw while having active bonuses, please contact support to resolve this issue. What should I do?',
              answer:
                'If you have an active bonus in your account, you are first required to fulfil the bonus requirements before placing a withdrawal request. For your convenience, you can keep track of your bonus requirements progress in the Bonuses section of the Cashier. Once the bonus requirements have been fulfilled, you will be able to proceed with your withdrawal request.',
            },
            {
              title: 'Can I set limits on my play at Roomcasino?',
              answer:
                'Yes you can. We take pride in providing a safe environment for your gaming. You can set your deposit limits under the personal settings section of the cashier. You can also set other limits on your account, such as limiting account access for specified periods of time. These can be found within the Account Limitations section. Please refer to our Responsible Gaming page for more details.',
            },
            {
              title: 'How will I know if there are any fees for processing at Roomcasino?',
              answer:
                'If applicable, any fee in connection with any processing is clearly shown during the deposit/withdrawal process.',
            },
          ],
        },
        security: {
          title: 'Security',
          items: [
            {
              title: 'Is Roomcasino a safe place to play?',
              answer:
                'Roomcasino is highly recommended thanks not only to the popularity of our games but also to the security we offer our players. The entire gaming system and internal procedures are fully certified in line with all necessary conditions as set out by licence conditions.',
            },
            {
              title: 'How safe are my personal details at Roomcasino?',
              answer:
                'Roomcasino goes to great lengths to guarantee that your personal and financial information remains 100% secure and confidential. We employ industry standard security protocol(The connection to this site is encrypted and authenticated using TLS 1.2 (a strong protocol), ECDHE_RSA with X25519 (a strong key exchange), and AES_128_GCM (a strong cipher) to ensure that all transactions including deposits and withdrawals are carried out in a totally secure manner. This technology protects you from having your information intercepted by anyone other than Roomcasino while it is being transmitted between you and Roomcasino.',
            },
            {
              title: 'On which platforms is Roomcasino available?',
              answer:
                'You will be able to play your favourite games through a large variety of platforms. Our software is available on PC, tablets and smart phones.',
            },
            {
              title: 'Which game providers are available at Roomcasino?',
              answer:
                "Roomcasino offers games from providers Amaya, NextGen, NetEnt, WMS, Evolution and many others, so you're guaranteed to find something you like!",
            },
          ],
        },
      },
      activeItem: 'account',
      tabsSectionIsActive: true,
    };
  },
  computed: {
    ...mapState(['width']),
    tabs() {
      return Object.entries(this.items).map(item => ({
        name: item[1].title,
        value: item[0],
      }));
    },
  },
  methods: {
    onChooseTab(e) {
      this.activeItem = e;
      this.tabsSectionIsActive = false;
    },
  },
};
</script>

<style lang="scss">
.FaqPage {
  margin-bottom: 61px;

  @media (min-width: $screen-l) {
    margin-bottom: 80px;
  }

  @media (min-width: $screen-xl) {
    margin-bottom: 104px;
  }

  &-Title {
    margin-top: 36px;
    margin-bottom: 40px;
    text-align: left;

    @media (min-width: $screen-m) {
      margin-top: 42px;
      margin-bottom: 40px;
    }

    @media (min-width: $screen-l) {
      margin-top: 56px;
      margin-bottom: 60px;
    }

    @media (min-width: $screen-xl) {
      margin-top: 64px;
    }
  }

  &-Tabs {
    flex-shrink: 0;
    font-size: 12px;
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      width: 172px / 768px * 100%;
      font-size: 9px;
    }

    @media (min-width: $screen-l) {
      font-size: 10px;
    }

    @media (min-width: $screen-xl) {
      font-size: 12px;
    }
  }

  &-Back {
    position: relative;
    margin-bottom: 33px;
    padding-left: 14px;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    color: var(--color-main1);

    @media (min-width: $screen-m) {
      display: none;
    }

    &:before {
      content: '';
      position: absolute;
      top: 2px;
      left: 0;
      padding: 4px;
      border-width: 0 0 2px 2px;
      border-style: solid;
      border-color: var(--color-main1);
      transform: rotate(45deg);
    }
  }

  &-SectionTitle {
    @media (min-width: $screen-m) {
      display: none;
    }
  }

  &-Content {
    @media (min-width: $screen-m) {
      display: flex;
      align-items: flex-start;
    }
  }

  &-Answers {
    flex-grow: 1;

    @media (min-width: $screen-m) {
      padding: 0 42px;
    }

    @media (min-width: $screen-l) {
      padding: 0 48px;
    }
  }
}
</style>
