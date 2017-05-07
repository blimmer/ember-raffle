import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'raffle/tests/helpers/start-app';
import destroyApp from 'raffle/tests/helpers/destroy-app';
import { find, visit } from 'ember-native-dom-helpers';
import { make } from 'ember-data-factory-guy';
import testSelector from 'ember-test-selectors';

describe('Acceptance | raffles/raffle/winners', function() {
  let application, raffle;

  beforeEach(function() {
    application = startApp();
    raffle = make('raffle', 'finished');
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit the route', async function() {
    await visit(`/raffles/${raffle.id}/winners`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/winners`);
  });

  it('renders the winner list', async function() {
    await visit(`/raffles/${raffle.id}/winners`);
    expect(find(testSelector('component', 'winner-list'))).to.be.ok;
  });
});
