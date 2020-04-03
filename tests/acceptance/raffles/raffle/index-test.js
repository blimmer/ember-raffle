import {
  describe,
  it,
  beforeEach
} from 'mocha';
import {
  setupApplicationTest
} from "ember-mocha"
import {
  expect
} from 'chai';
import {
  visit,
  click
} from '@ember/test-helpers';
import {
  make,
  manualSetup
} from 'ember-data-factory-guy';

describe('Acceptance | raffles/raffle/index', function () {
  setupApplicationTest();

  beforeEach(() => {
    manualSetup(this)
  })

  it('can visit the route', async function () {
    let raffle = make('raffle');
    await visit(`/raffles/${raffle.id}`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}`);
  });

  it('renders the raffle-info component', async function () {
    let raffle = make('raffle');
    await visit(`/raffles/${raffle.id}`);
    expect('[data-test-component="raffle-info"]').to.be.ok;
  });

  it('navigates to the setup route when clicking the setup link', async function () {
    let raffle = make('raffle');
    await visit(`/raffles/${raffle.id}`);
    await click(`${'[data-test-setup-header]'} a`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup`);
  });

  it('navigates to the ready for drawing route when clicking the ready for drawing link', async function () {
    let raffle = make('raffle', 'withParticipants');
    await visit(`/raffles/${raffle.id}`);
    await click(`${'[data-test-ready-for-drawing-header]'} a`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/ready-for-drawing`);
  });

  it('returns to the raffles index accessing a raffle that does not exist', async function () {
    await visit('/raffles/does-not-exist');
    expect(currentURL()).to.equal('/raffles');
  });
});
