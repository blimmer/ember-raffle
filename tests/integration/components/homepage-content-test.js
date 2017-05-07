import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | homepage content', function() {
  setupComponentTest('homepage-content', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#homepage-content}}
    //     template content
    //   {{/homepage-content}}
    // `);

    this.render(hbs`{{homepage-content}}`);
    expect(this.$()).to.have.length(1);
  });
});
