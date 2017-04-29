import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let ids = params.ids.split(',');

    return this.store.query('participant', { id: new RegExp(ids.join('|')) });
  },
});
