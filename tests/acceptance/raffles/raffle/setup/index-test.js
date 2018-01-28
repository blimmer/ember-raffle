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

describe('Acceptance | raffles/raffle/setup/index', function() {
  let application, raffle;

  beforeEach(function() {
    application = startApp();
    raffle = make('raffle');
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit the route', async function() {
    await visit(`/raffles/${raffle.id}/setup`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup`);
  });

  it('renders the raffle-setup-info component', async function() {
    await visit(`/raffles/${raffle.id}/setup`);
    expect(find('[data-test-component="raffle-setup-info"]')).to.be.ok;
  });

  it('navigates to the setup route when clicking the settings link', async function() {
    await visit(`/raffles/${raffle.id}/setup`);
    await click(`${'[data-test-settings-header]'} a`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup/settings`);
  });

  it('navigates to the add participants route when clicking the add participants link', async function() {
    await visit(`/raffles/${raffle.id}/setup`);
    await click(`${'[data-test-add-participants-header]'} a`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup/add-participants`);
  });

  it('goes back to the raffle index when clicking the save button', async function() {
    await visit(`/raffles/${raffle.id}/setup`);
    await click(`.button.primary`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}`);
  });
});
