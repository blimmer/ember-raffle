import Ember from 'ember';
import { chain } from 'lodash';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  nameList: Ember.computed(function() {
    let participants = this.get('raffle.participants');
    return participants.reduce((str, participant) => {
      return str += `${participant.get('name')}\n`;
    }, '');
  }),
  gatherParticipants() {
    let names = chain(this.get('nameList'))
      .split('\n')
      .compact()
      .uniq()
      .value();

    let store = this.get('store');
    return Ember.RSVP.Promise.all(names.map((name) => {
      return store.query('participant', {
        name,
      }).then((result) => {
        let existingParticipant = Ember.get(result, 'firstObject');
        if (!existingParticipant) {
          return store.createRecord('participant', {
            name,
          }).save();
        } else {
          return existingParticipant;
        }
      })
    }));
  },
  associateParticipants(participants) {
    let raffle = this.get('raffle');
    raffle.set('participants', participants);
    return raffle.save();
  }
});
