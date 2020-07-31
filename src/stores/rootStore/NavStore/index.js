import { computed, observable, action } from 'mobx';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';

const routerStore = new RouterStore();

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routerStore);

class NavStore {
  @observable router = routerStore;

  @computed get params() {
    return new URLSearchParams(this.router.location.search);
  }

  @computed get fullPath() {
    const { pathname, search, hash } = this.router.location;
    return `${pathname}${search}${hash}`;
  }

  @action setParam(key, value) {
    const { history: routerHistory, location } = this.router;

    this.params.set(key, value);
    routerHistory.push(`${location.pathname}?${this.params.toString()}`);
  }

  @action deleteParam(param) {
    this.params.delete(param);
    history.push(`${window.location.pathname}?${this.params.toString()}`);
  }

  getParam(param) {
    return this.params.get(param);
  }

  hasParam(param) {
    return this.params.has(param);
  }
}

export default new NavStore();
export { history };
