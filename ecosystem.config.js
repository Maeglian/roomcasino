module.exports = {
  apps: [
    {
      name: 'roomcasino',
      exec_mode: 'cluster',
      instances: 'max',
      watch: false,
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
