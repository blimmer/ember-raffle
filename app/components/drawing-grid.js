import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import { sample } from 'lodash';

export default Ember.Component.extend({
  elementId: 'drawing-grid-component',

  currentParticipants: Ember.computed.union('winners', 'losers'),

  init() {
    this._super(...arguments);
    this.get('dropLosers').perform();
  },

  dropLosers: task(function * () {
    let losers = this.get('losers');
    let loserToDrop = sample(losers);
    this.set('losers', losers.without(loserToDrop));

    yield timeout(1000);

    if (this.get('losers.length') > 0) {
      this.get('dropLosers').perform();
    } else {
      this.sendAction('showWinners');
    }
  }),
});
