import axios from 'axios';
import { API_HOST } from './config';

const target =
  process.env.NUXT_ENV_MODE === 'sandbox' || process.env.NUXT_ENV_MODE === 'stage'
    ? 'static'
    : 'server';

const ssr = !(process.env.NUXT_ENV_MODE === 'sandbox' || process.env.NUXT_ENV_MODE === 'stage');

const plugins =
  process.env.NUXT_ENV_MODE === 'sandbox' || process.env.NUXT_ENV_MODE === 'stage'
    ? [
        '@/plugins/globals',
        '@/plugins/axios',
        '@/plugins/globals.client',
        '@/plugins/onNuxtReady.client',
        '@/plugins/stageClientInit.client',
      ]
    : [
        '@/plugins/globals',
        '@/plugins/axios',
        '@/plugins/globals.client',
        '@/plugins/onNuxtReady.client',
      ];

export default {
  target,
  ssr,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'ninecasino',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&display=swap',
        media: 'print',
        onload: "this.media='all'",
      },
    ],
    script: [
      {
        src: 'https://dga.pragmaticplaylive.net/dgaAPI.js',
      },
      {
        src: '/js/liveChat.js',
        defer: true,
      },
      {
        src: 'https://034906ca-0989-44fa-8bff-6a0fdffc45bb.snippet.antillephone.com/apg-seal.js',
      },
    ],
    noscript: [
      {
        innerHTML:
          '<a href="https://www.livechatinc.com/chat-with/12226866/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechatinc.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a>',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins,

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/style-resources', '@nuxtjs/gtm', 'nuxt-i18n'],

  i18n: {
    locales: [
      {
        code: 'en',
        codeCountry: 'en_GB',
        file: 'en.json',
        icon: 'en.svg',
      },
      {
        code: 'fr',
        codeCountry: 'fr_FR',
        file: 'fr_ca.json',
        icon: 'fr_ca.svg',
      },
      {
        code: 'cs',
        codeCountry: 'cs_CZ',
        file: 'cs.json',
        icon: 'cs.svg',
      },
      {
        code: 'de',
        codeCountry: 'de_DE',
        file: 'de.json',
        icon: 'de.svg',
      },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: '~/locales/',
    vueI18n: {
      fallbackLocale: 'en',
    },
    detectBrowserLanguage: {
      alwaysRedirect: true,
    },
  },

  gtm: {
    enabled: process.env.NUXT_ENV_MODE === 'production',
    id: 'GTM-WGL6JVV',
  },

  styleResources: {
    scss: ['@/assets/styles/variables.scss'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    extend(config) {
      config.resolve.alias.vue = 'vue/dist/vue.common';
    },
  },

  router: { middleware: ['closeNav'] },
  generate: {
    fallback: 'index.html',
    routes() {
      const routes = [
        '/cabinet/history/game',
        '/cs/cabinet/history/game',
        '/de/cabinet/history/game',
        '/fr-CA/cabinet/history/game',
        '/cabinet/history/transaction',
        '/cs/cabinet/history/transaction',
        '/de/cabinet/history/transaction',
        '/fr-CA/cabinet/history/transaction',
        '/cabinet/history/bonus',
        '/cs/cabinet/history/bonus',
        '/de/cabinet/history/bonus',
        '/fr-CA/cabinet/history/bonus',
        '/games/all',
        '/cs/games/all',
        '/de/games/all',
        '/fr-CA/games/all',
      ];
      const categories = axios.get(`${API_HOST}/categoryList`).then(res => {
        res.data.data.forEach(category => {
          routes.push(`/games/${category.slug}`);
          routes.push(`/cs/games/${category.slug}`);
          routes.push(`/de/games/${category.slug}`);
          routes.push(`/fr-CA/games/${category.slug}`);
        });
      });
      const providers = axios.get(`${API_HOST}/gameProducerList`).then(res => {
        res.data.data.forEach(provider => {
          routes.push(`/providers/${provider.name}`);
          routes.push(`/cs/providers/${provider.name}`);
          routes.push(`/de/providers/${provider.name}`);
          routes.push(`/fr-CA/providers/${provider.name}`);
        });
      });

      return Promise.all([categories, providers]).then(() => {
        return routes;
      });
    },
  },
};
