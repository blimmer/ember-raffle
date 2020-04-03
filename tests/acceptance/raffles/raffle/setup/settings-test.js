import {
  describe,
  it,
  beforeEach,
} from 'mocha';
import {
  setupApplicationTest
} from "ember-mocha"
import {
  expect
} from 'chai';
import {
  visit,
  find,
  click,
  currentURL
} from '@ember/test-helpers';
import {
  make,
  manualSetup
} from 'ember-data-factory-guy';

describe('Acceptance | raffles/raffle/setup/settings', function () {
  setupApplicationTest();

  let raffle;
  beforeEach(function () {
    manualSetup(this);
    raffle = make('raffle');
  });

  it('can visit the route', async function () {
    await visit(`/raffles/${raffle.id}/setup/settings`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup/settings`);
  });

  it('renders the raffle setup settings component', async function () {
    await visit(`/raffles/${raffle.id}/setup/settings`);
    expect(find('[data-test-component="raffle-setup-settings"]')).to.be.ok;
  });

  it('goes back to the setup index page when the save button is clicked', async function () {
    await visit(`/raffles/${raffle.id}/setup/settings`);
    await click('[data-test-save-button]');
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup`);
  });
});
