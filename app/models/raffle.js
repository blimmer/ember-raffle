import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  name: DS.attr('string', {
    defaultValue() {
      return `My Raffle - ${moment().format('lll')}`;
    },
  }),
  participants: DS.hasMany('participant'),
  numberOfWinners: DS.attr('number', { defaultValue: 1 }),
  drawingEndTime: DS.attr('date'),
  winners: DS.hasMany('participant'),

  drawingComplete: Ember.computed.bool('drawingEndTime'),
  losers: Ember.computed('winners.[]', function() {
    let winners = this.get('winners');
    if (Ember.get(winners, 'length') > 0) {
      let participants = this.get('participants');
      return participants.without(winners);
    } else {
      return Ember.A([]);
    }
  }),
});
