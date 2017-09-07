import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | site header', function() {
  setupComponentTest('site-header', {
    integration: true
  });

  function render() {
    this.render(hbs`{{site-header}}`);
  }

  it('has a link to the homepage', function() {
    render.call(this);
    expect(find('[data-test-selector="global-homepage-link"]')).to.be.ok;
  });

  it('has a link to the raffles index', function() {
    render.call(this);
    expect(find('[data-test-selector="global-raffles-link"]')).to.be.ok;
  });
});
