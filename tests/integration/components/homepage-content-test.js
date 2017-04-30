import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';
import testSelector from 'ember-test-selectors';

moduleForComponent('homepage-content', 'Integration | Component | homepage content', {
  integration: true
});

test('it has confetti rain', function(assert) {
  this.render(hbs`{{homepage-content}}`);
  assert.ok(find(testSelector('component', 'confetti-rain')));
});

test('it shows the sitename', function(assert) {
  this.render(hbs`{{homepage-content}}`);
  assert.ok(find(testSelector('jumbotron-header'), 'ember-raffle'));
});
