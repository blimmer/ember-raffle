import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';
import { make, makeList, manualSetup } from 'ember-data-factory-guy';

describe('Integration | Component | winner list', function() {
  setupComponentTest('winner-list', {
    integration: true
  });

  beforeEach(function() {
    manualSetup(this.container);
  });

  function render() {
    if (!this.get('winners')) {
      this.set('winners', make('participant'));
    }

    this.render(hbs`
      <div id='fullscreen-confetti'></div>
      {{winner-list winners=winners}}
    `);
  }

  it('shows confetti', function() {
    render.call(this);
    expect(find('[data-test-component="confetti-rain"]')).to.be.ok;
  });

  it('renders a winner card for each winner', function() {
    this.set('winners', makeList('participant', 2))
    render.call(this);
    expect(find('[data-test-component="winner-card"]')).to.be.ok;
  });
});
