import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from '@ember/test-helpers';
import { make, manualSetup } from 'ember-data-factory-guy';

describe('Integration | Component | raffle setup info', function() {
  setupComponentTest('raffle-setup-info', {
    integration: true
  });

  beforeEach(function() {
    manualSetup(this.container);
  });

  function render() {
    if (!this.get('raffle')) {
      this.set('raffle', make('raffle'));
    }

    this.render(hbs`
      {{raffle-setup-info raffle=raffle}}
    `);
  }

  it('shows the raffle name in the header', function() {
    this.set('raffle', make('raffle', { name: 'My Raffle' }));
    render.call(this);
    expect(find('[data-test-header]').textContent.trim()).to.equal('Setup My Raffle');
  });

  it('has a link to settings', function() {
    render.call(this);
    expect(find('[data-test-settings-header]' + ' a')).to.be.ok;
  });

  it('has a link to add participants', function() {
    render.call(this);
    expect(find('[data-test-add-participants-header]' + ' a')).to.be.ok;
  });

  it('has a save button', function() {
    render.call(this);
    expect(find('.large.primary.button')).to.be.ok;
  });
});
