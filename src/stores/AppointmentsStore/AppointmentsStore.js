import { types, applySnapshot } from 'mobx-state-tree';
import { storeModelStateTypes } from 'types/mobx-state-tree';
import instance from 'connection/instance';

import Appointment from './Appointment';
import MonthlySlots from './MonthlySlots';
import WeeklySlots from './WeeklySlots';

const AppointmentsStore = types
  .model('AppointmentsStore', {
    data: types.optional(types.array(Appointment), []),
    weeklySlots: types.maybeNull(WeeklySlots),
    monthlySlots: types.maybeNull(MonthlySlots),
    state: types.maybeNull(storeModelStateTypes)
  })
  .views(self => ({
    get isFetched() {
      return self.state === 'done';
    },
    get isPending() {
      return self.state === 'pending';
    },
    get isError() {
      return self.state === 'error';
    }
  }))
  .actions(self => ({
    fetch(values = {}) {
      self.setState('pending');
      let states = [
        'busy',
        'incompleted',
        'completed',
        'failed'
      ];
      let params = { states, ...values };
      params = { data: params };
      return instance.get('/api/appointments', { params })
        .then(response => self.resetStore(response))
        .then(() => self.setState('done'))
        .catch(error => self.errorHandler(error));
    },

    fetchWeeklySlots(values = {}) {
      self.setState('pending');
      let states = [
        'busy',
        'completed'
      ];
      let params = { states, ...values };
      params = { data: params };
      return instance.get('/api/schedules/weekly_slots', { params })
        .then(response => self.resetWeeklySlots(response))
        .then(() => self.setState('done'))
        .catch(error => self.errorHandler(error));
    },

    fetchMonthlySlots(values = {}) {
      self.setState('pending');
      let states = [
        'busy',
        'completed',
        'incompleted',
        'failed'
      ];
      let params = { states, ...values };
      params = { data: params };
      return instance.get('/api/schedules/monthly_slots', { params })
        .then(response => self.resetMonthlySlots(response))
        .then(() => self.setState('done'))
        .catch(error => self.errorHandler(error));
    },

    delete(id, values = {}) {
      self.setState('pending');
      let params = { data: values };
      return instance.put(`/api/appointments/${id}/cancel`, { ...params })
        .then(() => self.setState('done'))
        .catch(error => self.errorHandler(error));
      },
  

    setState(state) {
      self.state = state;
      return self;
    },

    resetStore(response) {
      const { status, data } = response;
      if (status === 200) {
        applySnapshot(self, data);
      }

      return self;
    },

    resetMonthlySlots(response) {
      const { status, data } = response;
      if (status === 200) {
        self.monthlySlots = data;
      }

      return self.monthlySlots;
    },

    resetWeeklySlots(response) {
      const { status, data } = response;
      if (status === 200) {
        self.weeklySlots = data;
      }

      return self.weeklySlots;
    },

    errorHandler(error) {
      self.setState('error');
      return Promise.reject(error);
    },

    clear() {
      return null;
    },
  }));

export default AppointmentsStore;