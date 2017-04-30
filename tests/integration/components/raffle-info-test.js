import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | raffle info', function() {
  setupComponentTest('raffle-info', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#raffle-info}}
    //     template content
    //   {{/raffle-info}}
    // `);

    this.render(hbs`{{raffle-info}}`);
    expect(this.$()).to.have.length(1);
  });
});
