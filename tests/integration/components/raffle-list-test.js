import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | raffle list', function() {
  setupComponentTest('raffle-list', {
    integration: true
  });

  it.skip('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#raffle-list}}
    //     template content
    //   {{/raffle-list}}
    // `);

    this.render(hbs`{{raffle-list}}`);
    expect(this.$()).to.have.length(1);
  });
});
