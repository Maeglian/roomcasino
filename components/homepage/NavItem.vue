<template>
  <li class="Nav-Item" :class="className">
    <NuxtLink
      v-if="!item.children"
      :to="item.url"
    >
      <div class="Nav-Name" @click="$emit('click')">
        <img
          v-if="item.icon"
          class="Icon Nav-Icon"
          :src="require(`@/assets/img/${item.icon}`)"
        />
        {{ item.name }}
      </div>
    </NuxtLink>
    <div v-else-if="item.children && width >= 960"
         class="Nav-Item"
         :class="className"
    >
      <div class="Nav-Name">
        <img
          v-if="item.icon"
          class="Icon Nav-Icon"
          :src="require(`@/assets/img/${item.icon}`)"
        />
        {{ item.name }}
        <i
          class="Nav-Arrow ThinArrow"
          :class="[ listIsOpen ? 'ThinArrow--up' : 'ThinArrow--down', `Nav-Arrow--${item.name}` ]"
          @click="listIsOpen = !listIsOpen"
        ></i>
      </div>
      <transition name="slide-up">
        <ul
          v-show="listIsOpen"
          class="Nav-List"
          :class="`Nav-List--${item.name}`"
          v-click-outside="onClickOutside"
        >
          <NavItem
            v-for="child in item.children"
            :key="child.name"
            :className="className"
            :item="child"
          />
        </ul>
      </transition>
    </div>
    <template v-else-if="item.children">
      <NavItem
        v-for="child in item.children"
        :key="child.name"
        :className="className"
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
      type: String,
      required: false,
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
      if (!e.target.closest('.Nav-List') && !e.target.closest('.Nav-Arrow')) {
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

    @media(min-width: $screen-xs) {
      display: none;
    }
  }

  &-Name {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-main);
    &:hover {
      color: var(--color-main1);
    }
  }

  &-Arrow {
    margin-left: 6px;
  }

  &-List {
    position: absolute;
    right: 0;
    top: 60px;
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
      @media(min-width: $screen-m) {
        display: block;
      }
    }

    .Nav-Item {
      display: inline-block;
      margin-right: 0;
      margin-bottom: 4px;
      padding: 26px 50px 20px 43px;
      background-color: var(--color-bg);

      &:after {
        display: none;
      }
    }
  }
}
</style>
