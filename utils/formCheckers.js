import { helpers } from 'vuelidate/lib/validators';
import moment from 'moment';

export const passwordCheck = helpers.regex(
  'passwordCheck',
  /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/,
);

export const checkIfNullOrPositiveNumbers = helpers.regex('limitCheck', /^[0-9]\d*$/);
export const checkIfPositiveNumbers = helpers.regex('limitCheck', /^[1-9]\d*$/);
export const phoneWithPlusCheck = helpers.regex(
  'phoneCheck',
  /^\+([- _():=+]?\d[- _():=+]?){10,14}$/,
);

export const postalCodeCheck = helpers.regex('postalCodeCheck', /^[0-9a-zA-Z ]*$/);

export const termsCheck = (value) => value === true;
export const ageCheck = (value) => moment(value).add(18, 'years') < moment();
export const dateCheck = (value) => moment(value, 'YYYY-MM-DD', true).isValid();

export const dayCheck = helpers.regex('dayCheck', /^(3[01]|[12][0-9]|0?[1-9])$/);

export const monthCheck = helpers.regex('monthCheck', /^(1[0-2]|0?[1-9])$/);

export const yearCheck = (value) =>
  !value || (Number(value) < moment().year() && Number(value) > 1900);
