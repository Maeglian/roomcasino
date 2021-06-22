<template>
  <div class="LangSwitcher">
    <button type="button" class="LangSwitcher-ActiveLang" @click="isOpen = !isOpen">
      <img class="LangSwitcher-Icon" :src="require(`@/assets/img/${activeLocale.icon}`)" />
    </button>
    <div
      ref="langSwitcher"
      v-click-outside="onClickOutside"
      class="LangSwitcher-Inner"
      :class="{ 'LangSwitcher-Inner--hidden': !isOpen }"
      :style="{ top: `calc(-${height}px - 6px)` }"
    >
      <NuxtLink
        v-for="locale in availableLocales"
        :key="locale.code"
        class="LangSwitcher-Lang"
        :to="switchLocalePath(locale.code)"
        @click.native="isOpen = false"
      >
        <img class="LangSwitcher-Icon" :src="require(`@/assets/img/${locale.icon}`)" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LangSwitcher',
  data() {
    return {
      isOpen: false,
      height: 0,
    };
  },
  computed: {
    activeLocale() {
      return this.$i18n.locales.find(i => i.code === this.$i18n.locale);
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    },
  },
  mounted() {
    this.height = this.$refs.langSwitcher.clientHeight;
  },
  methods: {
    onClickOutside(e) {
      if (e.target && !e.target.closest('.LangSwitcher-ActiveLang')) this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.LangSwitcher {
  position: relative;

  &-ActiveLang {
    display: inline-flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    overflow: hidden;
    background: var(--color-bg2);
    border-radius: 50%;
    cursor: pointer;
  }

  &-Inner {
    position: absolute;
    left: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 34px;
    padding: 7px 0;
    background: var(--color-bg2);
    border-radius: 60px;

    &--hidden {
      visibility: hidden;
    }
  }

  &-Lang {
    margin-bottom: 6px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-Icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
