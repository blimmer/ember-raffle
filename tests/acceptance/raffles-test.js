import {
  describe,
  context,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from 'raffle/tests/helpers/start-app';
import destroyApp from 'raffle/tests/helpers/destroy-app';
import { visit, find } from 'ember-native-dom-helpers';

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
    expect(find('[data-test-component="raffle-list"]')).to.be.ok;
  });

  context('no raffles created', function() {
    it('create a new raffle and navigates to its landing page when clicking the button', async function() {
      await visit('/raffles');
      await click('[data-test-create-new-raffle-button]');
      expect(currentRouteName()).to.equal('raffles.raffle.index');
    });
  });
});
