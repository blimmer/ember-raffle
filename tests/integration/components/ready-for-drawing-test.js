import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | ready for drawing', function() {
  setupComponentTest('ready-for-drawing', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#ready-for-drawing}}
    //     template content
    //   {{/ready-for-drawing}}
    // `);

    this.render(hbs`{{ready-for-drawing}}`);
    expect(this.$()).to.have.length(1);
  });
});
