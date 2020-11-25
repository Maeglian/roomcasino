<template>
  <div class="Banner">
    <picture class="Banner-Image">
      <source
        v-if="image460"
        media="(max-width: 460px)"
        :srcset="require(`@/assets/img/${image460}`)"
      />
      <source
        v-if="image768"
        media="(max-width: 768px)"
        :srcset="require(`@/assets/img/${image768}`)"
      />
      <source
        v-if="image960"
        media="(max-width: 960px)"
        :srcset="require(`@/assets/img/${image960}`)"
      />
      <source
        v-if="image1248"
        media="(max-width: 1248px)"
        :srcset="require(`@/assets/img/${image1248}`)"
      />
      <img :srcset="require(`@/assets/img/${image}`)" alt="" loading="lazy" />
    </picture>
    <div class="Banner-Content">
      <div class="Banner-Title">
        <slot name="title"></slot>
      </div>
      <div class="Banner-Subtitle">
        <slot name="subtitle"></slot>
      </div>
      <div class="Banner-Counter">
        <slot name="counter"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    image: {
      type: String,
      required: true,
    },
    image460: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    image768: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    image960: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    image1248: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.Banner {
  position: relative;

  &-Image {
    display: block;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top right;
    }
  }

  &-Content {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);

    @media (min-width: $screen-m) {
      left: 23px;
    }

    @media (min-width: $screen-xl) {
      left: 34px;
    }
  }

  &-Title {
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      font-size: 18px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 25px;
      font-size: 22px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 32px;
      font-size: 28px;
    }
  }

  &-Subtitle {
    font-size: 12px;
    font-weight: 700;
    line-height: 1.25;
    color: var(--color-text-main);

    @media (min-width: $screen-m) {
      font-size: 14px;
    }

    @media (min-width: $screen-l) {
      font-size: 18px;
    }

    @media (min-width: $screen-xl) {
      font-size: 20px;
    }
  }

  &-Counter {
    margin-top: auto;
  }
}

.Banner--withCounter {

  .Banner-Title {
    margin-bottom: 6px;

    @media (min-width: $screen-l) {
      margin-bottom: 8px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 14px;
    }
  }

  .Banner-Content {
    display: flex;
    flex-direction: column;
    height: calc(100% - 24px);
  }
}
</style>
