import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';
import { makeList, manualSetup } from 'ember-data-factory-guy';

describe('Integration | Component | raffle setup confirm participants', function() {
  setupComponentTest('raffle-setup-confirm-participants', {
    integration: true
  });

  beforeEach(function() {
    manualSetup(this.container);
  });

  function render() {
    this.render(hbs`
      {{raffle-setup-confirm-participants participants=participants}}
    `);
  }

  describe('content', function() {
    beforeEach(function() {
      render.call(this);
    });
    it('has a header', function() {
      expect(find('[data-test-confirm-participants-header]').textContent.trim()).to.equal("Is this everyone?");
    });

    it('has a table', function() {
      expect(find('table')).to.be.ok;
    });
  });

  describe('table', function() {
    beforeEach(function() {
      this.set('participants', makeList('participant', 2));
      render.call(this);
    });

    it('show the participants names', function() {
      let participants = this.get('participants');
      expect(find('.lt-body').textContent).to.include(participants.get('firstObject.name'));
      expect(find('.lt-body').textContent).to.include(participants.get('lastObject.name'));
    });
  });

  it('has an edit button', function() {
    render.call(this);
    expect(find('[data-test-link="confirm-participants"]')).to.be.ok;
  });

  it('has a confirm link', function() {
    render.call(this);
    expect(find('[data-test-link="confirm-participants"]')).to.be.ok;
  });
});
