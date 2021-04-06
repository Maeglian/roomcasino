import { searchInArrByString as searchInArr } from '../helpers';

const countries = [
  {
    code: 'AF',
    name: 'Afghanistan',
  },
  {
    code: 'AX',
    name: 'Åland Islands',
  },
  {
    code: 'AL',
    name: 'Albania',
  },
  {
    code: 'DZ',
    name: 'Algeria',
  },
  {
    code: 'AS',
    name: 'American Samoa',
  },
  {
    code: 'AD',
    name: 'Andorra',
  },
  {
    code: 'AO',
    name: 'Angola',
  },
  {
    code: 'AI',
    name: 'Anguilla',
  },
  {
    code: 'AQ',
    name: 'Antarctica',
  },
  {
    code: 'AG',
    name: 'Antigua & Barbuda',
  },
  {
    code: 'AR',
    name: 'Argentina',
  },
  {
    code: 'AM',
    name: 'Armenia',
  },
  {
    code: 'AW',
    name: 'Aruba',
  },
  {
    code: 'AU',
    name: 'Australia',
  },
  {
    code: 'AT',
    name: 'Austria',
  },
  {
    code: 'AZ',
    name: 'Azerbaijan',
  },
  {
    code: 'BS',
    name: 'Bahamas',
  },
  {
    code: 'BH',
    name: 'Bahrain',
  },
  {
    code: 'BD',
    name: 'Bangladesh',
  },
  {
    code: 'BB',
    name: 'Barbados',
  },
  {
    code: 'BY',
    name: 'Belarus',
  },
  {
    code: 'BE',
    name: 'Belgium',
  },
  {
    code: 'BZ',
    name: 'Belize',
  },
  {
    code: 'BJ',
    name: 'Benin',
  },
  {
    code: 'BM',
    name: 'Bermuda',
  },
  {
    code: 'BT',
    name: 'Bhutan',
  },
  {
    code: 'BO',
    name: 'Bolivia',
  },
  {
    code: 'BA',
    name: 'Bosnia & Herzegovina',
  },
  {
    code: 'BW',
    name: 'Botswana',
  },
  {
    code: 'BV',
    name: 'Bouvet Island',
  },
  {
    code: 'BR',
    name: 'Brazil',
  },
  {
    code: 'IO',
    name: 'British Indian Ocean Territory',
  },
  {
    code: 'VG',
    name: 'British Virgin Islands',
  },
  {
    code: 'BN',
    name: 'Brunei',
  },
  {
    code: 'BG',
    name: 'Bulgaria',
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
  },
  {
    code: 'BI',
    name: 'Burundi',
  },
  {
    code: 'KH',
    name: 'Cambodia',
  },
  {
    code: 'CM',
    name: 'Cameroon',
  },
  {
    code: 'CA',
    name: 'Canada',
  },
  {
    code: 'CV',
    name: 'Cape Verde',
  },
  {
    code: 'BQ',
    name: 'Caribbean Netherlands',
  },
  {
    code: 'KY',
    name: 'Cayman Islands',
  },
  {
    code: 'CF',
    name: 'Central African Republic',
  },
  {
    code: 'TD',
    name: 'Chad',
  },
  {
    code: 'CL',
    name: 'Chile',
  },
  {
    code: 'CN',
    name: 'China',
  },
  {
    code: 'CX',
    name: 'Christmas Island',
  },
  {
    code: 'CC',
    name: 'Cocos (Keeling) Islands',
  },
  {
    code: 'CO',
    name: 'Colombia',
  },
  {
    code: 'KM',
    name: 'Comoros',
  },
  {
    code: 'CG',
    name: 'Congo - Brazzaville',
  },
  {
    code: 'CD',
    name: 'Congo - Kinshasa',
  },
  {
    code: 'CK',
    name: 'Cook Islands',
  },
  {
    code: 'CR',
    name: 'Costa Rica',
  },
  {
    code: 'CI',
    name: 'Côte d’Ivoire',
  },
  {
    code: 'HR',
    name: 'Croatia',
  },
  {
    code: 'CU',
    name: 'Cuba',
  },
  {
    code: 'CW',
    name: 'Curaçao',
  },
  {
    code: 'CY',
    name: 'Cyprus',
  },
  {
    code: 'CZ',
    name: 'Czechia',
  },
  {
    code: 'DK',
    name: 'Denmark',
  },
  {
    code: 'DJ',
    name: 'Djibouti',
  },
  {
    code: 'DM',
    name: 'Dominica',
  },
  {
    code: 'DO',
    name: 'Dominican Republic',
  },
  {
    code: 'EC',
    name: 'Ecuador',
  },
  {
    code: 'EG',
    name: 'Egypt',
  },
  {
    code: 'SV',
    name: 'El Salvador',
  },
  {
    code: 'GQ',
    name: 'Equatorial Guinea',
  },
  {
    code: 'ER',
    name: 'Eritrea',
  },
  {
    code: 'EE',
    name: 'Estonia',
  },
  {
    code: 'SZ',
    name: 'Eswatini',
  },
  {
    code: 'ET',
    name: 'Ethiopia',
  },
  {
    code: 'FK',
    name: 'Falkland Islands',
  },
  {
    code: 'FO',
    name: 'Faroe Islands',
  },
  {
    code: 'FJ',
    name: 'Fiji',
  },
  {
    code: 'FI',
    name: 'Finland',
  },
  {
    code: 'FR',
    name: 'France',
  },
  {
    code: 'GF',
    name: 'French Guiana',
  },
  {
    code: 'PF',
    name: 'French Polynesia',
  },
  {
    code: 'TF',
    name: 'French Southern Territories',
  },
  {
    code: 'GA',
    name: 'Gabon',
  },
  {
    code: 'GM',
    name: 'Gambia',
  },
  {
    code: 'GE',
    name: 'Georgia',
  },
  {
    code: 'DE',
    name: 'Germany',
  },
  {
    code: 'GH',
    name: 'Ghana',
  },
  {
    code: 'GI',
    name: 'Gibraltar',
  },
  {
    code: 'GR',
    name: 'Greece',
  },
  {
    code: 'GL',
    name: 'Greenland',
  },
  {
    code: 'GD',
    name: 'Grenada',
  },
  {
    code: 'GP',
    name: 'Guadeloupe',
  },
  {
    code: 'GU',
    name: 'Guam',
  },
  {
    code: 'GT',
    name: 'Guatemala',
  },
  {
    code: 'GG',
    name: 'Guernsey',
  },
  {
    code: 'GN',
    name: 'Guinea',
  },
  {
    code: 'GW',
    name: 'Guinea-Bissau',
  },
  {
    code: 'GY',
    name: 'Guyana',
  },
  {
    code: 'HT',
    name: 'Haiti',
  },
  {
    code: 'HM',
    name: 'Heard & McDonald Islands',
  },
  {
    code: 'HN',
    name: 'Honduras',
  },
  {
    code: 'HK',
    name: 'Hong Kong SAR China',
  },
  {
    code: 'HU',
    name: 'Hungary',
  },
  {
    code: 'IS',
    name: 'Iceland',
  },
  {
    code: 'IN',
    name: 'India',
  },
  {
    code: 'ID',
    name: 'Indonesia',
  },
  {
    code: 'IR',
    name: 'Iran',
  },
  {
    code: 'IQ',
    name: 'Iraq',
  },
  {
    code: 'IE',
    name: 'Ireland',
  },
  {
    code: 'IM',
    name: 'Isle of Man',
  },
  {
    code: 'IL',
    name: 'Israel',
  },
  {
    code: 'IT',
    name: 'Italy',
  },
  {
    code: 'JM',
    name: 'Jamaica',
  },
  {
    code: 'JP',
    name: 'Japan',
  },
  {
    code: 'JE',
    name: 'Jersey',
  },
  {
    code: 'JO',
    name: 'Jordan',
  },
  {
    code: 'KZ',
    name: 'Kazakhstan',
  },
  {
    code: 'KE',
    name: 'Kenya',
  },
  {
    code: 'KI',
    name: 'Kiribati',
  },
  {
    code: 'KW',
    name: 'Kuwait',
  },
  {
    code: 'KG',
    name: 'Kyrgyzstan',
  },
  {
    code: 'LA',
    name: 'Laos',
  },
  {
    code: 'LV',
    name: 'Latvia',
  },
  {
    code: 'LB',
    name: 'Lebanon',
  },
  {
    code: 'LS',
    name: 'Lesotho',
  },
  {
    code: 'LR',
    name: 'Liberia',
  },
  {
    code: 'LY',
    name: 'Libya',
  },
  {
    code: 'LI',
    name: 'Liechtenstein',
  },
  {
    code: 'LT',
    name: 'Lithuania',
  },
  {
    code: 'LU',
    name: 'Luxembourg',
  },
  {
    code: 'MO',
    name: 'Macao SAR China',
  },
  {
    code: 'MG',
    name: 'Madagascar',
  },
  {
    code: 'MW',
    name: 'Malawi',
  },
  {
    code: 'MY',
    name: 'Malaysia',
  },
  {
    code: 'MV',
    name: 'Maldives',
  },
  {
    code: 'ML',
    name: 'Mali',
  },
  {
    code: 'MT',
    name: 'Malta',
  },
  {
    code: 'MH',
    name: 'Marshall Islands',
  },
  {
    code: 'MQ',
    name: 'Martinique',
  },
  {
    code: 'MR',
    name: 'Mauritania',
  },
  {
    code: 'MU',
    name: 'Mauritius',
  },
  {
    code: 'YT',
    name: 'Mayotte',
  },
  {
    code: 'MX',
    name: 'Mexico',
  },
  {
    code: 'FM',
    name: 'Micronesia',
  },
  {
    code: 'MD',
    name: 'Moldova',
  },
  {
    code: 'MC',
    name: 'Monaco',
  },
  {
    code: 'MN',
    name: 'Mongolia',
  },
  {
    code: 'ME',
    name: 'Montenegro',
  },
  {
    code: 'MS',
    name: 'Montserrat',
  },
  {
    code: 'MA',
    name: 'Morocco',
  },
  {
    code: 'MZ',
    name: 'Mozambique',
  },
  {
    code: 'MM',
    name: 'Myanmar (Burma)',
  },
  {
    code: 'NA',
    name: 'Namibia',
  },
  {
    code: 'NR',
    name: 'Nauru',
  },
  {
    code: 'NP',
    name: 'Nepal',
  },
  {
    code: 'NL',
    name: 'Netherlands',
  },
  {
    code: 'NC',
    name: 'New Caledonia',
  },
  {
    code: 'NZ',
    name: 'New Zealand',
  },
  {
    code: 'NI',
    name: 'Nicaragua',
  },
  {
    code: 'NE',
    name: 'Niger',
  },
  {
    code: 'NG',
    name: 'Nigeria',
  },
  {
    code: 'NU',
    name: 'Niue',
  },
  {
    code: 'NF',
    name: 'Norfolk Island',
  },
  {
    code: 'KP',
    name: 'North Korea',
  },
  {
    code: 'MK',
    name: 'North Macedonia',
  },
  {
    code: 'MP',
    name: 'Northern Mariana Islands',
  },
  {
    code: 'NO',
    name: 'Norway',
  },
  {
    code: 'OM',
    name: 'Oman',
  },
  {
    code: 'PK',
    name: 'Pakistan',
  },
  {
    code: 'PW',
    name: 'Palau',
  },
  {
    code: 'PS',
    name: 'Palestinian Territories',
  },
  {
    code: 'PA',
    name: 'Panama',
  },
  {
    code: 'PG',
    name: 'Papua New Guinea',
  },
  {
    code: 'PY',
    name: 'Paraguay',
  },
  {
    code: 'PE',
    name: 'Peru',
  },
  {
    code: 'PH',
    name: 'Philippines',
  },
  {
    code: 'PN',
    name: 'Pitcairn Islands',
  },
  {
    code: 'PL',
    name: 'Poland',
  },
  {
    code: 'PT',
    name: 'Portugal',
  },
  {
    code: 'PR',
    name: 'Puerto Rico',
  },
  {
    code: 'QA',
    name: 'Qatar',
  },
  {
    code: 'RE',
    name: 'Réunion',
  },
  {
    code: 'RO',
    name: 'Romania',
  },
  {
    code: 'RU',
    name: 'Russia',
  },
  {
    code: 'RW',
    name: 'Rwanda',
  },
  {
    code: 'WS',
    name: 'Samoa',
  },
  {
    code: 'SM',
    name: 'San Marino',
  },
  {
    code: 'ST',
    name: 'São Tomé & Príncipe',
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
  },
  {
    code: 'SN',
    name: 'Senegal',
  },
  {
    code: 'RS',
    name: 'Serbia',
  },
  {
    code: 'SC',
    name: 'Seychelles',
  },
  {
    code: 'SL',
    name: 'Sierra Leone',
  },
  {
    code: 'SG',
    name: 'Singapore',
  },
  {
    code: 'SX',
    name: 'Sint Maarten',
  },
  {
    code: 'SK',
    name: 'Slovakia',
  },
  {
    code: 'SI',
    name: 'Slovenia',
  },
  {
    code: 'SB',
    name: 'Solomon Islands',
  },
  {
    code: 'SO',
    name: 'Somalia',
  },
  {
    code: 'ZA',
    name: 'South Africa',
  },
  {
    code: 'GS',
    name: 'South Georgia & South Sandwich Islands',
  },
  {
    code: 'KR',
    name: 'South Korea',
  },
  {
    code: 'SS',
    name: 'South Sudan',
  },
  {
    code: 'ES',
    name: 'Spain',
  },
  {
    code: 'LK',
    name: 'Sri Lanka',
  },
  {
    code: 'BL',
    name: 'St. Barthélemy',
  },
  {
    code: 'SH',
    name: 'St. Helena',
  },
  {
    code: 'KN',
    name: 'St. Kitts & Nevis',
  },
  {
    code: 'LC',
    name: 'St. Lucia',
  },
  {
    code: 'MF',
    name: 'St. Martin',
  },
  {
    code: 'PM',
    name: 'St. Pierre & Miquelon',
  },
  {
    code: 'VC',
    name: 'St. Vincent & Grenadines',
  },
  {
    code: 'SD',
    name: 'Sudan',
  },
  {
    code: 'SR',
    name: 'Suriname',
  },
  {
    code: 'SJ',
    name: 'Svalbard & Jan Mayen',
  },
  {
    code: 'SE',
    name: 'Sweden',
  },
  {
    code: 'CH',
    name: 'Switzerland',
  },
  {
    code: 'SY',
    name: 'Syria',
  },
  {
    code: 'TW',
    name: 'Taiwan',
  },
  {
    code: 'TJ',
    name: 'Tajikistan',
  },
  {
    code: 'TZ',
    name: 'Tanzania',
  },
  {
    code: 'TH',
    name: 'Thailand',
  },
  {
    code: 'TL',
    name: 'Timor-Leste',
  },
  {
    code: 'TG',
    name: 'Togo',
  },
  {
    code: 'TK',
    name: 'Tokelau',
  },
  {
    code: 'TO',
    name: 'Tonga',
  },
  {
    code: 'TT',
    name: 'Trinidad & Tobago',
  },
  {
    code: 'TN',
    name: 'Tunisia',
  },
  {
    code: 'TR',
    name: 'Turkey',
  },
  {
    code: 'TM',
    name: 'Turkmenistan',
  },
  {
    code: 'TC',
    name: 'Turks & Caicos Islands',
  },
  {
    code: 'TV',
    name: 'Tuvalu',
  },
  {
    code: 'UM',
    name: 'U.S. Outlying Islands',
  },
  {
    code: 'VI',
    name: 'U.S. Virgin Islands',
  },
  {
    code: 'UG',
    name: 'Uganda',
  },
  {
    code: 'UA',
    name: 'Ukraine',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
  },
  {
    code: 'US',
    name: 'United States',
  },
  {
    code: 'UY',
    name: 'Uruguay',
  },
  {
    code: 'UZ',
    name: 'Uzbekistan',
  },
  {
    code: 'VU',
    name: 'Vanuatu',
  },
  {
    code: 'VA',
    name: 'Vatican City',
  },
  {
    code: 'VE',
    name: 'Venezuela',
  },
  {
    code: 'VN',
    name: 'Vietnam',
  },
  {
    code: 'WF',
    name: 'Wallis & Futuna',
  },
  {
    code: 'EH',
    name: 'Western Sahara',
  },
  {
    code: 'YE',
    name: 'Yemen',
  },
  {
    code: 'ZM',
    name: 'Zambia',
  },
  {
    code: 'ZW',
    name: 'Zimbabwe',
  },
];
const numbers = ['7', '6', '5', '0', '4', '12', '120', '34', '1200', '55'];
const names = ['Mar', 'Mary', 'Ademar', 'Maria', 'Natalia', 'Emarul', 'Emaria'];
const phones = ['+36', '+5', '+25', '+87655', '+65', '+2465', '+44'];
const phones2 = ['+735', '+15', '+560', '+250', '+43', '+580', '+51', '+77', '+5'];

test('filter and sort arr by string', () => {
  const string = 'can';
  const string1 = 'fra';
  const string3 = 'mar';
  const string4 = 'ar';
  const string5 = 'AR';
  const string6 = 'MAR';

  const sortedArr = searchInArr(string, countries, 'name');
  const sortedArr1 = searchInArr(string1, countries, 'name');
  const sortedArr2 = searchInArr(string3, names);
  const sortedArr3 = searchInArr(string4, names);
  const sortedArr4 = searchInArr(string5, names);
  const sortedArr5 = searchInArr(string6, names);

  expect(sortedArr[0].code).toBe('CA');
  expect(sortedArr1[0].code).toBe('FR');
  expect(sortedArr2).toEqual(['Mar', 'Maria', 'Mary', 'Emaria', 'Emarul', 'Ademar']);
  expect(sortedArr3).toEqual(['Mar', 'Maria', 'Mary', 'Emaria', 'Emarul', 'Ademar']);
  expect(sortedArr4).toEqual(['Mar', 'Maria', 'Mary', 'Emaria', 'Emarul', 'Ademar']);
  expect(sortedArr5).toEqual(['Mar', 'Maria', 'Mary', 'Emaria', 'Emarul', 'Ademar']);
});

test('filter and sort arr by number', () => {
  const string = '12';
  const string1 = '4';

  const sortedArr = searchInArr(string, numbers);
  const sortedArr1 = searchInArr(string1, numbers);

  expect(sortedArr).toEqual(['12', '120', '1200']);
  expect(sortedArr1).toEqual(['4', '34']);
});

test('filter and sort arr by phoneNumber', () => {
  const string = '5';

  const sortedArr = searchInArr(string, phones);
  const sortedArr2 = searchInArr(string, phones2);

  expect(sortedArr).toEqual(['+5', '+25', '+65', '+2465', '+87655']);
  expect(sortedArr2).toEqual(['+5', '+51', '+560', '+580', '+15', '+250', '+735']);
});
