import Ember from 'ember';

export default Ember.Controller.extend({
  routeCssName: Ember.computed('currentRouteName', function() {
    return Ember.String.dasherize(this.get('currentRouteName'));
  }),
});
