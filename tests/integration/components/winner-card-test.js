import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from '@ember/test-helpers';
import { make, manualSetup } from 'ember-data-factory-guy';

describe('Integration | Component | winner card', function() {
  setupComponentTest('winner-card', {
    integration: true
  });

  it('shows a trophy icon', function() {
    this.render(hbs`{{winner-card}}`);
    expect(find('i.icon.trophy')).to.be.ok;
  });

  it("includes the winner's name", function() {
    manualSetup(this.container);
    this.set('winner', make('participant', { name: 'Lucky Ducky' }));
    this.render(hbs`{{winner-card winner=winner}}`);
    expect(find('[data-test-winner-name]').textContent.trim()).to.equal('Lucky Ducky');
  });
});
