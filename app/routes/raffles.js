import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    createNewRaffle() {
      return this.store.createRecord('raffle').save().then((raffle) => {
        this.transitionTo('raffles.raffle', raffle);
      });
    },
    viewRaffle(raffle) {
      this.transitionTo('raffles.raffle', raffle);
    }
  }
});
