import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'raffle/tests/helpers/start-app';
import destroyApp from 'raffle/tests/helpers/destroy-app';
import { visit, find, click, fillIn } from 'ember-native-dom-helpers';
import { make } from 'ember-data-factory-guy';

describe('Acceptance | raffles/raffle/add participants', function() {
  let application, raffle;

  beforeEach(function() {
    application = startApp();
    raffle = make('raffle');
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit the route', async function() {
    await visit(`/raffles/${raffle.id}/setup/add-participants`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup/add-participants`);
  });

  it('renders the raffle-setup-add-participants component', async function() {
    await visit(`/raffles/${raffle.id}/setup/add-participants`);
    expect(find('[data-test-component="raffle-setup-add-participants"]')).to.be.ok;
  });

  it('transitions to the confirm-participants route after filling in the form', async function() {
    await visit(`/raffles/${raffle.id}/setup/add-participants`);
    await fillIn('textarea', 'Ben Limmer');
    await click('[data-test-add-participants-button]');
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup/confirm-participants`);
  });
});
