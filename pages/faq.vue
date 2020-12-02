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
        most_popular: {
          title: 'Most popular',
          items: [
            {
              title: 'Why should I choose to play casino games on Roomcasino?',
              answer:
                'Depositing money on is very simple and straightforward. We offer a variety of options for you to choose from so that you don’t feel like you’re forced into using a service you don’t feel comfortable with. Pick your preferred method, deposit money, and start to play online casino games. The deposit methods on our platform include Visa, MasterCard, Maestro, Neosurf, Paysafecard, ecoPayz, Bitcoin, Ethereum, Bitcoin Cash, Dogecoin, Litecoin, and Tether. As you can see, we cover different types of payments that include bank cards e-wallets and cryptocurrencies. The minimum amount you can deposit is $10 and the maximum will depend on the particular method you’re using. Generally, it will vary between $1,000 and $10,000. ',
            },
            {
              title: 'Is it safe to gamble on Roomcasino?',
              answer: 'lorem ipsum',
            },
            {
              title: 'What is the game catalog of Roomcasino?',
              answer: 'lorem ipsum',
            },
            {
              title: 'Can I gamble on my phone?',
              answer: 'lorem ipsum',
            },
            {
              title: 'Why should I choose to play casino games on Roomcasino?',
              answer: 'lorem ipsum',
            },
            {
              title: 'Is it safe to gamble on Roomcasino?',
              answer: 'lorem ipsum',
            },
          ],
        },
        account: {
          title: 'Account',
          items: [
            {
              title: '111',
              answer: '111',
            },
          ],
        },
        bonuses: {
          title: 'Bonuses',
          items: [
            {
              title: '222',
              answer: '222',
            },
          ],
        },
        deposits: {
          title: 'Deposits & withdrawals',
          items: [
            {
              title: '333',
              answer: '333',
            },
          ],
        },
        security: {
          title: 'Security',
          items: [
            {
              title: '444',
              answer: '444',
            },
          ],
        },
        tournaments: {
          title: 'Tournaments',
          items: [
            {
              title: '555',
              answer: '555',
            },
          ],
        },
      },
      activeItem: 'most_popular',
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
