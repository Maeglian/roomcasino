export const BILLING_PROVIDER_ID = 'devcode';
export const API_HOST_SANDBOX = 'http://az-44.sandbox.aramuz.net/frontapi/roomcasino';
export const API_HOST_PROD = 'https://dev.aramuz.net/frontapi/roomcasino';

export const LIMIT_TYPES = [
  { name: 'Deposit limits', value: 'depositLimit' },
  // { name: 'Session limits', value: 'sessionLimit' },
];

export const LIMIT_DETAILS = {
  // lossLimit: {
  //   text:
  //     'Your account can be set with loss limits. This setting limits the amount you can lose per day, week or mounth.',
  //   fields: ['limitState', 'limitAmount', 'currentPeriod', 'isMoney', 'reset', 'title'],
  // },
  // wagerLimit: {
  //   text:
  //     'Your account can be set with wager limits. This setting controls the amount of money you can wager per day, week or mounth.',
  //   fields: ['limitState', 'limitAmount', 'currentPeriod', 'isMoney', 'reset', 'title'],
  // },
  depositLimit: {
    text:
      'Your account can be set with deposit limits. This setting limits  the amount you can deposit per day, week or mounth.',
    editRules:
      'You can reduce your limit at any time, this change will take effect immediately. You can increase the limit, however, in order for this change to take effect, you need 24 hours.',
    deleteRules:
      'Cancellation of the deposit limit takes 24 hours. After the limit is exceeded, you will receive an email notification.',
    fields: ['type', 'period', 'currencyLimitList'],
  },
  // sessionLimit: {
  //   title: 'time spent gambling',
  //   text:
  //     'The restriction takes effect instantly. If you hit the limit, you will be automatically logged out of your  account.',
  //   fields: ['type', 'limitState', 'limitAmount', 'isMoney', 'title'],
  // },
  // self_exclusion: {
  //   title: 'blocked address',
  //   text:
  //     'You can set a self-exclusion limit for a definite or an indefinite period of time.  During the set period you will not be able to log into your account. To be excluded from gambiling on our site for an indefinite period of time, please, contact our support team via live-chat.',
  //   fields: ['isMoney', 'title', 'period'],
  // },
  // reality_check: {
  //   title: 'notification',
  //   text:
  //     "Do you want to track your activity? We'll send you  an hourly notification in-game to remind you of how much you have spent at the Casino. It'll help you to get an overview of your gambing and perhaps consider pausing play for a while. You can get the notification every 15,30,45 and 60 minutes.",
  //   fields: ['isMoney', 'title', 'period'],
  // },
};

export const LIMIT_PERIODS = [
  {
    name: 'daily',
    value: 'dayLimit',
  },
  {
    name: 'weekly',
    value: 'weekLimit',
  },
  {
    name: 'monthly',
    value: 'monthLimit',
  },
];
