import { test } from 'qunit';
import moduleForAcceptance from 'raffle/tests/helpers/module-for-acceptance';
import { visit, click, find } from 'ember-native-dom-helpers';
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | index');

test('it can visit homepage', async function(assert) {
  await visit('/');
  assert.equal(currentURL(), '/');
});

test('it renders the homepage content module', async function(assert) {
  await visit('/');
  assert.ok(find(testSelector('component', 'homepage-content')));
});

test('it has a link to the raffles list from the homepage', async function(assert) {
  await visit('/');
  await click(`${testSelector('get-started-segment')} .button`);
  assert.equal(currentURL(), '/raffles');
});
