import FactoryGuy from 'ember-data-factory-guy';
import moment from 'moment';

FactoryGuy.define('raffle', {
  default: {},
  traits: {
    withParticipants: {
      participants: FactoryGuy.hasMany('participant', 2)
    },
    finished: {
      drawingEndTime: () => moment().subtract(2, 'days').toDate()
    }
  }
});
