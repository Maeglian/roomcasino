<template>
  <div v-click-outside="onClickOutside" class="ProvidersMenu">
    <div v-if="insideFilters" class="CategoriesFilter ProvidersMenu-Filter">
      <div class="CategoriesFilter-Title">Providers</div>
      <div class="CategoriesFilter-Footer CategoriesFilter-Footer--full">
        <button class="DefaultGames-ChosenTab CategoriesFilter-ChosenProvider" @click="onOpen">
          <img
            v-if="!providersWithoutIcons.includes(providerActive.name)"
            class="ProvidersMenu-ProviderIcon"
            :src="
              require(`@/assets/img/${providerActive.name
                .toLowerCase()
                .split(' ')
                .join('')}.svg`)
            "
            alt=""
          />
          <span class="CategoriesFilter-Default">
            {{ providerActive.name }}
          </span>
          <i class="ThinArrow" :class="[isOpen ? 'ThinArrow--up' : 'ThinArrow--down']"></i>
        </button>
      </div>
    </div>
    <button
      v-else
      class="DefaultGames-ChosenTab"
      :class="{ 'DefaultGames-ChosenTab--opened': isOpen }"
      @click="onOpen"
    >
      <img
        v-if="providerActive.iconUrl"
        class="ProvidersMenu-ProviderIcon"
        :src="providerActive.iconUrl"
        alt=""
      />
      <span class="ProvidersMenu-ActiveProvider">
        {{ providerActive.name }}
      </span>
      <i class="Arrow Tab-Arrow" :class="[isOpen ? 'Arrow--up' : 'Arrow--down']"></i>
    </button>
    <div v-if="width > 767" class="ProvidersMenu-Providers">
      <button
        v-for="(item, i) in providersToShow"
        :key="gameProducerList[i].name"
        class="ProvidersMenu-Provider"
        :class="{
          'ProvidersMenu-Provider--active': providerActive.name === gameProducerList[i].name,
        }"
        @click="onChooseProvider(gameProducerList[i])"
      >
        <img
          v-if="gameProducerList[i].iconUrl"
          class="ProvidersMenu-ProviderIcon"
          :src="gameProducerList[i].iconUrl"
          :alt="gameProducerList[i].name"
        />
        <span class="ProvidersMenu-ProviderName">
          {{ gameProducerList[i].name }}
        </span>
      </button>
      <button
        v-if="width > 767 && showMoreProviders"
        class="ProvidersMenu-Provider ProvidersMenu-Provider--more"
        :class="{ 'ProvidersMenu-Provider--active': isOpen }"
        @click="onOpen"
      >
        ...
      </button>
    </div>
    <transition name="slide-up">
      <div
        v-if="isOpen"
        class="ProvidersMenu-MoreProviders"
        :class="{ 'ProvidersMenu-MoreProviders--top': insideFilters }"
      >
        <button
          v-for="(item, i) in moreProviders"
          :key="i"
          class="ProvidersMenu-AddProvider"
          :class="{
            'ProvidersMenu-Provider--active': providerActive.name === item.name,
            'ProvidersMenu-Provider--noIcon': !item.iconUrl,
          }"
          @click="onChooseProvider(item)"
        >
          <img v-if="item.iconUrl" class="ProvidersMenu-ProviderIcon" :src="item.iconUrl" alt="" />
          {{ item.name }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import toggleDropdown from '@/mixins/toggleDropdown';
import gameProducer from '@/mixins/gameProducer';

export default {
  name: 'ProvidersMenu',
  mixins: [toggleDropdown, gameProducer],
  props: {
    providerActive: {
      type: Object,
      required: true,
    },
    insideFilters: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapState(['width']),
    providersToShow() {
      return this.gameProducerList.length > 3 ? 4 : this.gameProducerList.length;
    },
    showMoreProviders() {
      return this.gameProducerList.length > this.providersToShow;
    },
    moreProviders() {
      if (this.width < 768) return this.gameProducerList;
      return [...this.gameProducerList].slice(1, this.gameProducerList.length + 1);
    },
  },
  methods: {
    onChooseProvider(provider) {
      this.$emit('choose-provider', provider);
      this.isOpen = false;
    },
    onClickOutside() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.ProvidersMenu {
  position: relative;
  display: flex;
  flex-direction: column;

  @media (min-width: $screen-m) {
    display: grid;
    flex-direction: initial;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px;
  }

  &-Providers {
    grid-column: 1/7;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    padding: 0;

    @media (min-width: $screen-m) {
      height: 32px;
    }

    @media (min-width: $screen-l) {
      height: 42px;
    }

    @media (min-width: $screen-xl) {
      height: 50px;
    }
  }

  &-MoreProviders {
    position: absolute;
    top: 38px;
    left: 0;
    z-index: 10;
    width: 100%;
    max-height: 2000px;
    padding: 10px 10px 16px;
    column-count: 2;
    background-color: var(--color-bg-lighter);

    @media (min-width: $screen-xs) {
      padding: 10px 16px 16px;
    }

    @media (min-width: $screen-s) {
      column-count: 3;
    }

    @media (min-width: $screen-m) {
      top: 32px;
      column-count: 5;
    }

    @media (min-width: $screen-l) {
      top: 43px;
    }

    @media (min-width: $screen-xl) {
      top: 50px;
    }

    &--top {
      top: 60px;
    }
  }

  &-AddProvider {
    display: flex;
    align-items: center;
    height: 30px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.18;
    text-align: left;
    color: var(--color-text-ghost);
    text-transform: uppercase;
    cursor: pointer;
    break-inside: avoid;
  }

  &-Provider {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    font-size: 9px;
    font-weight: 700;
    line-height: 1.18;
    color: var(--color-text-main);
    text-transform: uppercase;
    border: 2px solid var(--color-border-ghost);
    cursor: pointer;

    @media (min-width: $screen-l) {
      padding: 0 10px;
      font-size: 10px;
    }

    @media (min-width: $screen-xl) {
      padding: 0 10px;
      font-size: 12px;
    }

    &--noIcon {
      padding-left: 30px;

      @media (min-width: $screen-m) {
        padding-left: 28px;
      }

      @media (min-width: $screen-l) {
        padding-left: 35px;
      }
    }

    &--active {
      display: none;
      color: var(--color-main1);

      @media (min-width: $screen-m) {
        display: flex;
      }
    }

    &--more {
      justify-self: start;
      padding: 0 10px;
      font-size: 9px;
      letter-spacing: 0.08em;

      @media (min-width: $screen-l) {
        padding: 0 15px;
        font-size: 10px;
      }

      @media (min-width: $screen-xl) {
        padding: 0 20px;
        font-size: 14px;
      }
    }
  }

  &-ProviderIcon {
    width: 20px;
    margin-right: 10px;

    @media (min-width: $screen-l) {
      width: 25px;
      margin-right: 3px;
    }

    @media (min-width: $screen-l) {
      margin-right: 10px;
    }
  }

  &-ProviderName {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &-Filter {
    @media (min-width: $screen-m) {
      &.CategoriesFilter {
        display: none;
      }
    }
  }

  &-ActiveProvider {
    font-size: 12px;
    font-weight: 700;
    line-height: 1.242;
    color: var(--color-text-main);
    text-transform: uppercase;
  }
}
</style>
