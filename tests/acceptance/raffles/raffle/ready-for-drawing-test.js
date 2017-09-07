import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'raffle/tests/helpers/start-app';
import destroyApp from 'raffle/tests/helpers/destroy-app';
import { visit, find, click } from 'ember-native-dom-helpers';
import { make } from 'ember-data-factory-guy';

describe('Acceptance | raffles/raffle/ready for drawing', function() {
  let application, raffle;

  beforeEach(function() {
    application = startApp();
    raffle = make('raffle', 'withParticipants');
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /raffles/raffle/ready-for-drawing', async function() {
    await visit(`/raffles/${raffle.id}/ready-for-drawing`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/ready-for-drawing`);
  });

  it('renders the ready for drawing component', async function() {
    await visit(`/raffles/${raffle.id}/ready-for-drawing`);
    expect(find('[data-test-component="ready-for-drawing"]')).to.be.ok;
  });

  it('links to the ready for drawing route when clicking the button', async function() {
    await visit(`/raffles/${raffle.id}/ready-for-drawing`);
    await click('.primary.button');
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/run-drawing`);
  });
});
