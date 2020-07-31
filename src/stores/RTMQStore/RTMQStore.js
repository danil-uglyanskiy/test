import io from 'socket.io-client';
import {
  action, computed, observable, reaction,
} from 'mobx';

const QUEUE_PATH = '/api/queue';

class RTMQStore {
  constructor(options = {}) {
    const queue_path = options.queue_path || QUEUE_PATH;

    this.client = io({
      path: queue_path,
      autoConnect: false,
    });

    this.client.on('connect', this.onConnected);
    this.client.on('disconnect', this.onDisconnected);
    this.client.on('reconnect', this.onReconnected);
    this.client.on('reconnect_attempt', this.onReconnectAttemp);
  }


  // Authorization
  @observable token = undefined;

  @computed get isAuthenticated() {
    return !!this.token;
  }

  @action setCredential({ token }) {
    this.token = token;
  }

  @action unsetCredential() {
    this.token = undefined;
  }


  // Connection flow
  @observable state = 'disconnected';

  @computed get isAvailable() {
    return this.state === 'available';
  }

  @computed get isConnected() {
    return this.state === 'connected';
  }

  @computed get isDisconnected() {
    return this.state === 'disconnected';
  }

  @computed get isReconnecting() {
    return this.state === 'reconnecting';
  }

  @computed get isError() {
    return this.state === 'error';
  }

  @computed get stateText() {
    switch (this.state) {
      case 'available':
        return 'Доступен';

      case 'connected':
        return 'Неавторизован';

      case 'disconnected':
        return 'Недоступен';

      case 'reconnecting':
        return 'Переподключение';

      default:
        return 'Недоступен';
    }
  }

  @action setState = (state) => {
    this.state = state;
  }


  join(options = {}) {
    this.client.open();

    this.authenticateHandler = reaction(
      () => this.isConnected && this.token,
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.authenticate(options);
        }
      },
      { fireImmediately: true },
    );
  }

  leave() {
    if (this.authenticateHandler) {
      this.authenticateHandler();
    }
    this.client.close();
  }

  authenticate = (options = {}) => {
    const strategy = options.strategy || this.STRATEGY;
    const token = options.token || this.token;

    this.client.emit('authenticate', { token, strategy }, (error, data) => {
      if (error) {
        this.errorHandler(error);
        return;
      }

      this.onAuthenticated(data);
    });
  }

  onAuthenticated = () => {
    this.setState('available');
  }

  onConnected = () => {
    this.setState('connected');
  }

  onDisconnected = (msg) => {
    this.setState('disconnected');
  }

  onReconnected = (attemptNumber) => {
    this.setState('reconnected');
  }

  onReconnectAttemp = (attemptNumber) => {
    this.setState('reconnecting');
  }

  errorHandler = (error) => {
    if (!error) {
      return;
    }
  }
}

export default RTMQStore;
