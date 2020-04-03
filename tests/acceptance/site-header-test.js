import {
  describe,
  it,
} from 'mocha';
import {
  setupApplicationTest
} from "ember-mocha"
import {
  expect
} from 'chai';
import {
  click
} from '@ember/test-helpers';

describe('Acceptance | site header', function () {
  setupApplicationTest();

  it('links to the homepage when clicking the homepage link', async function () {
    await visit('/raffles');
    await click('[data-test-selector="global-homepage-link"]');
    expect(currentURL()).to.equal('/');
  });

  it('links to the raffles list when clicking the view all raffles link', async function () {
    await visit('/');
    await click('[data-test-selector="global-raffles-link"]');
    expect(currentURL()).to.equal('/raffles');
  });
});
