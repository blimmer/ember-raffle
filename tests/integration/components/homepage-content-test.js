import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import { find } from 'ember-native-dom-helpers';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'ember-test-selectors';

describe('Integration | Component | homepage content', function() {
  setupComponentTest('homepage-content', {
    integration: true
  });

  beforeEach(function() {
    this.render(hbs`{{homepage-content}}`);
  });

  it('shows confetti-rain', function() {
    expect(find(testSelector('component', 'confetti-rain'))).to.be.ok;
  });

  it('has a jumbotron', function() {
    expect(find(testSelector('jumbotron-header')).textContent.trim()).to.equal('ember-raffle');
  });

  it('has a why segment', function() {
    expect(find(testSelector('why-segment'))).to.be.ok;
  });

  it('has a get-started segment', function() {
    expect(find(testSelector('get-started-segment'))).to.be.ok;
  });

  it('has shameless self-promotion', function() {
    expect(find(testSelector('shamless-self-promotion-segment'))).to.be.ok;
  });
});
