import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | raffle setup settings', function() {
  setupComponentTest('raffle-setup-settings', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#raffle-setup-settings}}
    //     template content
    //   {{/raffle-setup-settings}}
    // `);

    this.render(hbs`{{raffle-setup-settings}}`);
    expect(this.$()).to.have.length(1);
  });
});
