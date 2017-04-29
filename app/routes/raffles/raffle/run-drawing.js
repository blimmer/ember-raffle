import Ember from 'ember';
import { sampleSize } from 'lodash';
import moment from 'moment';

export default Ember.Route.extend({
  afterModel(model) {
    this._super(...arguments);

    if (!model.get('drawingComplete')) {
      let numWinners = model.get('numberOfWinners');
      let winners = sampleSize(model.get('participants').toArray(), numWinners)
      model.setProperties({
        winners,
        drawingEndTime: moment().toDate(),
      });
      return model.save();
    }
  },
  actions: {
    showWinners() {
      this.transitionTo('raffles.raffle.winners');
    }
  }
});
