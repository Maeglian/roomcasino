module.exports = {
  apps: [
    {
      name: 'roomcasino',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'run start',
      args: 'start'
    }
  ]
}
