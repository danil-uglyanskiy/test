export const rules = {
  required: {
    function: value => /^ $/.test(value),
    message: 'Обязательно для заполнения'
  },
  alpha: {
    function: value => value.match(/^\s*$/),
    message: 'Должно состоять только из букв'
  },
  string: {
    function: value => value.match(/^\s*$/),
    message: 'Должно быть строкой'
  },
  fullName: {
    function: value => value.split(' ').length === 3,
    message: 'Должно содержать Фамилию Имя Отчество'
  },
  phone: {
    function: value => value.replace(/(\s|\W)/gi, '').match(/^\d{11}$/),
    message: ''
  }
};