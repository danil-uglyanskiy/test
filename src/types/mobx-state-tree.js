import { types } from 'mobx-state-tree';

export const storeModelStateTypes = types.enumeration(['pending', 'done', 'error']);
