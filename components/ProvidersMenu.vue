<template>
  <div class="BestGames-ProvidersMenu" v-click-outside="onClickOutside">
    <button
      class="BestGames-Tab BestGames-ChosenTab"
      :class="{'BestGames-ChosenTab--opened': isOpen}"
      @click="onOpen"
    >
      <img
        v-if="providerActive.icon"
        class="BestGames-ProviderIcon"
        :src="require(`@/assets/img/${providerActive.icon}.svg`)"
        alt=""
      >
      {{providerActive.name}}
      <i
        class="Arrow Tab-Arrow"
        :class="[ isOpen ? 'Arrow--up' : 'Arrow--down' ]"
      ></i>
    </button>
    <div v-if="width > 767" class="BestGames-Providers">
      <button
        v-for="(item, i) in providersToShow"
        :key="providers[i].name"
        class="BestGames-Provider"
        :class="{'BestGames-Provider--active': providerActive.name === providers[i].name}"
        @click="onChooseProvider(providers[i].name)"
      >
        <img
          v-if="providers[i].icon"
          class="BestGames-ProviderIcon"
          :src="require(`@/assets/img/${providers[i].icon}.svg`)"
          alt=""
        >
        {{ providers[i].name }}
      </button>
      <button
        v-if="width > 767"
        class="BestGames-Provider BestGames-Provider--more"
        :class="{'BestGames-Provider--active': isOpen}"
        @click="onOpen"
      >
        ...
      </button>
    </div>
    <Search class="BestGames-Search" />
    <transition name="slide-up">
      <div v-if="isOpen" class="BestGames-MoreProviders">
        <button
          v-for="(item, i) in moreProviders"
          :key="i"
          class="BestGames-AddProvider"
          :class="{'BestGames-Provider--active': providerActive.name === item.name}"
          @click="onChooseProvider(item.name)"
        >
          <img
            v-if="item.icon"
            class="BestGames-ProviderIcon"
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

<style scoped>

</style>
