import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    confirmParticipants() {
      this.transitionTo('raffles.raffle.setup.confirm-participants');
    }
  }
});
