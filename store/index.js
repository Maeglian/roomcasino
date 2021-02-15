import axios from 'axios';
import Vue from 'vue';
import moment from 'moment';
import {
  BILLING_PROVIDER_ID,
  API_HOST_PROD,
  API_HOST_STAGE,
  API_HOST_SANDBOX,
  DEFAULT_PROVIDER,
  LIMIT_DETAILS,
} from '../config';

const API_HOST =
  process.env.NUXT_ENV_MODE === 'production'
    ? API_HOST_PROD
    : process.env.NUXT_ENV_MODE === 'sandbox'
    ? API_HOST_SANDBOX
    : API_HOST_STAGE;

const Cookie = process.client ? require('js-cookie') : undefined;
const cookieparser = process.server ? require('cookieparser') : undefined;

const reqConfig = (func = 'commit', funcName = 'setServerError') => ({
  transformResponse: [
    data => {
      let res;
      let errorPayload;

      try {
        res = JSON.parse(data);
      } catch (error) {
        throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`);
      }

      if (res.code === 0) {
        return res.data;
      }

      if (funcName === 'pushNotificationAlert') {
        errorPayload = {
          type: 'error',
          text: res.message,
        };
      } else errorPayload = res.message;

      func(funcName, errorPayload);
    },
  ],
});

export const state = () => ({
  dga: {},
  platform: 'desktop',
  emailConfirmError: '',
  emailConfirmIsFetching: false,
  originalFileIsLoading: false,
  emailIsConfirmed: false,
  originalFile: null,
  originalFileError: '',
  siteIsAllowedForUser: true,
  defaultCountry: '',
  defaultCurrency: '',
  billingSessionIsLoading: false,
  getBillingSessionError: '',
  createLimitError: '',
  deleteLimitError: '',
  deleteBonusError: '',
  bonusList: [],
  bonusListIsLoading: false,
  availableBonusList: [],
  availableBonusListIsLoading: false,
  gameError: '',
  notificationAlerts: [],
  pageRowsCount: 0,
  pageDataIsLoading: false,
  userDocumentList: [],
  historyListIsLoading: false,
  transactionHistoryList: [],
  gameHistoryList: [],
  bonusHistoryList: [],
  sessionHistoryList: [],
  serverError: '',
  gameProducerList: [DEFAULT_PROVIDER],
  status: '',
  authStatus: '',
  phoneCodeList: [],
  countriesList: [],
  currencyList: [],
  categories: [],
  shouldCashout: false,
  providers: [
    {
      name: 'All providers',
    },
    {
      name: 'Netent',
      icon: 'netent',
    },
    {
      name: "Play'n go",
      icon: 'go',
    },
    {
      name: 'Microgaming',
      icon: 'microgaming',
    },
    {
      name: '1x2 gambing',
      icon: 'gaming_book',
    },
    {
      name: 'Amatic',
      icon: 'amatic',
    },
    {
      name: 'Belatra',
      icon: 'belatra',
    },
    {
      name: 'Spinometal',
      icon: 'spinometal',
    },
    {
      name: 'Booming games',
      icon: 'booming',
    },
    {
      name: 'Egt',
      icon: 'egt',
    },
    {
      name: 'Endorphina',
      icon: 'endorphina',
    },
    {
      name: 'Netent',
      icon: 'netent',
    },
    {
      name: "Play'n go",
      icon: 'go',
    },
    {
      name: 'Microgaming',
      icon: 'microgaming',
    },
    {
      name: '1x2 gambing',
      icon: 'gaming_book',
    },
    {
      name: 'Amatic',
      icon: 'amatic',
    },
    {
      name: 'Belatra',
      icon: 'belatra',
    },
    {
      name: 'Spinometal',
      icon: 'spinometal',
    },
    {
      name: 'Booming games',
      icon: 'booming',
    },
    {
      name: 'Egt',
      icon: 'egt',
    },
    {
      name: 'Endorphina',
      icon: 'endorphina',
    },
    {
      name: 'Netent',
      icon: 'netent',
    },
    {
      name: "Play'n go",
      icon: 'go',
    },
    {
      name: 'Microgaming',
      icon: 'microgaming',
    },
    {
      name: '1x2 gambing',
      icon: 'gaming_book',
    },
    {
      name: 'Amatic',
      icon: 'amatic',
    },
    {
      name: 'Belatra',
      icon: 'belatra',
    },
    {
      name: 'Spinometal',
      icon: 'spinometal',
    },
    {
      name: 'Booming games',
      icon: 'booming',
    },
    {
      name: 'Egt',
      icon: 'egt',
    },
    {
      name: 'Endorphina',
      icon: 'endorphina',
    },
    {
      name: 'Netent',
      icon: 'netent',
    },
    {
      name: "Play'n go",
      icon: 'go',
    },
    {
      name: 'Microgaming',
      icon: 'microgaming',
    },
    {
      name: '1x2 gambing',
      icon: 'gaming_book',
    },
    {
      name: 'Amatic',
      icon: 'amatic',
    },
    {
      name: 'Belatra',
      icon: 'belatra',
    },
    {
      name: 'Spinometal',
      icon: 'spinometal',
    },
    {
      name: 'Booming games',
      icon: 'booming',
    },
    {
      name: 'Egt',
      icon: 'egt',
    },
    {
      name: 'Endorphina',
      icon: 'endorphina',
    },
  ],
  token: null,
  authError: '',
  navIsOpen: false,
  notificationsPanelIsOpen: false,
  width: 0,
  games: [],
  defaultGames: [],
  jackpots: [],
  fakeLimits: [
    {
      name: 'loss limits',
      limits: [
        {
          isMoney: true,
          limitState: 1,
          limitAmount: 5,
          currentPeriod: 'daily',
          title: 'daily limit',
          type: 'loss',
          reset: moment()
            .endOf('day')
            .format(),
        },
        {
          isMoney: true,
          limitState: 19,
          limitAmount: 25,
          currentPeriod: 'weekly',
          type: 'loss',
          title: 'weekly limit',
          reset: moment()
            .endOf('week')
            .format(),
        },
      ],
    },
    {
      name: 'session limit',
      limits: [
        {
          isMoney: false,
          limitState: 30,
          limitAmount: 80,
          title: 'time spent of gambling',
          type: 'session',
        },
      ],
    },
    {
      name: 'wager limits',
      limits: [
        {
          isMoney: true,
          limitState: 7,
          limitAmount: 14,
          currentPeriod: 'weekly',
          type: 'wager',
          title: 'weekly limit',
          reset: moment()
            .endOf('week')
            .format(),
        },
      ],
    },
    {
      name: 'cooling off',
      limits: [
        {
          isMoney: true,
          limitState: 7,
          limitAmount: 20,
          type: 'cooling',
          title: 'time spent gambling',
          reset: moment()
            .endOf('week')
            .format(),
        },
      ],
    },
    {
      name: 'reality check',
      limits: [
        {
          isMoney: false,
          type: 'reality_check',
          title: 'notification',
          period: 'every 60 min',
        },
      ],
    },
    {
      name: 'deposit limits',
      limits: [
        {
          isMoney: true,
          limitState: 67,
          limitAmount: 100,
          currentPeriod: 'daily',
          type: 'deposit',
          title: 'daily limit',
          reset: moment()
            .endOf('day')
            .format(),
        },
        {
          isMoney: true,
          limitState: 10,
          limitAmount: 50,
          currentPeriod: 'weekly',
          type: 'deposit',
          title: 'weekly limit',
          reset: moment()
            .endOf('week')
            .format(),
        },
      ],
    },
    {
      name: 'self exclusion',
      limits: [
        {
          isMoney: false,
          type: 'self_exclusion',
          title: 'blocked address',
          period: '6 month',
        },
      ],
    },
  ],
  limits: [],
  gamesAreLoading: false,
  defaultGamesAreLoading: false,
  winnersAreLoading: false,
  errors: {},
  profileIsLoading: false,
  user: {},
  billingSession: {},
  fakeBillingSession: {
    userId: '123',
    sessionId: '123',
    merchantId: '1000',
  },
  tournaments: [
    {
      title: 'Weekly<br/> tournament',
      subtitle: '€ 500 <span class="Colored">+</span> 500 Free Spins',
      image: 'promotion1.png',
      announce: 'Weekly tournament',
      enddate: '2021-01-01',
      text:
        '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
    },
    {
      title: 'Roomcasino<br/> friday party',
      subtitle: '<span class="Colored">7 000</span> Free Spins<br/> every day',
      image: 'promotion2.png',
      announce: 'Friday party',
      enddate: '2021-01-01',
      text:
        '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
    },
    {
      title: 'Summer deluxe<br/> tournament',
      subtitle: '<span class="Colored">€ 50 000</span> every<br/> 5th day!',
      image: 'promotion5.png',
      announce: 'Summer deluxe tournament',
      enddate: '2021-01-01',
      text:
        '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
    },
    {
      title: 'Two day<br/> tournament',
      subtitle: '<span class="Colored">7 000</span> Free Spins<br/> every day',
      image: 'promotion6.png',
      announce: 'Two day tournament',
      enddate: '2021-01-01',
      text:
        '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
    },
  ],
  notifications: {
    promotions: [
      {
        title: 'First deposit bonus',
        icon: 'bonus.png',
        text:
          '100% of the deposit amount. <strong>€100 <span class="Colored">+</span> 55 free spins!</strong>',
        btnText: 'Get bonus',
      },
      {
        title: 'On your second deposit',
        icon: 'bonus.png',
        text:
          '55% of the deposit amount. <strong>€100 <span class="Colored">+</span> 100 free spins!</strong>',
        btnText: 'Get bonus',
      },
      {
        title: 'Third deposit bonus',
        icon: 'bonus.png',
        text: '100% of the deposit amount.<br/> Up to <strong>€100!</strong>',
        btnText: 'Get bonus',
      },
      {
        title: 'Thuesday free spins',
        icon: 'bonus-ball.png',
        text: 'Up to <strong>100 free spins</strong> every Tuesday!',
        btnText: 'Get bonus',
      },
      {
        title: 'Weekend reload',
        icon: 'bonus-weekend.png',
        text: '40% of the deposit amount.<br/> Up to <strong>€150!</strong>',
        btnText: 'Get bonus',
      },
      {
        title: 'Bonus for high rollers',
        icon: 'bonus-spades.png',
        text:
          '30% of the deposit amount.<br/> Up to <strong>€550</strong> on your first deposit of <strong>€300 </strong>',
        btnText: 'Get bonus',
      },
    ],
    notifications: [],
    tournaments: [
      {
        title: 'Weekly tournament',
        icon: 'bonus-cup.png',
        text: '<strong>€1000</strong> weekly prize fund for playing table games!',
        btnText: 'Learn more',
      },
      {
        title: 'Friday party',
        icon: 'bonus-diamond.png',
        text: '<strong>€500</strong> free spins up for grabs every 5 days!',
        btnText: 'Learn more',
      },
    ],
  },
  currentTournamentWinners: [
    {
      id: 1,
      name: 'Natacool',
      points: 3422,
      prize: '$ 10 000, 00',
    },
    {
      id: 2,
      name: 'Fire lightning 12',
      points: 2210,
      prize: '$ 5 000, 00',
    },
    {
      id: 3,
      name: 'Dakamu',
      points: 1012,
      prize: '$ 3 000, 00',
    },
    {
      id: 4,
      name: 'Ioana Juliana',
      points: 840,
      prize: '520 CP',
    },
    {
      id: 5,
      name: 'Fire lightning 11',
      points: 720,
      prize: '500 CP',
    },
    {
      id: 6,
      name: 'Dakamu',
      points: 640,
      prize: '500 CP',
    },
    {
      id: 7,
      name: 'Natacool',
      points: 530,
      prize: '500 CP',
    },
    {
      id: 8,
      name: 'Ioana Juliana',
      points: 420,
      prize: '500 CP',
    },
    {
      id: 9,
      name: 'Zzdeb',
      points: 380,
      prize: '500 CP',
    },
    {
      id: 10,
      name: 'Fire ligtning',
      points: 260,
      prize: '500 CP',
    },
  ],
  previousTournamentWinners: [
    {
      id: 1,
      name: 'Thunderbird',
      points: 3850,
      prize: '$ 12 000, 00',
    },
    {
      id: 2,
      name: 'Fire lightning 12',
      points: 2210,
      prize: '$ 5 000, 00',
    },
    {
      id: 3,
      name: 'Dakamu',
      points: 1012,
      prize: '$ 3 000, 00',
    },
    {
      id: 4,
      name: 'Ioana Juliana',
      points: 840,
      prize: '520 CP',
    },
    {
      id: 5,
      name: 'Fire lightning 11',
      points: 720,
      prize: '500 CP',
    },
    {
      id: 6,
      name: 'Dakamu',
      points: 640,
      prize: '500 CP',
    },
    {
      id: 7,
      name: 'Natacool',
      points: 530,
      prize: '500 CP',
    },
    {
      id: 8,
      name: 'Ioana Juliana',
      points: 420,
      prize: '500 CP',
    },
    {
      id: 9,
      name: 'Zzdeb',
      points: 380,
      prize: '500 CP',
    },
    {
      id: 10,
      name: 'Fire ligtning',
      points: 260,
      prize: '500 CP',
    },
  ],
  terms: [
    'You begin to participate in the VIP program after making your first deposit.',
    'CP is credited at the rate of 1 CP for every $ 12.5, 12.5 EUR, 15 CAD, 15 AUD, 15 NZD, 125 NOK, 325 CZK, 200 ZAR, 50 PLN bids.',
    'Exchange CP - 1 $, 1 EUR, 1.25 CAD, 1.25 AUD, 1.25 NZD, 10 NOK, 25 CZK, 17 ZAR, 4 PLN for 100 CP.',
    'All free spins are issued with a wager x10. All cash prizes are issued with wagering x1.',
    'Funds received when exchanging CP for real money are charged with wager x1.',
    'All prizes and free spins will be issued within 24 hours after the player has reached the VIP level.',
    'All prizes and free spins will be issued within 24 hours after the player has reached the VIP level.',
    'RoomCasino reserves the right to change the terms of the VIP program at any time.',
    'All free spins are issued with a wager x10. All cash prizes are issued with wagering x1.',
  ],
  paymentsMethods: [
    {
      icon: 'visa',
      alt: 'visa',
      type: 'Credit Card',
      fee: '2.5%',
      progressTime: 'Instant',
      limits: 'Min $/€ 10 - Max $/€ 4,000',
    },
    {
      icon: 'bitcoin',
      alt: 'bitcoin',
      type: 'Online Currency',
      fee: 'Free',
      progressTime: '1-5 banking days',
      limits: 'Min. 0.001 BTC - Max. 10 BTC',
    },
    {
      icon: 'maestro',
      alt: 'maestro',
      type: 'Credit Card',
      fee: '2.5%',
      progressTime: 'Instant',
      limits: 'Min $/€ 10 - Max $/€ 4,000',
    },
    {
      icon: 'coinspaid',
      alt: 'coinspaid',
      type: 'Online Currency',
      fee: 'Free',
      progressTime: '1-3 banking days',
      limits: 'Min. 20 USDT - Max. 4,000 USDT',
    },
    {
      icon: 'skrill',
      alt: 'skrill',
      type: 'Credit Card',
      fee: '2.5%',
      progressTime: 'Instant',
      limits: 'Min $/€ 10 - Max $/€ 5,000',
    },
    {
      icon: 'maestro',
      alt: 'maestro',
      type: 'Credit Card',
      fee: '2.5%',
      progressTime: 'Instant',
      limits: 'Min $/€ 10 - Max $/€ 4,000',
    },
    {
      icon: 'coinspaid',
      alt: 'coinspaid',
      type: 'Online Currency',
      fee: 'Free',
      progressTime: '1-3 banking days',
      limits: 'Min. 20 USDT - Max. 4,000 USDT',
    },
  ],
  profileIsUpdating: false,
  updateProfileError: '',
  gameUrlForIframe: '',
});

export const getters = {
  activeCurrency: state => {
    if (state.user.accountList) return getters.activeAccount.currency;
    return {};
  },
  defaultCountry: state => {
    return state.countriesList.find(country => country.code === state.defaultCountry);
  },
  activeAccount: state => {
    if (state.user.accountList) return state.user.accountList.find(acc => acc.active === true);
    return '';
  },
  accountList: state => {
    if (state.user.accountList) return state.user.accountList;
    return [];
  },
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  slicedGameProducerList: state => startIndex =>
    state.gameProducerList.slice(startIndex, state.providers.length + 1),
  limitsByTypes: state => {
    const ll = state.limits.reduce((namedLimits, limit) => {
      const namedlimit = namedLimits.find(l => l.name === l.type);
      if (namedlimit) namedlimit.limits.push(limit);
      else {
        namedLimits.push({
          name: LIMIT_DETAILS[limit.type].name,
          limits: [limit],
        });
      }
      return namedLimits;
    }, []);
    return ll;
  },
  providersList: state => startIndex =>
    state.providers.slice(startIndex, state.providers.length + 1),
  fakedNewGames: state => [...state.games].reverse().slice(0, 12),
  gamesLimited: state => limit => state.games.slice(0, limit),
  gamesSearched: state => text => {
    return state.defaultGames.filter(game => {
      const str = text.trim().toLowerCase();
      const title = game.gameName.toLowerCase();
      return title.includes(str);
    });
  },
  limitedTournamentWinners: state => limit => state.currentTournamentWinners.slice(0, limit),
  userInfo: state => {
    if (Object.keys(state.user).length) {
      const info = { ...state.user };
      info.country = state.countriesList.find(country => country.code === info.country);
      delete info.accountList;
      delete info.requirePasswordChange;
      return info;
    }

    return {};
  },
  currencyAccounts: state => {
    if (state.user.accountList) {
      const currencies = state.user.accountList.map(acc => ({
        name: acc.currency,
        value: acc.currency,
      }));
      currencies.unshift({ name: 'All currencies', value: '' });

      return currencies;
    }
    return [];
  },
  moreCurrencyAccounts: state =>
    state.currencyList.filter(cur => {
      if (state.user.accountList) {
        return !state.user.accountList.some(acc => acc.currency === cur);
      }
      return cur;
    }),
  isNewNotifications: state => !Object.values(state.notifications).every(arr => !arr.length),
};

export const mutations = {
  setDgaInfo: (state, { producer, game, data }) => {
    if (!state.dga[producer]) Vue.set(state.dga, producer, {});
    Vue.set(state.dga[producer], game, data);
  },
  setPlatform: (state, payload) => {
    state.platform = payload;
  },
  setEmailConfirmIsDone: state => {
    state.emailConfirmIsFetching = false;
  },
  setEmailConfirmIsFetching: state => {
    state.emailConfirmIsFetching = true;
  },
  setEmailIsConfirmed: state => {
    state.emailIsConfirmed = true;
  },
  clearEmailIsConfirmed: state => {
    state.emailIsConfirmed = false;
  },
  setEmailConfirmError: (state, payload) => {
    state.emailConfirmError = payload;
  },
  clearEmailConfirmError: state => {
    state.emailConfirmError = '';
  },
  setOriginalFile: (state, payload) => {
    state.originalFile = payload;
  },
  clearOriginalFile: state => {
    state.originalFile = null;
  },
  setOriginalFileIsLoading: state => {
    state.originalFileIsLoading = true;
  },
  setOriginalFileIsLoaded: state => {
    state.originalFileIsLoading = false;
  },
  setOriginalFileError: (state, payload) => {
    state.originalFileError = payload;
  },
  clearOriginalFileError: state => {
    state.originalFileError = '';
  },
  setSiteIsAllowedForUser: (state, payload) => {
    state.siteIsAllowedForUser = payload;
  },
  setDefaultCountry: (state, payload) => {
    state.defaultCountry = payload;
  },
  setDefaultCurrency: (state, payload) => {
    state.defaultCurrency = payload;
  },
  setBillingSessionIsLoading: state => {
    state.billingSessionIsLoading = true;
  },
  setBillingSessionIsLoaded: state => {
    state.billingSessionIsLoading = false;
  },
  setGetBillingSessionError: (state, message) => {
    state.billingSessionIsLoading = message;
  },
  clearGetBillingSessionError: state => {
    state.billingSessionIsLoading = '';
  },
  setCreateError: (state, message) => {
    state.deleteLimitError = message;
  },
  clearCreateLimitError: state => {
    state.deleteLimitError = '';
  },
  setDeleteLimitError: (state, message) => {
    state.deleteLimitError = message;
  },
  clearDeleteLimitError: state => {
    state.deleteLimitError = '';
  },
  setDeleteBonusError: (state, message) => {
    state.deleteBonusError = message;
  },
  clearDeleteBonusError: state => {
    state.deleteBonusError = '';
  },
  setBonusListIsLoading: state => {
    state.bonusListIsLoading = true;
  },
  setBonusListIsLoaded: state => {
    state.bonusListIsLoading = false;
  },
  setBonusList: (state, payload) => {
    state.bonusList = payload;
  },
  setAvailableBonusListIsLoading: state => {
    state.availablebonusListIsLoading = true;
  },
  setAvailableBonusListIsLoaded: state => {
    state.availableBonusListIsLoading = false;
  },
  setAvailableBonusList: (state, payload) => {
    state.availableBonusList = payload;
  },
  setPageRowsCount: (state, payload) => {
    state.pageRowsCount = payload;
  },
  setGameUrl: (state, gameUrl) => {
    state.gameUrlForIframe = gameUrl;
  },
  setGameError: (state, message) => {
    state.gameError = message;
  },
  clearGameError: state => {
    state.gameError = '';
  },
  setPageDataIsLoading: state => {
    state.pageDataIsLoading = true;
  },
  setPageDataIsLoaded: state => {
    state.pageDataIsLoading = false;
  },
  setUserDocumentList: (state, payload) => {
    state.userDocumentList = payload;
  },
  setServerError: (state, message) => {
    state.serverError = message;
  },
  clearServerError: state => {
    state.serverError = '';
  },
  setTransactionHistoryList: (state, payload) => {
    state.transactionHistoryList = payload;
  },
  setGameHistoryList: (state, payload) => {
    state.gameHistoryList = payload;
  },
  setBonusHistoryList: (state, payload) => {
    state.bonusHistoryList = payload;
  },
  setSessionHistoryList: (state, payload) => {
    state.sessionHistoryList = payload;
  },
  setHistoryListIsLoading: state => {
    state.historyListIsLoading = true;
  },
  setHistoryListIsLoaded: state => {
    state.historyListIsLoading = false;
  },
  setGameProducerList: (state, payload) => {
    state.gameProducerList = [...state.gameProducerList, ...payload];
  },
  openNav: state => {
    state.navIsOpen = true;
  },
  closeNav: state => {
    state.navIsOpen = false;
  },
  openNotificationsPanel: state => {
    state.notificationsPanelIsOpen = true;
  },
  closeNotificationsPanel: state => {
    state.notificationsPanelIsOpen = false;
  },
  setCategories: (state, payload) => {
    state.categories = payload;
  },
  setWidth: (state, payload) => {
    state.width = payload;
  },
  setGamesAreLoading: state => {
    state.gamesAreLoading = true;
  },
  setDefaultGamesAreLoading: state => {
    state.defaultGamesAreLoading = true;
  },
  setGamesAreLoaded: state => {
    state.gamesAreLoading = false;
  },
  setDefaultGamesAreLoaded: state => {
    state.defaultGamesAreLoading = false;
  },
  setGames: (state, payload) => {
    state.games = payload;
  },
  setDefaultGames: (state, payload) => {
    state.defaultGames = payload;
  },
  setPhoneCodeList: (state, payload) => {
    state.phoneCodeList = payload;
  },
  setCountriesList: (state, payload) => {
    state.countriesList = payload;
  },
  setCurrencyList: (state, payload) => {
    state.currencyList = payload;
  },
  pushErrors: (state, payload) => {
    state.errors = { ...state.errors, payload };
  },
  setJackpots: (state, payload) => {
    state.jackpots = payload;
  },
  setLimits: (state, payload) => {
    state.limits = payload;
  },
  addLimits: (state, payload) => {
    let limit = state.limits.find(lim => lim.name === payload.name);
    if (!limit) {
      limit = {
        name: payload.name,
        limits: [],
      };
      state.limits.push(limit);
    }
    limit.limits.push(payload.content);
  },
  setAuthRequest(state) {
    state.authStatus = 'loading';
    state.authError = '';
  },
  setAuthError(state, message) {
    state.authStatus = 'error';
    state.authError = message;
  },
  setAuthSuccess(state) {
    state.authStatus = 'success';
    state.authError = '';
  },
  setToken(state, token) {
    state.token = token;
  },
  setProfileIsLoading(state) {
    state.profileIsLoading = true;
  },
  setProfileIsLoaded(state) {
    state.profileIsLoading = false;
  },
  setUser(state, user) {
    state.user = user;
  },
  setBillingSession(state, payload) {
    state.billingSession = payload;
  },
  removeAuthError(state) {
    state.authError = '';
  },
  logout(state) {
    state.status = '';
    state.token = null;
    state.emailIsConfirmed = false;
  },
  setCashoutTrue(state) {
    state.shouldCashout = true;
  },
  setCashoutFalse(state) {
    state.shouldCashout = false;
  },
  updateBalance(state, payload) {
    state.user.balance += Number(payload);
  },
  setActiveUserAccount(state, currency) {
    if (state.user.accountList) {
      state.user.accountList.forEach(acc => {
        if (acc.currency === currency) acc.active = true;
        else acc.active = false;
      });
    }
  },
  updateLimits(state, { i, j, payload }) {
    Vue.set(state.limits[i].limits, j, payload);
  },
  deleteLimit(state, { i, j }) {
    state.limits[i].limits = [
      ...state.limits[i].limits.slice(0, j),
      ...state.limits[i].limits.slice(j + 1),
    ];
  },
  setProfileIsUpdating(state) {
    state.passwordIsUpdating = true;
  },
  setProfileIsUpdated(state) {
    state.passwordIsUpdating = false;
  },
  setUpdateProfileError(state, payload) {
    state.updateProfileError = payload;
  },
  clearUpdateProfileError(state) {
    state.updateProfileError = '';
  },
  pushNotificationAlert(state, payload) {
    state.notificationAlerts.push(payload);
  },
  deleteNotificationAlert(state, idx) {
    state.notificationAlerts.splice(idx, 1);
  },
  clearNotificationAlerts(state) {
    state.notificationAlerts = [];
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (process.env.NUXT_ENV_MODE !== 'sandbox' && process.env.NUXT_ENV_MODE !== 'stage') {
      let token = null;
      if (req.headers.cookie) {
        const parsed = cookieparser.parse(req.headers.cookie);
        try {
          // eslint-disable-next-line prefer-destructuring
          token = parsed.token;
          // eslint-disable-next-line no-empty
        } catch (e) {}
        axios.defaults.headers.common['X-Auth-Token'] = token;
        commit('setToken', token);
      }
    }
  },
  async getGames({ commit }, payload = {}) {
    commit('setGamesAreLoading');
    try {
      const res = await axios.get(`${API_HOST}/gameList`, { params: payload });
      commit('setGames', res.data.data);
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setGamesAreLoaded');
    }
  },

  async getDefaultGames({ commit }) {
    commit('setDefaultGamesAreLoading');
    try {
      const res = await axios.get(`${API_HOST}/gameList`);
      commit('setDefaultGames', res.data.data);
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setDefaultGamesAreLoaded');
    }
  },

  async registerUser({ state, commit, dispatch }, payload) {
    commit('setAuthRequest');
    try {
      const res = await axios.post(
        `${API_HOST}/register`,
        payload,
        reqConfig(commit, 'setAuthError'),
      );
      if (!state.authError) {
        commit('setAuthSuccess');
        const { token } = res.data;
        commit('setToken', token);
        Cookie.set('token', token);
        axios.defaults.headers.common['X-Auth-Token'] = token;
        dispatch('getProfile');
      }
    } catch (e) {
      commit('pushErrors', e);
      Cookie.remove('token');
    }
  },

  async authorize({ state, commit, dispatch }, payload) {
    commit('setAuthRequest');
    await dispatch('login', payload);
    if (!state.authError) {
      commit('setAuthSuccess');
      dispatch('getProfile');
      dispatch('getLimits');
    }
  },

  async login({ commit }, payload) {
    try {
      const res = await axios.post(`${API_HOST}/login`, payload);
      if (res.data.code === 10002) {
        commit('setAuthError', res.data.message);
      } else {
        const { token } = res.data.data;
        commit('setToken', token);
        Cookie.set('token', token);
        axios.defaults.headers.common['X-Auth-Token'] = token;
      }
    } catch (e) {
      commit('setAuthError', e);
      Cookie.remove('token');
    }
  },

  async getProfile({ commit }) {
    commit('setProfileIsLoading');
    try {
      const res = await axios.get(`${API_HOST}/profile`);
      const user = res.data.data;
      commit('setUser', user);
    } catch (e) {
      commit('setAuthError', e);
    } finally {
      commit('setProfileIsLoaded');
    }
  },

  async logout({ commit }, isAuthError = false) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      if (!isAuthError) await axios.post(`${API_HOST}/logout`);
      commit('logout');
      Cookie.remove('token');
      delete axios.defaults.headers.common['X-Auth-Token'];
      commit('clearNotificationAlerts');
      this.$router.push('/');
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async getCountriesList({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`${API_HOST}/countryList`);
      commit('setCountriesList', res.data.data);
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async getPhoneCodeList({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`${API_HOST}/phoneCodeList`);
      commit('setPhoneCodeList', res.data.data);
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async getCurrencyList({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`${API_HOST}/currencyList`);
      commit('setCurrencyList', res.data.data.currencyList);
    } catch (e) {
      commit('pushErrors', e);
    }
  },
  async getCategoriesList({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`${API_HOST}/categoryList`);
      commit('setCategories', res.data.data);
    } catch (e) {
      commit('pushErrors', e);
    }
  },
  async getBillingSession({ state, commit }) {
    if (state.getBillingSessionError) commit('clearGetBillingSessionError');
    commit('setBillingSessionIsLoading');
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.post(
        `${API_HOST}/billingSession`,
        {
          bpId: BILLING_PROVIDER_ID,
        },
        reqConfig(commit, 'setGetBillingSessionError'),
      );
      commit('setBillingSession', res.data);
    } catch (e) {
      commit('pushErrors', e);
      throw e;
    } finally {
      commit('setBillingSessionIsLoaded');
    }
  },

  async startGame({ state, commit }, { demo, gameId, returnUrl }) {
    if (state.gameError) commit('clearGameError');
    try {
      const res = await axios.post(
        `${API_HOST}/startGame`,
        {
          demo,
          gameId,
          platform: state.platform,
          returnUrl,
        },
        reqConfig(commit, 'setGameError'),
      );
      if (!state.gameError) {
        const { url } = res.data;
        commit('setGameUrl', url);
      }
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async setActiveAccount({ commit, dispatch }, payload) {
    try {
      await axios.post(
        `${API_HOST}/setActiveAccount`,
        payload,
        reqConfig(commit, 'pushNotificationAlert'),
      );
      dispatch('getProfile');
      dispatch('getLimits');
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async createAccount({ commit, dispatch }, payload) {
    commit('clearServerError');
    try {
      await axios.post(`${API_HOST}/createAccount`, payload, reqConfig(commit));
      dispatch('getProfile');
      dispatch('getLimits');
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async updateProfile({ state, commit, dispatch }, payload) {
    if (state.updateProfileError) commit('clearUpdateProfileError');
    try {
      commit('setProfileIsUpdating');
      await axios.put(`${API_HOST}/profile`, payload, reqConfig(commit, 'setUpdateProfileError'));
      dispatch('getProfile');
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setProfileIsUpdated');
    }
  },

  async updatePassword({ commit }, payload) {
    try {
      commit('setProfileIsUpdating');
      await axios.put(
        `${API_HOST}/updatePassword`,
        payload,
        reqConfig(commit, 'setUpdateProfileError'),
      );
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setProfileIsUpdated');
    }
  },

  async getGameProducerList({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`${API_HOST}/gameProducerList`);
      commit('setGameProducerList', res.data.data);
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async getLimits({ commit }) {
    try {
      const res = await axios.get(`${API_HOST}/limit`);
      const limits = res.data.data;
      commit('setLimits', limits);
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async addLimit({ state, commit }, payload) {
    if (state.createLimitError) commit('clearCreateLimitError');
    try {
      await axios.put(`${API_HOST}/limit`, payload, reqConfig(commit, 'setCreateLimitError'));
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async deleteLimit({ state, commit }, payload) {
    if (state.deleteLimitError) commit('clearDeleteLimitError');
    try {
      await axios.delete(
        `${API_HOST}/limit?type=${payload.type}&period=${payload.period}`,
        reqConfig(commit, 'setDeleteLimitError'),
      );
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async getTransactionHistoryList({ commit }, payload = {}) {
    try {
      commit('clearServerError');
      commit('setHistoryListIsLoading');
      const res = await axios.get(`${API_HOST}/transactionHistoryList`, {
        ...{ params: payload },
        ...reqConfig(commit),
      });
      if (!state.serverError) {
        commit('setPageRowsCount', res.headers['x-meta-count']);
        commit('setTransactionHistoryList', res.data);
      }
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setHistoryListIsLoaded');
    }
  },

  async getBonusHistoryList({ commit }, payload = {}) {
    try {
      commit('clearServerError');
      commit('setHistoryListIsLoading');
      const res = await axios.get(`${API_HOST}/bonusHistoryList`, {
        ...{ params: payload },
        ...reqConfig(commit),
      });
      if (!state.serverError) {
        commit('setPageRowsCount', res.headers['x-meta-count']);
        commit('setBonusHistoryList', res.data);
      }
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setHistoryListIsLoaded');
    }
  },

  async getGameHistoryList({ commit }, payload = {}) {
    try {
      commit('clearServerError');
      commit('setHistoryListIsLoading');
      const res = await axios.get(`${API_HOST}/gameHistoryList`, {
        ...{ params: payload },
        ...reqConfig(commit),
      });
      if (!state.serverError) {
        commit('setPageRowsCount', res.headers['x-meta-count']);
        commit('setGameHistoryList', res.data);
      }
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setHistoryListIsLoaded');
    }
  },

  async getSessionHistoryList({ commit }, payload = {}) {
    try {
      commit('clearServerError');
      commit('setHistoryListIsLoading');
      const res = await axios.get(`${API_HOST}/sessionHistory`, {
        ...{ params: payload },
        ...reqConfig(commit),
      });
      if (!state.serverError) {
        commit('setPageRowsCount', res.headers['x-meta-count']);
        commit('setSessionHistoryList', res.data);
      }
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setHistoryListIsLoaded');
    }
  },

  async getBonusList({ commit }) {
    commit('setBonusListIsLoading');
    try {
      const res = await axios.get(`${API_HOST}/bonusList`);
      const bonuses = res.data.data;
      commit('setBonusList', bonuses);
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setBonusListIsLoaded');
    }
  },

  async getAvailableBonusList({ commit }) {
    commit('setAvailableBonusListIsLoading');
    try {
      const res = await axios.get(`${API_HOST}/availableBonusList`);
      const bonuses = res.data.data;
      commit('setAvailableBonusList', bonuses);
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setAvailableBonusListIsLoaded');
    }
  },

  async deleteBonus({ commit, state }, id) {
    if (state.deleteBonusError) commit('clearDeleteBonusError');
    try {
      await axios.delete(`${API_HOST}/bonus/${id}`, reqConfig(commit, 'setDeleteBonusError'));
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async restorePassword({ commit }, payload) {
    try {
      commit('setPageDataIsLoading');
      await axios.post(`${API_HOST}/passwordRestore`, payload, reqConfig(commit, 'setServerError'));
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setPageDataIsLoaded');
    }
  },

  async confirmRestorePassword({ commit }, payload) {
    try {
      commit('setPageDataIsLoading');
      await axios.post(
        `${API_HOST}/passwordRestoreConfirm`,
        payload,
        reqConfig(commit, 'setServerError'),
      );
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setPageDataIsLoaded');
    }
  },

  async confirmEmail({ state, commit }, payload) {
    if (state.emailConfirmError) commit('clearEmailConfirmError');
    commit('setEmailConfirmIsFetching');
    try {
      await axios.put(
        `${API_HOST}/emailConfirm`,
        payload,
        reqConfig(commit, 'setEmailConfirmError'),
      );
      commit('setEmailIsConfirmed');
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setEmailConfirmIsDone');
    }
  },

  async getUserDocumentList({ commit }) {
    try {
      commit('setPageDataIsLoading');
      const res = await axios.get(`${API_HOST}/document`);
      commit('setUserDocumentList', res.data.data);
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setPageDataIsLoaded');
    }
  },

  async showUserDocument({ commit }, id) {
    commit('setOriginalFileIsLoading');
    try {
      const res = await axios.get(`${API_HOST}/document/${id}`, {
        responseType: 'blob',
      });
      commit('setOriginalFile', res.data);
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('setOriginalFileIsLoaded');
    }
  },

  async deleteUserDocument({ commit }, id) {
    try {
      await axios.delete(`${API_HOST}/document/${id}`);
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async getGeoInfo({ commit }) {
    try {
      const res = await axios.get(`${API_HOST}/geoInfo`);
      commit('setSiteIsAllowedForUser', res.data.data.allowed);
      commit('setDefaultCountry', res.data.data.country);
      commit('setDefaultCurrency', res.data.data.currency);
    } catch (e) {
      commit('pushErrors', e);
    }
  },
};
