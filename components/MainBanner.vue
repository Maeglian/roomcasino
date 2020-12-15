<template>
  <section class="MainBanner">
    <picture class="MainBanner-Image">
      <source
        v-if="image460"
        media="(max-width: 460px)"
        :srcset="require(`@/assets/img/${image460}`)"
      />
      <source
        v-if="image590"
        media="(max-width: 589px)"
        :srcset="require(`@/assets/img/${image590}`)"
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
      <img :srcset="require(`@/assets/img/${image}`)" loading="lazy" :alt="title" />
    </picture>
    <div class="MainBanner-Content">
      <div v-if="title" class="Banner-Title" v-html="title"></div>
      <div v-if="text" class="MainBanner-Text">
        {{ text }}
      </div>
      <button v-if="btn" class="Btn Btn--common MainBanner-Btn" @click="btn.onClickBtn">
        {{ btn.text }}
      </button>
      <NuxtLink v-if="btnLink" :to="btnLink.url" class="Btn Btn--common MainBanner-Btn">
        {{ btnLink.text }}
      </NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MainBanner',
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
    image590: {
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
    title: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    text: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    btn: {
      type: [Object, Boolean],
      required: false,
      default: false,
    },
    btnLink: {
      type: [Object, Boolean],
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.MainBanner {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding-right: 0;
  padding-left: 0;
  overflow: hidden;

  &-Image {
    display: block;
    width: 100%;

    img {
      width: 100%;
    }
  }

  //&-Image {
  //  position: absolute;
  //  top: 0;
  //  left: 0;
  //  width: 100%;
  //  display: block;
  //  width: 100%;
  //
  //  @media (min-width: $screen-s) {
  //    position: relative;
  //  }
  //
  //  @media (min-width: $screen-xl) {
  //    height: 558px;
  //  }
  //
  //  img {
  //    width: 100%;
  //    height: 100%;
  //    object-fit: cover;
  //  }
  //}

  &-Content {
    position: absolute;
    top: 0;
    right: 16px;
    left: 16px;
    z-index: 1;
    padding-top: 323px / 320px * 100%;
    text-align: center;

    @media (min-width: $screen-s) {
      right: auto;
      max-width: 50%;
      padding-top: 39px / 728px * 100%;
      text-align: left;
    }

    @media (min-width: $screen-m) {
      padding-top: 58px / 960px * 100%;
    }

    @media (min-width: $screen-xl) {
      left: calc(50% - 624px + 16px);
      max-width: 35%;
      padding-top: 104px;
    }

    @media (min-width: $screen-xxl) {
      max-width: 30%;
    }
  }

  &-Title {
    margin-bottom: 14px;
    font-size: 24px;

    @media (min-width: $screen-m) {
      margin-bottom: 18px;
      font-size: 30px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 22px;
      font-size: 34px;
    }
  }

  &-Text {
    margin-bottom: 28px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.375;
    color: var(--color-text-ghost);

    @media (min-width: $screen-s) {
      margin-bottom: 20px;
      font-size: 14px;
    }

    @media (min-width: $screen-m) {
      margin-bottom: 24px;
      font-size: 18px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 24px;
      font-size: 18px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 38px;
      font-size: 20px;
    }
  }

  &-Btn {
    width: 100%;
    padding: 18px 0;
    font-size: 14px;

    @media (min-width: $screen-s) {
      width: auto;
      padding: 16px 11px;
    }

    @media (min-width: $screen-m) {
      padding: 21px 26px;
      font-size: 16px;
    }

    @media (min-width: $screen-xl) {
      padding: 25px 36px;
    }
  }
}
</style>
