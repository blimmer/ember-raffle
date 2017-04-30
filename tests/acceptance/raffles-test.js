import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'raffle/tests/helpers/start-app';
import destroyApp from 'raffle/tests/helpers/destroy-app';
import { visit, find } from 'ember-native-dom-helpers';
import testSelector from 'ember-test-selectors';

describe('Acceptance | raffles', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('visiting /raffles', async function() {
    await visit('/raffles');
    expect(currentURL()).to.equal('/raffles');
  });

  it('it renders the raffle list component', async function() {
    await visit('/raffles');
    expect(find(testSelector('component', 'raffle-list'))).to.be.ok;
  });
});
