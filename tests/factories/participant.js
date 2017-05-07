import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('participant', {
  sequences: {
    name: (num) => `Participant ${num}`
  },
  default: {
    name: FactoryGuy.generate('name')
  }
});
