<template>
  <li class="Nav-Item" :class="className">
    <NuxtLink v-if="!item.children" :to="item.url" class="Nav-Name" @click.native="$emit('close')">
      <img v-if="item.icon" class="Icon Nav-Icon" :src="require(`@/assets/img/${item.icon}`)" />
      {{ item.name }}
    </NuxtLink>
    <div v-else-if="item.children && width >= 960" class="Nav-Item" :class="className">
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
    <template v-else-if="item.children">
      <NavItem
        v-for="child in item.children"
        :key="child.name"
        :class-name="className"
        :item="child"
      />
    </template>
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
      type: [String, Boolean],
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
      if (!e.target.closest('.Nav-List') && !e.target.closest('.Nav-Item')) {
        this.listIsOpen = false;
      }
    },
  },
};
</script>

<style lang="scss">
.Nav {
  &-Item {
    position: relative;
    white-space: nowrap;
    cursor: pointer;
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
    position: absolute;
    top: 60px;
    right: 0;
    display: flex;
    flex-direction: column;

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
      display: inline-block;
      margin-right: 0;
      margin-bottom: 4px;
      background-color: var(--color-bg);

      &:after {
        display: none;
      }
    }

    .Nav-Name {
      padding: 26px 50px 20px 43px;
    }
  }
}
</style>
