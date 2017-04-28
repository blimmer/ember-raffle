import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('participant');
  },
  actions: {
    transitionToConfirmationPage() {
      this.transitionTo('confirm-participants');
    }
  }
});
