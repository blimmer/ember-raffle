import { describe, it, beforeEach } from "mocha";
import { setupApplicationTest } from "ember-mocha";
import { expect } from "chai";
import { find, visit, currentURL } from "@ember/test-helpers";
import { make, manualSetup } from "ember-data-factory-guy";

describe("Acceptance | raffles/raffle/winners", function () {
  setupApplicationTest();

  let raffle;
  beforeEach(function () {
    manualSetup(this);
    raffle = make("raffle", "finished");
  });

  it("can visit the route", async function () {
    await visit(`/raffles/${raffle.id}/winners`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/winners`);
  });

  it("renders the winner list", async function () {
    await visit(`/raffles/${raffle.id}/winners`);
    expect(find('[data-test-component="winner-list"]')).to.be.ok;
  });
});
