import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'raffle/tests/helpers/start-app';
import destroyApp from 'raffle/tests/helpers/destroy-app';
import { click } from 'ember-native-dom-helpers';

describe('Acceptance | site header', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('links to the homepage when clicking the homepage link', async function() {
    await visit('/raffles');
    await click('[data-test-selector="global-homepage-link"]');
    expect(currentURL()).to.equal('/');
  });

  it('links to the raffles list when clicking the view all raffles link', async function() {
    await visit('/');
    await click('[data-test-selector="global-raffles-link"]');
    expect(currentURL()).to.equal('/raffles');
  });
});
