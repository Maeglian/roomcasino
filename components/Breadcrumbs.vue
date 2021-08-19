<template>
  <ul class="BreadcrumbList">
    <li class="BreadcrumbList-Item">
      <NuxtLink class="Link BreadcrumbList-ItemLink" to="/">
        <span property="name">Lobby</span>
      </NuxtLink>
      <meta property="position" content="1" />
    </li>
    <li v-for="(crumb, index) in crumbs" :key="index" class="BreadcrumbList-Item">
      <NuxtLink class="Link BreadcrumbList-ItemLink" :to="crumb.path">
        <span>{{ $route.fullPath === crumb.path && title !== null ? title : crumb.title }}</span>
      </NuxtLink>
      <meta property="position" :content="index + 2" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    crumbs() {
      const { fullPath } = this.$route;
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/');
      const crumbs = [];

      let path = '';

      params.forEach((param /* , index */) => {
        path = `${path}/${param}`;
        const match = this.$router.match(path);

        if (match.name !== null) {
          crumbs.push({
            title: param.replace(/-/g, ' '),
            ...match,
          });
        }
      });
      return crumbs;
    },
  },
};
</script>

<style lang="scss">
.BreadcrumbList {
  display: flex;
  align-items: center;
  margin: 60px 0 40px;
  padding: 7px 16px;
  font-size: 12px;
  color: var(--color-text-main);
  background-color: var(--color-bg);

  &-Item {
    position: relative;
    margin-right: 36px;

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: -23px;
      width: 8px;
      height: 8px;
      background-image: url(~@/assets/img/breadcrambs.svg);
      background-repeat: no-repeat;
      background-size: cover;
      transform: translate(0, -50%);
    }

    &:last-child {
      margin-right: 0;

      &:after {
        display: none;
      }
    }

    .nuxt-link-exact-active {
      color: var(--color-text-faded);
    }
  }

  &-ItemLink {
    text-transform: capitalize;
  }
}
</style>
