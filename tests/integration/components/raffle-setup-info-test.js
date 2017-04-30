import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | raffle setup info', function() {
  setupComponentTest('raffle-setup-info', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#raffle-setup-info}}
    //     template content
    //   {{/raffle-setup-info}}
    // `);

    this.render(hbs`{{raffle-setup-info}}`);
    expect(this.$()).to.have.length(1);
  });
});
