import { expect } from 'chai';
import { describe, context, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Adapter | application', function() {
  setupTest('adapter:application', {
    // required by i18n
    needs: [
      'locale:en-us/translations',
      'locale:en-us/config',
      'util:i18n/missing-message',
      'util:i18n/compile-template',
      'ember-i18n@config:zh',
      'config:environment',
      'service:i18n',
    ]
  });

  context('localstorage disabled', function() {
    it('shows an alert', function() {
      let alertStub = this.sandbox.stub(window, 'alert');
      let subject = this.subject();
      subject.trigger('persistenceUnavailable');

      expect(alertStub.calledOnce).to.be.true;
      expect(alertStub.getCall(0).args[0].toString()).to.include('data will not be persisted');
    });
  })
});
