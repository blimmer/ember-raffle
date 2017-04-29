import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showRaffleSetupInfo(raffle) {
      this.transitionTo('raffles.raffle.setup.index', raffle);
    }
  }
});
