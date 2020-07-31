// const daysInMonth = month => new Date(2019, month, 0).getDate();

export const phoneMask =
  [
    { fixed: '+7 ( ' },
    {
      length: 3,
      regexp: /^[0-9]{1,3}$/,
      placeholder: '___',
    },
    { fixed: ' )' },
    { fixed: ' ' },
    {
      length: 3,
      regexp: /^[0-9]{1,3}$/,
      placeholder: '___',
    },
    { fixed: '-' },
    {
      length: 2,
      regexp: /^[0-9]{1,2}$/,
      placeholder: '__',
    },
    { fixed: '-' },
    {
      length: 2,
      regexp: /^[0-9]{1,2}$/,
      placeholder: '__'
    }
  ];

export const dateMask = [
  {
    length: [1, 2],
    options: Array.from(
      {
        // length: daysInMonth(parseInt(value.split("/")[0], 10))
      },
      (v, k) => k + 1
    ),
    regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
    placeholder: "ДД"
  },
  { fixed: "." },
  {
    length: [1, 2],
    options: Array.from({ length: 12 }, (v, k) => k + 1),
    regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
    placeholder: "ММ"
  },
  { fixed: "." },

  {
    length: 4,
    options: Array.from({ length: 100 }, (v, k) => 2019 - k),
    regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
    placeholder: "yyyy"
  }
];

export const timeMask = [
  {
    length: [1, 2],
    regexp: /^1[1-2]$|^[0-9]$/,
    placeholder: 'ЧЧ',
  },
  { fixed: '.' },
  {
    length: 2,
    regexp: /^[0-5][0-9]$|^[0-9]$/,
    placeholder: 'ММ',
  },
  { fixed: '.' },
  {
    length: 2,
    regexp: /^[0-5][0-9]$|^[0-9]$/,
    placeholder: 'СС',
  },
];