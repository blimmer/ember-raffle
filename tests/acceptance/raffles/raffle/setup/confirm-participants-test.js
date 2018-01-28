import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from 'raffle/tests/helpers/start-app';
import destroyApp from 'raffle/tests/helpers/destroy-app';
import { visit, find } from 'ember-native-dom-helpers';
import { make } from 'ember-data-factory-guy';

describe('Acceptance | raffles/raffle/setup/confirm participants', function() {
  let application, raffle;

  beforeEach(function() {
    application = startApp();
    raffle = make('raffle', 'withParticipants');
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit the route', async function() {
    await visit(`/raffles/${raffle.id}/setup/confirm-participants`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup/confirm-participants`);
  });

  it('renders the raffle-setup-confirm-participants component', async function() {
    await visit(`/raffles/${raffle.id}/setup/confirm-participants`);
    expect(find('[data-test-component="raffle-setup-confirm-participants"]')).to.be.ok;
  });

  it('goes back to the add-participants route when clicking the edit button', async function() {
    await visit(`/raffles/${raffle.id}/setup/confirm-participants`);
    await click('[data-test-link="add-participants"]');
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup/add-participants`);
  });

  it('goes to the setup info route when clicking the save button', async function() {
    await visit(`/raffles/${raffle.id}/setup/confirm-participants`);
    await click('[data-test-link="confirm-participants"]');
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup`);
  });
});
