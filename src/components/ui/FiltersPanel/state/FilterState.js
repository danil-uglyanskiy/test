import BaseForm from 'forms/BaseForm';
import fields from './fields';

class FilterState extends BaseForm {
    constructor(hooks) {
        super(fields, { hooks});
    }

    addFilter(filter) {
        const filters = [
            ...this.$('filters').value,
            filter
        ];

        this.update({ filters });
    }

    removeFilter(filter) {
        filter.del();
    }

    clearAll() {
        this.update({ filters: [] });
    }
}

export default FilterState;