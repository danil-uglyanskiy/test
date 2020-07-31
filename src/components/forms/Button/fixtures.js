import Button from './Button';

export default [
  {
    component: Button,
    name: 'prime',
    props: {
      type: 'prime',
      children: 'Сохравнить'
    },
  },
  {
    component: Button,
    name: 'prime loading',
    props: {
      type: 'prime',
      children: 'Сохравнить',
      loading: true
    },
  },
  {
    component: Button,
    name: 'choice',
    props: {
      type: 'choice',
      children: 'Сохравнить'
    },
  },
  {
    component: Button,
    name: 'outline',
    props: {
      type: 'outline',
      children: 'Сохравнить'
    },
  },
];
