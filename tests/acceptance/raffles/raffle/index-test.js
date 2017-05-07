import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'raffle/tests/helpers/start-app';
import destroyApp from 'raffle/tests/helpers/destroy-app';
import { visit, click } from 'ember-native-dom-helpers';
import { make } from 'ember-data-factory-guy';
import testSelector from 'ember-test-selectors';

describe('Acceptance | raffles/raffle/index', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit the route', async function() {
    let raffle = make('raffle');
    await visit(`/raffles/${raffle.id}`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}`);
  });

  it('renders the raffle-info component', async function() {
    let raffle = make('raffle');
    await visit(`/raffles/${raffle.id}`);
    expect(testSelector('component', 'raffle-info')).to.be.ok;
  });

  it('navigates to the setup route when clicking the setup link', async function() {
    let raffle = make('raffle');
    await visit(`/raffles/${raffle.id}`);
    await click(`${testSelector('setup-header')} a`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup`);
  });

  it('navigates to the ready for drawing route when clicking the ready for drawing link', async function() {
    let raffle = make('raffle', 'withParticipants');
    await visit(`/raffles/${raffle.id}`);
    await click(`${testSelector('ready-for-drawing-header')} a`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/ready-for-drawing`);
  });
});
