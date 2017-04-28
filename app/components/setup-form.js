import Ember from 'ember';
import { compact } from 'lodash';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  participants: null,
  nameList: Ember.computed(function() {
    let participants = this.get('participants');
    return participants.reduce((str, participant) => {
      return str += `${participant.get('name')}\n`;
    }, '');
  }),
  submitNames() {
    let store = this.get('store');
    store.peekAll('participant').forEach((participant) => {
      participant.destroyRecord();
    });

    let names = compact(this.get('nameList').split('\n'));
    names.forEach((name) => {
      store.createRecord('participant', {
        name,
      }).save();
    });

    this.sendAction('transitionToConfirmationPage');
  }
});
