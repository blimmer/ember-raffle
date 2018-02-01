import { A } from '@ember/array';
import { bool } from '@ember/object/computed';
import { computed, get } from '@ember/object';
import DS from 'ember-data';
import moment from 'moment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  participants: validator('length', { min: 1 }),
  name: validator('presence', true),
  numberOfWinners: validator('number', {
    allowString: true,
    integer: true,
    gt: 0,
    lte: computed('model.participants.[]', function() {
      let participantCount = this.get('model.participants.length');
      if (participantCount === 0) {
        return Infinity;
      } else {
        return participantCount;
      }
    }),
  }),
});

export default DS.Model.extend(Validations, {
  name: DS.attr('string', {
    defaultValue() {
      return `My Raffle - ${moment().format('lll')}`;
    },
  }),
  participants: DS.hasMany('participant'),
  numberOfWinners: DS.attr('number', { defaultValue: 1 }),
  drawingEndTime: DS.attr('date'),
  winners: DS.hasMany('participant'),

  drawingComplete: bool('drawingEndTime'),
  losers: computed('winners.[]', function() {
    let winners = this.get('winners').toArray();
    if (get(winners, 'length') > 0) {
      let participants = this.get('participants').toArray();
      return A(participants.reject(function(participant) {
        return winners.includes(participant);
      }));
    } else {
      return A([]);
    }
  }),
});
