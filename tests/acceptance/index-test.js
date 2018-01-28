import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from 'raffle/tests/helpers/start-app';
import destroyApp from 'raffle/tests/helpers/destroy-app';
import { visit, click, find } from 'ember-native-dom-helpers';

describe('Acceptance | index', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('it can visit homepage', async function() {
    await visit('/');
    expect(currentURL()).to.equal('/');
  });

  it('it renders the homepage content module', async function() {
    await visit('/');
    expect(find('[data-test-component="homepage-content"]')).to.be.ok;
  });

  it('it has a link to the raffles list from the homepage', async function() {
    await visit('/');
    await click(`${'[data-test-get-started-segment]'} .button`);
    expect(currentURL()).to.equal('/raffles');
  });
});
