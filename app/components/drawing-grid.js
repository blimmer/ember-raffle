import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import { round, sampleSize, without } from 'lodash';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    if (!Ember.testing) {
      this.get('dropLosers').perform();
    }
  },

  currentParticipants: Ember.computed.union('winners', 'losers'),

  dropLosers: task(function * () {
    let losers = this.get('losers').toArray();
    let numToDrop = round(this.get('losers.length') * .2 , 0) || 1;
    let losersToDrop = sampleSize(losers, numToDrop);
    this.set('losers', without(losers, ...losersToDrop));

    yield timeout(1000);

    if (this.get('losers.length') > 0) {
      this.get('dropLosers').perform();
    } else {
      this.sendAction('showWinners');
    }
  }),
});
