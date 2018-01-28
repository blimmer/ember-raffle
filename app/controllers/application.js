import { dasherize } from '@ember/string';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  routeCssName: computed('currentRouteName', function() {
    return dasherize(this.get('currentRouteName'));
  }),
});
