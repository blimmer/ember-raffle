import { expect } from 'chai';
import { describe, it, beforeEach, context } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from '@ember/test-helpers';
import { make, manualSetup } from 'ember-data-factory-guy';

describe('Integration | Component | raffle info', function() {
  setupComponentTest('raffle-info', {
    integration: true
  });

  beforeEach(function() {
    manualSetup(this.container);
  });

  function render() {
    this.render(hbs`{{raffle-info raffle=raffle}}`);
  }

  it('shows the raffle name', function() {
    this.set('raffle', make('raffle', { name: 'My Raffle' }));
    render.call(this);

    expect(find('[data-test-raffle-name]').textContent.trim()).to.equal('My Raffle');
  });

  context('new raffle', function() {
    beforeEach(function() {
      this.set('raffle', make('raffle'));
      render.call(this);
    });

    it('has a disabled link to ready-for-drawing', function() {
      expect(find(`${'[data-test-ready-for-drawing-header]'} a.disabled`)).to.be.ok;
    });

    it('has a tooltip explaining why the link is disabled', function() {
      expect(find(`${'[data-test-ready-for-drawing-header]'} a.disabled`).title).to.equal('Please complete setup to enable this action');
    });

    it('does not show the raffle export button', function() {
      expect(find('[data-test-component="raffle-export"]')).to.be.null;
    });
  });

  context('completely setup raffle', function() {
    beforeEach(function() {
      this.set('raffle', make('raffle', 'withParticipants'));
      render.call(this);
    });

    it('has an enabled link to ready-for-drawing', function() {
      expect(find(`${'[data-test-ready-for-drawing-header]'} a`)).to.be.ok;
      expect(find(`${'[data-test-ready-for-drawing-header]'} a.disabled`)).to.not.be.ok;
    });

    it('does not show the raffle export button', function() {
      expect(find('[data-test-component="raffle-export"]')).to.be.null;
    });
  });

  context('raffle with winners selected', function() {
    beforeEach(function() {
      this.set('raffle', make('raffle', 'finished'));
      render.call(this);
    });

    it('shows a message stating the raffle is complete', function() {
      expect(find('[data-test-completed-header]').textContent.trim()).to.equal('Winners have already been drawn for this raffle!');
    });

    it('shows the winner', function() {
      expect(find('[data-test-component="winner-card"]')).to.be.ok;
    });

    it('does not show the setup link', function() {
      expect(find('[data-test-setup-header]')).to.not.be.ok;
    });

    it('does not show the ready-for-drawing link', function() {
      expect(find('[data-test-ready-for-drawing-header]')).to.not.be.ok;
    });

    it('shows the raffle export button', function() {
      expect(find('[data-test-component="raffle-export"]')).to.be.ok;
    });
  });
});
