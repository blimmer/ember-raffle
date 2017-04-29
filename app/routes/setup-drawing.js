import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    submitDrawingSetup() {
      this.transitionTo('ready-for-drawing');
    }
  }
});
