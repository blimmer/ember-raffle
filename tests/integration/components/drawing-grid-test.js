import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | drawing grid', function() {
  setupComponentTest('drawing-grid', {
    integration: true
  });

  it.skip('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#drawing-grid}}
    //     template content
    //   {{/drawing-grid}}
    // `);

    this.render(hbs`{{drawing-grid}}`);
    expect(this.$()).to.have.length(1);
  });
});
