import Ember from 'ember';
import { sample } from 'lodash';

export default Ember.Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('winner', sample(this.get('participants').toArray()));
  }
});
