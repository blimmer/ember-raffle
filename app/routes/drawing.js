import Ember from 'ember';
import { sample } from 'lodash';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('participant');
  },
  setupController(controller, model) {
    this._super(...arguments);

    let everyone = model.toArray();
    let winners = Ember.A([sample(everyone)]);
    let losers = everyone.without(winners);

    controller.setProperties({
      winners,
      losers
    });
  },

  actions: {
    showWinners() {
      let winners = this.controllerFor(this.routeName).get('winners');
      let winnersQueryParam = winners.mapBy('id').join(',')
      this.transitionTo(`/winners?ids=${winnersQueryParam}`);
    }
  }
});
