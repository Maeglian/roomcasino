import moment from 'moment';

export const BILLING_PROVIDER_ID = 'devcode';
export const API_HOST_SANDBOX = 'http://az-44.sandbox.aramuz.net/frontapi/roomcasino';
export const API_HOST_STAGE = 'https://dev.aramuz.net/frontapi/roomcasino';
export const API_HOST_PROD = 'https://aramuz.net/frontapi/roomcasino';

export const DEFAULT_PROVIDER = { name: 'All providers', noIcon: true };

export const GAME_TYPES = [
  {
    name: 'All games',
    icon: 'star',
  },
  {
    name: 'Top games',
    type: 'top',
    icon: 'crown',
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
  { name: 'Loss limits', value: 'lossLimit' },
  { name: 'Session limits', value: 'sessionLimit' },
  { name: 'Cooling off', value: 'coolingOffLimit' },
];

export const LIMIT_DETAILS = {
  lossLimit: {
    name: 'Loss limits',
    text:
      'Your account can be set with loss limits. This setting limits the amount you can lose per day, week or mounth.',
    editRules:
      'You can reduce your limit at any time, this change will take effect immediately. You can increase the limit, however, in order for this change to take effect, you need 24 hours.',
    deleteRules:
      'Cancellation of the loss limit takes 24 hours. After the limit is exceeded, you will receive an email notification.',
    fields: ['type', 'period', 'currencyLimitList'],
  },
  depositLimit: {
    name: 'Deposit limits',
    text:
      'Your account can be set with deposit limits. This setting limits  the amount you can deposit per day, week or mounth.',
    editRules:
      'You can reduce your limit at any time, this change will take effect immediately. You can increase the limit, however, in order for this change to take effect, you need 24 hours.',
    deleteRules:
      'Cancellation of the deposit limit takes 24 hours. After the limit is exceeded, you will receive an email notification.',
    fields: ['type', 'period', 'currencyLimitList'],
  },
  wagerLimit: {
    name: 'Wager limits',
    text:
      'Your account can be set with wager limits. This setting controls the amount of money you can wager per day, week or mounth.',
    editRules:
      'You can reduce your limit at any time, this change will take effect immediately. You can increase the limit, however, in order for this change to take effect, you need 24 hours.',
    deleteRules:
      'Cancellation of the wager limit takes 24 hours. After the limit is exceeded, you will receive an email notification.',
    fields: ['type', 'period', 'currencyLimitList'],
  },
  sessionLimit: {
    name: 'Session limit',
    title: 'time spent gambling',
    text:
      'The restriction takes effect instantly. If you hit the limit, you will be automatically logged out of your  account.',
    editRules: '',
    deleteRules: '',
    fields: ['type', 'value'],
  },
  coolingOffLimit: {
    name: 'Cooling off',
    title: 'time spent gambling',
    text:
      'Feel the need to stay away from the casino for some time? You can set a cooling-off limit for a certain period of time. The restriction takes effect instantly. You won’t be able to make deposits and play during the specified period, also you will be excluded from all advertising offers. After the set period expires, you’ll receive a notification email saying your account is active again.',
    editRules:
      "Limit decrease will be applied in 24 hours after player's request. Limit increase will be applied immediately.",
    deleteRules: "Limit cancellation will be applied in 24 hours after player's request.",
    fields: ['type', 'period', 'value'],
  },
  // self_exclusion: {
  // name: 'Self exclusion',
  //   title: 'blocked address',
  //   text:
  //     'You can set a self-exclusion limit for a definite or an indefinite period of time.  During the set period you will not be able to log into your account. To be excluded from gambiling on our site for an indefinite period of time, please, contact our support team via live-chat.',
  //   fields: ['isMoney', 'title', 'period'],
  // },
  // reality_check: {
  // name: 'Reality check',
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

export const LIMIT_COOL_PERIODS = [
  {
    name: 'days',
    value: 'dayLimit',
  },
  {
    name: 'weeks',
    value: 'weekLimit',
  },
  {
    name: 'months',
    value: 'monthLimit',
  },
];

export const PROFILE_LABELS = {
  receiveEmailPromos: 'Send promos by e-mail',
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
        colClasses(x) {
          if (x === 'done') return 'CabinetTable-Cell--success';
          if (x === 'cancel') return 'CabinetTable-Cell--error';
          return '';
        },
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
        label: 'currency',
        type: 'dropdown',
        value: { name: 'All currencies', value: '' },
      },
      status: {
        label: 'status',
        type: 'dropdown',
        values: [
          { name: 'All statuses', value: '' },
          { name: 'Done', value: 'done' },
          { name: 'Waiting', value: 'wait' },
          { name: 'Cancelled', value: 'cancel' },
        ],
        value: { name: 'All statuses', value: '' },
      },
      from: {
        label: 'until',
        type: 'date',
        value: '',
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
        label: 'currency',
        type: 'dropdown',
        value: { name: 'All currencies', value: '' },
      },
      from: {
        label: 'until',
        type: 'date',
        value: '',
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
        label: 'currency',
        type: 'dropdown',
        value: { name: 'All currencies', value: '' },
      },
      status: {
        label: 'status',
        type: 'dropdown',
        values: [
          { name: 'All statuses', value: '' },
          { name: 'Active', value: 'active' },
          { name: 'Run out', value: 'runOut' },
          { name: 'Waiting', value: 'hold' },
          { name: 'Paused', value: 'pause' },
          { name: 'Cancelled', value: 'cancel' },
          { name: 'Finished', value: 'wagerDone' },
        ],
        value: { name: 'All statuses', value: '' },
      },
      from: {
        label: 'until',
        type: 'date',
        value: '',
      },
    },
  },
  session: {
    cols: [
      {
        label: 'Started at',
        field: 'startedAt',
      },
      {
        label: 'Ip',
        field: 'clientIp',
      },
      {
        label: 'Country',
        field: 'country',
      },
      {
        label: 'User Agent',
        field: 'userAgent',
      },
      {
        label: 'Closed At',
        field: 'closedAt',
        colClasses(x) {
          return x ? 'CabinetTable-Cell--disabled' : 'CabinetTable-Cell--success';
        },
        format(x) {
          return x ? 'Closed' : 'Current';
        },
      },
    ],
  },
};

export const BONUSES = [
  {
    title: 'First welcome bonus',
    name: 'First Deposit 100%',
    minDeposit: '20.00 USD/EUR',
    maxPrize: '100% of the deposit amount - up to 100$/€',
  },
  {
    title: 'Second deposit bonus',
    name: 'Second Deposit 55%',
    minDeposit: '20.00 USD/EUR',
    maxPrize: '55% of the deposit amount - up to 100$/€',
  },
  {
    title: 'Third deposit bonus',
    name: 'Third Deposit 100%',
    minDeposit: '20.00 USD/EUR',
    maxPrize: '100% of the deposit amount - up to 100$/€',
  },
];
