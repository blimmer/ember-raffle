import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from 'raffle/tests/helpers/start-app';
import destroyApp from 'raffle/tests/helpers/destroy-app';
import { visit, find, click } from 'ember-native-dom-helpers';
import { make } from 'ember-data-factory-guy';

describe('Acceptance | raffles/raffle/setup/settings', function() {
  let application, raffle;

  beforeEach(function() {
    application = startApp();
    raffle = make('raffle');
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit the route', async function() {
    await visit(`/raffles/${raffle.id}/setup/settings`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup/settings`);
  });

  it('renders the raffle setup settings component', async function() {
    await visit(`/raffles/${raffle.id}/setup/settings`);
    expect(find('[data-test-component="raffle-setup-settings"]')).to.be.ok;
  });

  it('goes back to the setup index page when the save button is clicked', async function() {
    await visit(`/raffles/${raffle.id}/setup/settings`);
    await click('[data-test-save-button]');
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup`);
  });
});
