import { observable, action, computed } from "mobx";

import { AppointmentsStore } from 'stores/AppointmentsStore';

class AppointmentState {

    @observable id;

    constructor(id) {
        this.id = id;
        this.initStore();
    }

    //initialization
    @observable appointmentsStore;

    initStore = () => {
        this.appointmentsStore = AppointmentsStore.create();
    }

    dispose = () => {
        this.clearAppointments();
    }

    //appointments
    @observable appointments = [];

    @action
    setAppointments = (appointments) => {
        this.appointments = appointments;
    }

    @action
    clearAppointments = () => {
        this.appointments = [];
    }

    async fetchAppointments() {
        this.setState('pending');
        const data = {
            patient_ids: [this.id],
            states: [
                'available',
                'cancelled',
                'busy',
                'completed'
            ]
        };
        const appointments = await this.appointmentsStore.fetch(data);
        this.setAppointments(appointments.data.toJSON());
        this.setState('done');
    }

    //state
    @observable state = 'done';

    @computed get isFetched() {
        return this.state === 'done';
    }

    @action
    setState = (state) => {
        this.state = state;
    }
}

export default AppointmentState;