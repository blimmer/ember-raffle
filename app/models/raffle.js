import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  participants: DS.hasMany('participant'),
  numberOfWinners: DS.attr('number', { defaultValue: 1 }),
  drawingEndTime: DS.attr('date'),
  winners: DS.hasMany('participant'),

  drawingComplete: Ember.computed.present('drawingEndTime'),
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
