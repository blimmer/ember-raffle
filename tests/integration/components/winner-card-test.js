import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | winner card', function() {
  setupComponentTest('winner-card', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#winner-card}}
    //     template content
    //   {{/winner-card}}
    // `);

    this.render(hbs`{{winner-card}}`);
    expect(this.$()).to.have.length(1);
  });
});
