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
  find
} from '@ember/test-helpers';
import {
  make
} from 'ember-data-factory-guy';

describe('Acceptance | raffles/raffle/setup/confirm participants', function () {
  setupApplicationTest();

  let raffle;
  beforeEach(function () {
    raffle = make('raffle', 'withParticipants');
  });


  it('can visit the route', async function () {
    await visit(`/raffles/${raffle.id}/setup/confirm-participants`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup/confirm-participants`);
  });

  it('renders the raffle-setup-confirm-participants component', async function () {
    await visit(`/raffles/${raffle.id}/setup/confirm-participants`);
    expect(find('[data-test-component="raffle-setup-confirm-participants"]')).to.be.ok;
  });

  it('goes back to the add-participants route when clicking the edit button', async function () {
    await visit(`/raffles/${raffle.id}/setup/confirm-participants`);
    await click('[data-test-link="add-participants"]');
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup/add-participants`);
  });

  it('goes to the setup info route when clicking the save button', async function () {
    await visit(`/raffles/${raffle.id}/setup/confirm-participants`);
    await click('[data-test-link="confirm-participants"]');
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup`);
  });
});
