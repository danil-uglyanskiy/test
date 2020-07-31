import store from 'store';

export default [
  response => response,
  (error) => {
    if (error.response.status === 401) {
      store.remove('authStore');
      window.location = '/login';
      return null;
    }
    return Promise.reject(error);
  },
];
