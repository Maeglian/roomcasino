export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'roomcasino',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&display=swap',
      },
    ],
    script: [
      {
        src: 'https://static.paymentiq.io/cashier/cashier.js',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/styles/common.scss',
    '@/assets/styles/buttons.scss',
    '@/assets/styles/datepicker.scss',
    '@/assets/styles/links.scss',
    '@/assets/styles/table.scss',
    '@/assets/styles/text.scss',
    '@/assets/styles/transitions.scss',
    '@/assets/styles/variables.scss',
    '@/assets/styles/main.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/globals.client', '@/plugins/globals'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [

  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: ['@/assets/styles/variables.scss'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
};
