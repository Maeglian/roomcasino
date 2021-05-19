<template>
  <div v-click-outside="onClickOutside" class="Accordion">
    <div
      class="Accordion-Title"
      :class="{ 'Accordion-Title--active': isOpen }"
      @click="isOpen = !isOpen"
    >
      {{ title }}
    </div>
    <div v-if="isOpen" class="Accordion-Content" v-html="content">
      <!--      <i18n path="supportPages.faqPage.items.bonuses.items.list" tag="span">
        <template #list>
          <ol>
            <li v-for="(li, index) in list" :key="index">{{ li }}</li>
          </ol>
        </template>
      </i18n>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    onClickOutside(e) {
      if (!e.target.closest('.Accordion')) this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.Accordion {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-text-ghost);

  @media (min-width: $screen-m) {
    padding: 15px 0;
  }

  @media (min-width: $screen-l) {
    padding: 20px 0;
  }

  @media (min-width: $screen-xl) {
    padding: 30px 0;
  }

  &-Title {
    position: relative;
    padding-right: 27px;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.6;
    color: var(--color-text-main);
    text-transform: uppercase;
    cursor: pointer;

    @media (min-width: $screen-m) {
      font-size: 10px;
    }

    @media (min-width: $screen-l) {
      font-size: 12px;
    }

    @media (min-width: $screen-xl) {
      font-size: 14px;
    }

    &:after {
      content: '+';
      position: absolute;
      top: -8px;
      right: 0;
      font-size: 30px;
      font-weight: 400;
      color: var(--color-text-main);
      transition: transform 0.1s ease;

      @media (min-width: $screen-m) {
        top: -15px;
      }
    }

    &--active {
      &:after {
        color: var(--color-main1);
        transform: rotate(45deg);
      }
    }
  }

  &-Content {
    padding-top: 18px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
    color: var(--color-text-faded);

    @media (min-width: $screen-m) {
      padding-top: 14px;
      font-size: 12px;
    }

    @media (min-width: $screen-l) {
      padding-top: 20px;
    }

    @media (min-width: $screen-l) {
      padding-top: 30px;
      font-size: 14px;
    }
  }
}
</style>
