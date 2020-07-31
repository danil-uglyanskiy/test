import io from 'socket.io-client';
import { action, observable } from 'mobx';
import Notification from './Notification';

class NotificationStore {
  constructor() {
    this.client = io({
      autoConnect: false,
      path: '/api/queue',
    });

    this.client.on('connect', this.onConnected);
    this.client.on('disconnect', this.onDisconnected);
    this.client.on('reconnect', this.onReconnected);
    this.client.on('reconnect_attempt', this.onReconnectAttemp);
  }

  @observable notifications = new Map();

  @action
  removeNotification = (notification) => {
    const { id } = notification;
    this.notifications.delete(id);
  }

  @action
  appendNotification = (attrs) => {
    const notification = Notification.create(attrs);
    this.notifications.set(notification.id, notification);
  }

  @action
  resetNotifications = (response) => {
    const { data } = response;
    data.forEach(this.appendNotification);
  }

  @action
  markAsRead(notification) {
    const attrs = { status: 'read' };

    this.updateNotification(notification, attrs).then(this.removeNotification);
  }

  @action
  markAllAsRead() {
    this.notifications.forEach(this.markAsRead);
  }

  // Public methods
  connect(options = {}) {
    this.strategy = options.strategy || 'internal';
    this.token = options.token;

    this.client.open();
  }

  authenticate = () => {
    const authParams = {
      strategy: this.strategy,
      token: this.token,
    };

    this.client.emit('authenticate', authParams, (error, data) => {
      if (!error) {
        this.onError(error);
        return;
      }

      this.onAuthenticated(data);
    });
  }

  // Socket Handlers
  onConnected = () => {
    this.authenticate();
    this.addHandlers();
  }

  onDisconnected = (ntf) => {
    this.removeHandlers();
  }

  onReconnected = (attemptNumber) => {

  }

  onReconnectAttemp = (attemptNumber) => {

  }

  onAuthenticated = () => {
    this.findNotifications().then(response => this.resetNotifications(response));
  }

  onError = (error, data) => {
    if (error) {
      return;
    }
  }

  addHandlers = () => {
    this.client.on('notifications created', this.appendNotification);
  }

  removeHandlers = () => {
    this.client.removeListener('notifications created', this.appendNotification);
  }

  // Socket methods
  findNotifications = () => {
    const query = { status: 'unread' };

    return new Promise((resolve, reject) => this.client.emit('find', 'notifications', query, (error, data) => {
      if (error) {
        this.onError(error, data);
        reject(error);
        return;
      }

      resolve(data);
    }));
  }

  updateNotification = (message, attrs) => new Promise((resolve, reject) => {
    this.client.emit('patch', 'notifications', message.id, attrs, (error, data) => {
      if (error) {
        this.onError(error, data);
        reject(error);
        return;
      }

      resolve(data);
    });
  });
}

export default NotificationStore;
