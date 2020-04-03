import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from '@ember/test-helpers';
import { make, makeList, manualSetup } from 'ember-data-factory-guy';

describe('Integration | Component | ready for drawing', function() {
  setupComponentTest('ready-for-drawing', {
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
      {{ready-for-drawing raffle=raffle}}
    `);
  }

  it('has a header', function() {
    render.call(this);
    expect(find('[data-test-header]').textContent.trim()).to.equal(`We're all set to draw winners for ${this.get('raffle.name')}!`);
  });

  describe('participant count', function() {
    it('shows the number of participants', function() {
      this.set('raffle', make('raffle', { participants: makeList('participant', 3) }));
      render.call(this);

      expect(find('[data-test-number-of-participants]').textContent.trim()).to.include('3');
    });

    it('has a singular label for one participant', function() {
      this.set('raffle', make('raffle', { participants: makeList('participant', 1) }));
      render.call(this);

      expect(find('[data-test-number-of-participants]').textContent.trim()).to.include('participant');
    });

    it('has a pluralized label for more than more participant', function() {
      this.set('raffle', make('raffle', { participants: makeList('participant', 2) }));
      render.call(this);

      expect(find('[data-test-number-of-participants]').textContent.trim()).to.include('participants');
    });
  });

  describe('winner count', function() {
    it('shows the number of winners', function() {
      this.set('raffle', make('raffle', 'withParticipants', { numberOfWinners: 1 }));
      render.call(this);

      expect(find('[data-test-number-of-winners]').textContent.trim()).to.include('1');
    });

    it('has a singular label for one winner', function() {
      this.set('raffle', make('raffle', 'withParticipants', { numberOfWinners: 1 }));
      render.call(this);

      expect(find('[data-test-number-of-winners]').textContent.trim()).to.include('winner');
    });

    it('has a pluralized label for more than more participant', function() {
      this.set('raffle', make('raffle', 'withParticipants', { numberOfWinners: 2 }));
      render.call(this);

      expect(find('[data-test-number-of-winners]').textContent.trim()).to.include('winners');
    });
  });

  it('has a link to start the drawing', function() {
    render.call(this);
    expect(find('.button.primary')).to.be.ok;
  });
});
