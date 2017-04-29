import Ember from 'ember';
import { chain } from 'lodash';

export default Ember.Component.extend({
  classNames: ['ui', 'padded', 'text', 'container'],
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

    let names = chain(this.get('nameList'))
      .split('\n')
      .compact()
      .uniq()
      .value();
    names.forEach((name) => {
      store.createRecord('participant', {
        name,
      }).save();
    });

    this.sendAction('transitionToConfirmationPage');
  }
});
