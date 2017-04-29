import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Component.extend({
  classNames: ['ui', 'padded', 'text', 'container'],
  table: Ember.computed('participants', function() {
    return new Table(this.get('columns'), this.get('participants'));
  }),

  columns: Ember.computed(function() {
    return [{
      label: 'Name',
      valuePath: 'name',
    }];
  }),

  onColumnClick(column) {
    if (column.sorted) {
      this.setProperties({
        dir: column.ascending ? 'asc' : 'desc',
        sort: column.get('valuePath'),
      });
    }
  }
});
