import { observable } from 'mobx';
import navStore from './NavStore';

class RootStore {
  constructor() {
    this.navStore = navStore;
    this.userStore = observable({
      avatarUrl: 'https://pp.userapi.com/c851224/v851224113/8ea78/hodfbeU_JME.jpg',
      fullName: 'Алексей Малюта',
      position: 'Главный по тарелочкам',
    });
  }
}

const rootStore = new RootStore();
export default rootStore;
