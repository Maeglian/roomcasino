<template>
  <div class="ProvidersMenu" v-click-outside="onClickOutside">
    <div v-if="insideFilters" class="CategoriesFilter ProvidersMenu-Filter">
      <div class="CategoriesFilter-Title">
        Providers
      </div>
      <div class="CategoriesFilter-Footer CategoriesFilter-Footer--full">
        <button
          class="ProvidersMenu-ChosenProvider CategoriesFilter-ChosenProvider"
          @click="onOpen"
        >
          <img
            v-if="providerActive.icon"
            class="ProvidersMenu-ProviderIcon"
            :src="require(`@/assets/img/${providerActive.icon}.svg`)"
            alt=""
          >
          <span class="CategoriesFilter-Default">
            {{ providerActive.name }}
          </span>
          <i
            class="ThinArrow"
            :class="[ isOpen ? 'ThinArrow--up' : 'ThinArrow--down' ]"
          ></i>
        </button>
      </div>
    </div>
    <button
      v-else
      class="ProvidersMenu-ChosenProvider"
      :class="{'BestGames-ChosenTab--opened': isOpen}"
      @click="onOpen"
    >
      <img
        v-if="providerActive.icon"
        class="ProvidersMenu-ProviderIcon"
        :src="require(`@/assets/img/${providerActive.icon}.svg`)"
        alt=""
      >
      <span class="ProvidersMenu-ActiveProvider">
        {{providerActive.name}}
      </span>
      <i
        class="Arrow Tab-Arrow"
        :class="[ isOpen ? 'Arrow--up' : 'Arrow--down' ]"
      ></i>
    </button>
    <div
      v-if="width > 767" class="ProvidersMenu-Providers">
      <button
        v-for="(item, i) in providersToShow"
        :key="providers[i].name"
        class="ProvidersMenu-Provider"
        :class="{'BestGames-Provider--active': providerActive.name === providers[i].name}"
        @click="onChooseProvider(providers[i].name)"
      >
        <img
          v-if="providers[i].icon"
          class="ProvidersMenu-ProviderIcon"
          :src="require(`@/assets/img/${providers[i].icon}.svg`)"
          alt=""
        >
        {{ providers[i].name }}
      </button>
      <button
        v-if="width > 767"
        class="ProvidersMenu-Provider ProvidersMenu-Provider--more"
        :class="{'ProvidersMenu-Provider--active': isOpen}"
        @click="onOpen"
      >
        ...
      </button>
    </div>
    <Search class="ProvidersMenu-Search" />
    <transition name="slide-up">
      <div
        v-if="isOpen"
        class="ProvidersMenu-MoreProviders"
        :class="{'ProvidersMenu-MoreProviders--top': insideFilters}"
        >
        <button
          v-for="(item, i) in moreProviders"
          :key="i"
          class="ProvidersMenu-AddProvider"
          :class="{'ProvidersMenu-Provider--active': providerActive.name === item.name}"
          @click="onChooseProvider(item.name)"
        >
          <img
            v-if="item.icon"
            class="ProvidersMenu-ProviderIcon"
            :src="require(`@/assets/img/${item.icon}.svg`)"
            alt=""
          >
          {{ item.name }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import toggleDropdown from '@/mixins/toggleDropdown';
import Search from '@/components/homepage/Search';

export default {
  name: 'ProvidersMenu',
  mixins: [toggleDropdown],
  props: {
    providerActive: {
      type: Object,
      required: true,
    },
    insideFilters: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  components: {
    Search,
  },
  data() {
    return {
      providersToShow: 4,
    }
  },
  computed: {
    ...mapState(['width', 'providers']),
    ...mapGetters(['providersList']),
    moreProviders() {
      if (this.width < 768) return this.providers;
      return this.providersList(this.providersToShow);
    },
  },
  methods: {
    onChooseProvider(name) {
      const provider = this.providers.find((item) => item.name === name);
      this.$emit('chooseProvider', provider);
      this.isOpen = false;
    },
    onClickOutside(e) {
      if (e.target.className !== 'BestGames-ChosenTab') this.isOpen = false;
    },
  }
};
</script>

<style lang="scss">
.ProvidersMenu {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  @media(min-width: $screen-m) {
    flex-direction: initial;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px;
    margin-bottom: 34px;
  }

  @media(min-width: $screen-l) {
    margin-bottom: 40px;
  }

  @media(min-width: $screen-xl) {
    margin-bottom: 60px;
  }

  &-Providers {
    grid-column: 1/7;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    padding: 0;
  }

  &-MoreProviders {
    position: absolute;
    left: 0;
    top: 100px;
    z-index: 10;
    column-count: 2;
    width: 100%;
    max-height: 2000px;
    padding: 0 16px 10px;
    background-color: var(--color-body);

    @media(min-width: $screen-s) {
      column-count: 3;
    }

    @media(min-width: $screen-m) {
      top: 50px;
      column-count: 5;
    }

    @media(min-width: $screen-l) {
      top: 70px;
    }

    &--top {
      top: 60px;
    }
  }

  &-AddProvider {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.18;
    text-transform: uppercase;
    color: var(--color-text-ghost);
    cursor: pointer;
  }

  &-Provider {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 5px;
    font-size: 9px;
    font-weight: 700;
    line-height: 1.18;
    color: var(--color-text-main);
    text-transform: uppercase;
    border: 2px solid var(--color-border-ghost);
    cursor: pointer;

    @media(min-width: $screen-l) {
      padding: 15px 10px;
      font-size: 10px;
    }

    @media(min-width: $screen-xl) {
      padding: 17px 10px;
      font-size: 12px;
    }

    &--active {
      display: none;
      color: var(--color-main1);

      @media(min-width: $screen-m) {
        display: flex;
      }
    }

    &--more {
      justify-self: start;
      padding: 10px;
      font-size: 9px;
      letter-spacing: 0.08em;

      @media(min-width: $screen-l) {
        padding: 15px;
        font-size: 10px;
      }

      @media(min-width: $screen-xl) {
        padding: 17px 20px;
        font-size: 14px;
      }
    }
  }

  &-ProviderIcon {
    width: 10px;
    margin-right: 10px;

    @media(min-width: $screen-m) {
      width: auto;
      margin-right: 3px;
    }

    @media(min-width: $screen-l) {
      margin-right: 6px;
    }
  }

  &-Search {
    margin-bottom: 8px;
    width: 100%;

    @media(min-width: $screen-m) {
      width: auto;
      margin-bottom: 0;
    }
  }

  &-Filter {
    @media(min-width: $screen-m) {
      &.CategoriesFilter {
        display: none;
      }
    }
  }

  &-ChosenProvider {
    position: relative;
    order: 1;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px;
    background: var(--color-bg);
    border: none;

    @media(min-width: $screen-m) {
      display: none;
    }

    .Arrow {
      position: absolute;
      top: 50%;
      right: 20px;
      margin-top: -2px;
    }

    .Arrow--up {
      margin-top: -8px;
    }
  }

  &-ActiveProvider {
    font-size: 12px;
    font-weight: 700;
    line-height: 1.242;
    text-transform: uppercase;
    color: var(--color-text-main);
  }
}
</style>