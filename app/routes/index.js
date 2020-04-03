import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    return this.store.findAll("participant");
  },
  actions: {
    transitionToConfirmationPage() {
      this.transitionTo("confirm-participants");
    },
  },
});
