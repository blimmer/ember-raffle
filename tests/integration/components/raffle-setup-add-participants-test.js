import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | raffle setup add participants', function() {
  setupComponentTest('raffle-setup-add-participants', {
    integration: true
  });

  it.skip('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#raffle-setup-add-participants}}
    //     template content
    //   {{/raffle-setup-add-participants}}
    // `);

    this.render(hbs`{{raffle-setup-add-participants}}`);
    expect(this.$()).to.have.length(1);
  });
});
