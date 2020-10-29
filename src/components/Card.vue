<template>
  <div class="Card">
    <div v-if="overlay" class="Card-Overlay">
      <button class="Card-Link" @click="$emit('playDemo')">
        Play for fun
      </button>
      <button class="Card-Footer" @click="$emit('play')">
        Play Now
      </button>
    </div>
    <div v-if="badge" class="Card-Badge" :class="{'Card-Badge--text': badge !== 'best'}">
      <svg
        v-if="badge === 'best'"
        class="Card-Icon Card-Icon--best">
        <use xlink:href="@/assets/img/icons.svg#best"></use>
      </svg>
      <template v-else>
        {{ badge }}
      </template>
    </div>
    <div class="Card-Image">
      <img
        v-if="img"
        :src="require(`@/assets/img/${img}`)"
        alt=""
        loading="lazy"
      >
      <img
        v-else
        :src="imgUrl"
        alt=""
        loading="lazy"
      >
    </div>
    <div v-if="sum" class="Card-Sum">
      {{ sum }}
    </div>
    <div v-if="text" class="Card-Text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    img: {
      type: String,
      required: false,
    },
    imgUrl: {
      type: String,
      required: false,
    },
    badge: {
      type: String,
      required: false,
    },
    sum: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    overlay: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.Card {
  position: relative;

  &-Badge {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    &--text {
      padding: 8px;
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--color-text-main);
      background-color: var(--color-badge);
    }
  }

  &-Icon--best {
    width: 30px;
    height: 30px;
  }

  &-Image {
    img {
      width: 100%;
      object-fit: cover;
    }
  }

  &-Sum {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-main1);
    text-align: right;
    white-space: nowrap;

    @media(max-width: $screen-m) {
      font-size: 12px;
    }
  }

  &-Text {
    font-size: 12px;
    font-weight: 400;
    color: var(--color-text-ghost);
    text-align: right;

    @media(max-width: $screen-m) {
      font-size: 10px;
    }
  }

  &-Overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 0;
    display: flex;
    flex-direction: column;
    background-color: var(--color-overlay);
    transition: all .2s ease;
  }

  &-Link {
    display: none;
    align-self: center;
    margin-top: 13%;
    padding: 10px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.242;
    text-transform: uppercase;
    color: var(--color-text-main);
    border: 2px solid var(--color-text-main);
    opacity: 0.7;

    @media(max-width: $screen-l) {
      padding: 8px;
      font-size: 10px;
    }

    @media(max-width: $screen-m) {
      padding: 4px;
      font-size: 9px;
    }
  }

  &-Footer {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    height: 37%;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-main);
    background-color: var(--color-badge);

    @media(max-width: $screen-l) {
      font-size: 14px;
    }

    @media(max-width: $screen-m) {
      font-size: 12px;
    }
  }

  &:hover {
    .Card-Overlay {
      height: 100%;
    }

    .Card-Link  {
      display: block;
    }

    .Card-Footer {
      display: flex;
    }
  }
}

</style>
