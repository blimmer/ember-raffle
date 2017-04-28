import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('participant');
  },
  actions: {
    participantsConfirmed() {
      this.transitionTo('ready-for-drawing');
    }
  }
});
