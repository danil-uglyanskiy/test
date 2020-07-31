import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { reaction } from "mobx";
import { Provider } from "mobx-react";

import { Grommet } from 'grommet';
import theme from 'theme/theme';

import store from "stores/rootStore";
import AuthStore from "stores/AuthStore";
import RTMQStore from "stores/RTMQStore";
import NotificationsStore from "stores/NotificationStore";
import { history } from "stores/rootStore/NavStore";

import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import ICU from "i18next-icu";

import { App } from "pages";
import i18nConfig from "config/i18n";

i18n
  .use(ICU)
  .use(initReactI18next)
  .init(i18nConfig);

window.i18n = i18n;

const authStore = AuthStore.create();
const rtmqStore = new RTMQStore();
const notificationsStore = new NotificationsStore();

reaction(
  () => authStore.authenticated,
  isAuthenticated => {
    if (!isAuthenticated) {
      return;
    }

    const token = authStore.bearerToken;
    const { user_id } = authStore;

    rtmqStore.setCredential({ token });
    notificationsStore.connect({ token, user_id });
  },
  { fireImmediately: true }
);

ReactDOM.render(
  <Router history={history}>
    <I18nextProvider i18n={i18n}>
      <Provider
        {...store}
        authStore={authStore}
        notificationsStore={notificationsStore}
      >
        <Grommet theme={theme}>
          <App />
        </Grommet>
      </Provider>
    </I18nextProvider>
  </Router>,
  document.getElementById("root")
);
