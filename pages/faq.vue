<template>
  <section class="FaqPage">
    <h1
      v-if="tabsSectionIsActive || width >= 768"
      class="Title Title--type-h1 Page-Title FaqPage-Title"
    >
      {{ $t('supportPages.faqPage.title') }}
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
        <button class="FaqPage-Back" @click="tabsSectionIsActive = true">Back</button>
        <h2 class="Title Title--type-h1 FaqPage-SectionTitle">
          <!--          {{ items[activeItem].title }}-->
          {{ $t(`supportPages.faqPage.items.${[activeItem]}.title`) }}
        </h2>
        <Accordion
          v-for="(item, i) in $t(`supportPages.faqPage.items.${[activeItem]}.items`)"
          :key="i"
          :title="item.title"
          :content="item.answer"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import BaseTabs from '@/components/base/BaseTabs.vue';
import Accordion from '@/components/Accordion.vue';

export default {
  name: 'FaqPage',
  components: {
    BaseTabs,
    Accordion,
  },
  layout: 'page',
  data() {
    return {
      activeItem: 'account',
      tabsSectionIsActive: true,
    };
  },
  head() {
    return {
      title: this.$t('metaTags.faq.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('metaTags.faq.description'),
        },
      ],
    };
  },
  computed: {
    ...mapState(['width']),
    tabs() {
      return Object.entries(this.$t('supportPages.faqPage.items')).map(item => ({
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
