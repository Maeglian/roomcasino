import moment from 'moment';

export const BILLING_PROVIDER_ID = 'devcode';
export const API_HOST_SANDBOX = 'http://az-44.sandbox.aramuz.net/frontapi/roomcasino';
export const API_HOST_PROD = 'https://dev.aramuz.net/frontapi/roomcasino';

export const DEFAULT_PROVIDER = { name: 'All providers', noIcon: true };

export const GAME_TYPES = [
  {
    name: 'All games',
    icon: 'star',
  },
  {
    name: 'Top games',
    icon: 'crown',
  },
  {
    name: 'Live casino',
    type: 'live',
    icon: 'live',
  },
  {
    name: 'Slots games',
    type: 'slots',
    icon: 'slots',
  },
  {
    name: 'Roulette',
    type: 'roulette',
    icon: 'roulette',
  },
  {
    name: 'Table games',
    type: 'table',
    icon: 'table',
  },
  {
    name: 'Card games',
    type: 'card',
    icon: 'cards',
  },
];

export const LIMIT_TYPES = [
  { name: 'Deposit limits', value: 'depositLimit' },
  { name: 'Wager limits', value: 'wagerLimit' },
  { name: 'Session limits', value: 'sessionLimit' },
];

export const LIMIT_DETAILS = {
  // lossLimit: {
  //   text:
  //     'Your account can be set with loss limits. This setting limits the amount you can lose per day, week or mounth.',
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
  wagerLimit: {
    text:
      'Your account can be set with wager limits. This setting controls the amount of money you can wager per day, week or mounth.',
    editRules:
      'You can reduce your limit at any time, this change will take effect immediately. You can increase the limit, however, in order for this change to take effect, you need 24 hours.',
    deleteRules:
      'Cancellation of the deposit limit takes 24 hours. After the limit is exceeded, you will receive an email notification.',
    fields: ['type', 'period', 'currencyLimitList'],
  },
  sessionLimit: {
    title: 'time spent gambling',
    text:
      'The restriction takes effect instantly. If you hit the limit, you will be automatically logged out of your  account.',
    fields: ['type', 'value'],
  },
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

export const PROFILE_LABELS = {
  receiveEmails: 'Send promos by e-mail',
  receiveSmsPromos: 'Send promos by sms',
};

export const HISTORY_TABLES = {
  transaction: {
    cols: [
      {
        label: 'Date',
        field: 'actionTime',
        format(x) {
          return moment.unix(x).format('DD MMM YYYY, H:mm:ss');
        },
      },
      {
        label: 'Payment system',
        field: 'paymentSystem',
      },
      {
        label: 'Action',
        field: 'action',
      },
      {
        label: 'Status',
        field: 'status',
      },
      {
        label: 'Amount',
        field: 'amount',
      },
      {
        label: 'Currency',
        field: 'currency',
      },
    ],
    filters: {
      currency: {
        type: 'dropdown',
        value: '',
      },
      status: {
        type: 'dropdown',
        values: [
          { name: 'Done', value: 'done' },
          { name: 'Waiting', value: 'wait' },
          { name: 'Cancelled', value: 'cancel' },
        ],
        value: { name: 'Done', value: 'done' },
      },
      from: {
        type: 'date',
        value: moment().unix(),
      },
    },
  },
  game: {
    cols: [
      {
        label: 'Date',
        field: 'actionTime',
        format(x) {
          return moment.unix(x).format('DD MMM YYYY, H:mm:ss');
        },
      },
      {
        label: 'Game name',
        field: 'name',
      },
      {
        label: 'Bet sum',
        field: 'betSum',
      },
      {
        label: 'Win',
        field: 'winSum',
      },
      {
        label: 'Currency',
        field: 'currency',
      },
    ],
    filters: {
      currency: {
        type: 'dropdown',
        value: '',
      },
      from: {
        type: 'date',
        value: moment().unix(),
      },
    },
  },
  bonus: {
    cols: [
      {
        label: 'Date',
        field: 'actionTime',
        format(x) {
          return moment.unix(x).format('DD MMM YYYY, H:mm:ss');
        },
      },
      {
        label: 'Title',
        field: 'title',
      },
      {
        label: 'Status',
        field: 'status',
      },
      {
        label: 'Amount',
        field: 'amount',
      },
      {
        label: 'Currency',
        field: 'currency',
      },
      {
        label: 'Wager',
        field: 'wagerRemains',
      },
      {
        label: 'Valid until',
        field: 'expireAt',
      },
    ],
    filters: {
      currency: {
        type: 'dropdown',
        value: '',
      },
      status: {
        type: 'dropdown',
        values: [
          { name: 'Active', value: 'active' },
          { name: 'Run out', value: 'runOut' },
          { name: 'Waiting', value: 'hold' },
          { name: 'Paused', value: 'pause' },
          { name: 'Cancelled', value: 'cancel' },
          { name: 'Finished', value: 'wagerDone' },
        ],
        value: { name: 'Active', value: 'active' },
      },
      from: {
        type: 'date',
        value: moment().unix(),
      },
    },
  },
};
