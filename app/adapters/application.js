import Ember from 'ember';
import LSAdapter from 'ember-localstorage-adapter';

export default LSAdapter.extend({
  i18n: Ember.inject.service(),
  namespace: 'raffle',

  _warnOnPersistenceUnavailable: Ember.on('persistenceUnavailable', function() {
    window.alert(
      this.get('i18n').t('adapter.localstorageDisabled')
    );
  }),
});
