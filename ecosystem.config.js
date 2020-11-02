module.exports = {
  apps: [
    {
      name: 'roomcasino',
      exec_mode: 'cluster',
      instances: 'max',
      watch: false,
      script: 'run start',
      args: 'start'
    }
  ]
}
