import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    confirmParticipants() {
      this.transitionTo('raffles.raffle.setup.confirm-participants');
    }
  }
});
