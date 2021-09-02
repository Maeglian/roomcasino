<template>
  <li class="Nav-Item" :class="[className, { 'Nav-Item--gr': $i18n.locale === 'gr' }]">
    <NuxtLink v-if="!item.children" :to="item.url" class="Nav-Name" @click.native="$emit('close')">
      <img v-if="item.icon" class="Icon Nav-Icon" :src="require(`@/assets/img/${item.icon}`)" />
      {{ item.name }}
    </NuxtLink>
    <div v-else class="Nav-Item" :class="className">
      <div class="Nav-Name" @click="listIsOpen = !listIsOpen">
        <img v-if="item.icon" class="Icon Nav-Icon" :src="require(`@/assets/img/${item.icon}`)" />
        {{ item.name }}
        <i
          class="Nav-Arrow ThinArrow"
          :class="[listIsOpen ? 'ThinArrow--up' : 'ThinArrow--down', `Nav-Arrow--${item.name}`]"
        ></i>
      </div>
      <transition name="slide-up">
        <ul
          v-show="listIsOpen"
          ref="list"
          v-click-outside="onClickOutside"
          class="Nav-List"
          :class="`Nav-List--${item.name}`"
        >
          <NavItem
            v-for="child in item.children"
            :key="child.name"
            :class-name="className"
            :item="child"
            @close="listIsOpen = false"
          />
        </ul>
      </transition>
    </div>
    <!--    <template v-else-if="item.children">
      <NavItem
        v-for="child in item.children"
        :key="child.name"
        :class-name="className"
        :item="child"
      />
    </template>-->
  </li>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    className: {
      type: [String, Boolean, Array],
      required: false,
      default: false,
    },
  },
  data() {
    return {
      listIsOpen: false,
    };
  },
  computed: {
    ...mapState(['width']),
  },
  methods: {
    onClickOutside(e) {
      if (!(e.target instanceof Element)) return;
      if (!this.$el.contains(e.target)) this.listIsOpen = false;
    },
  },
};
</script>

<style lang="scss">
.Nav {
  &-Item {
    position: relative;
    cursor: pointer;

    @media (min-width: $screen-xs) {
      white-space: nowrap;
    }
  }

  &-Item--gr {
    white-space: normal;
  }

  &-Icon {
    margin-right: 12px;

    @media (min-width: $screen-xs) {
      display: none;
    }
  }

  &-Name {
    position: relative;
    display: flex;
    align-items: center;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;

    &:hover {
      color: var(--color-main1);
    }

    &.nuxt-link-exact-active {
      color: var(--color-main1);
    }
  }

  &-Arrow {
    margin-left: 6px;
  }

  &-List {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding-left: 4px;

    @media (min-width: $screen-xs) {
      padding-left: 0;
    }

    @media (min-width: $screen-l) {
      position: absolute;
      top: 60px;
      right: 0;
      margin-top: 0;
    }

    &:before {
      content: '';
      position: absolute;
      top: -5px;
      right: 10px;
      width: 10px;
      height: 10px;
      background: var(--color-bg);
      transform: rotate(45deg);
    }

    .Nav-Icon {
      @media (min-width: $screen-m) {
        display: block;
      }
    }

    .Nav-Item {
      margin-bottom: 14px;
      @media (min-width: $screen-l) {
        display: inline-block;
        margin-right: 0;
        margin-bottom: 4px;
        background-color: var(--color-bg);

        &:after {
          display: none;
        }
      }
    }

    .Nav-Name {
      //padding: 26px 50px 20px 43px;
      @media (min-width: $screen-l) {
        padding: 26px 50px 20px 43px;
      }
    }
  }
}
</style>
