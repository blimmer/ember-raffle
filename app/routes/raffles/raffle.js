import Route from "@ember/routing/route";

export default Route.extend({
  actions: {
    showRaffleSetupInfo(raffle) {
      this.transitionTo("raffles.raffle.setup.index", raffle);
    },
    error() {
      this.transitionTo("raffles");
    },
  },
});
