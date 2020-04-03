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

describe('Acceptance | raffles/raffle/ready for drawing', function () {
  setupApplicationTest();

  let raffle;
  beforeEach(function () {
    manualSetup(this);
    raffle = make('raffle', 'withParticipants');
  });

  it('can visit /raffles/raffle/ready-for-drawing', async function () {
    await visit(`/raffles/${raffle.id}/ready-for-drawing`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/ready-for-drawing`);
  });

  it('renders the ready for drawing component', async function () {
    await visit(`/raffles/${raffle.id}/ready-for-drawing`);
    expect(find('[data-test-component="ready-for-drawing"]')).to.be.ok;
  });

  it('links to the ready for drawing route when clicking the button', async function () {
    await visit(`/raffles/${raffle.id}/ready-for-drawing`);
    await click('.primary.button');
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/run-drawing`);
  });
});
