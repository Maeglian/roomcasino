<template>
  <div>
    <router-link
      v-for="item in items"
      :key="item.name"
      class="Nav-Item"
      :class="[item.highlighted || (listIsOpen && item.children) ? 'Nav-Item--highlighted' : '' ]"
      :to="item.url"
    >
      <div class="Nav-Name" @click="$emit('click')">
        <svg
          v-if="item.icon"
          class="Icon Nav-Icon"
          :width="item.iconDimensions[0]"
          :height="item.iconDimensions[1]">
          <use :xlink:href="require('@/assets/img/icons.svg') + `#${item.icon}`"></use>
        </svg>
        {{ item.name }}
        <i
          class="Nav-Arrow Arrow"
          :class="[ listIsOpen ? 'Arrow--up' : 'Arrow--down' ]"
          v-if="item.children"
          @click="listIsOpen = !listIsOpen"
        ></i>
        <transition name="slide-up">
          <ul v-if="item.children" v-show="listIsOpen" class="Nav-List">
            <NavItem v-if="item.children" :items="item.children" />
          </ul>
        </transition>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      listIsOpen: false,
    };
  },
};
</script>

<style lang="scss">
.Nav {
  &-List {
    background-color: #1D2047;
  }

  &-Icon {
    margin-right: 16px;
    stroke: var(--color-text-ghost);
    fill: var(--color-text-ghost);
  }

  &-Item {
    cursor: pointer;
  }

  &-Item:hover {
    .Nav-Icon {
      stroke: var(--color-main1);
      fill: var(--color-main1);
    }
  }

  &-Name {
    position: relative;
    display: flex;
    align-items: center;
    padding: 8px 0 8px 16px;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-text-ghost);

    &:hover {
      color: var(--color-main1);
      background-color: #242857;
    }
  }

  &-Arrow {
    position: absolute;
    top: 50%;
    right: 10px;
  }
}
</style>
