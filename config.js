export const BILLING_PROVIDER_ID = 'devcode';
export const API_HOST_SANDBOX = 'http://az-44.sandbox.aramuz.net/frontapi/roomcasino';
export const API_HOST_PROD = 'https://dev.aramuz.net/frontapi/roomcasino';

export const LIMIT_TYPES = [
  { name: 'Deposit limits', value: 'depositLimit' },
  // { name: 'Session limits', value: 'sessionLimit' },
];

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
