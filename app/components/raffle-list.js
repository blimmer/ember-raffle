import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Component.extend({
  columns: Ember.computed(function() {
    return [
      {
        label: 'Name',
        valuePath: 'name',
      },
      {
        label: 'Finished?',
        valuePath: 'drawingComplete',
      }
    ]
  }),

  table: Ember.computed('raffles.[]', function() {
    return new Table(this.get('columns'), this.get('raffles'));
  }),

  rowClicked(row) {
    this.sendAction('viewRaffle', row.content);
  }
});
