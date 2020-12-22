import { helpers } from 'vuelidate/lib/validators';
import moment from 'moment';

export const passwordCheck = helpers.regex(
  'passwordCheck',
  /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/,
);

export const checkIfNullOrPositiveNumbers = helpers.regex('limitCheck', /^[0-9]\d*$/);
export const checkIfPositiveNumbers = helpers.regex('limitCheck', /^[1-9]\d*$/);

export const termsCheck = value => value === true;
export const ageCheck = value => moment(value).add(18, 'years') < moment();
export const dateCheck = value =>
  moment(value, 'YYYY-MM-DD', true).isValid() &&
  moment(value) < moment() &&
  moment(value).year() > 1900;
