import { describe, it, beforeEach } from "mocha";
import { setupApplicationTest } from "ember-mocha";
import { expect } from "chai";
import { visit, find, click, fillIn, currentURL } from "@ember/test-helpers";
import { make, manualSetup } from "ember-data-factory-guy";

describe("Acceptance | raffles/raffle/add participants", function () {
  setupApplicationTest();

  let raffle;
  beforeEach(function () {
    manualSetup(this);
    raffle = make("raffle");
  });

  it("can visit the route", async function () {
    await visit(`/raffles/${raffle.id}/setup/add-participants`);
    expect(currentURL()).to.equal(
      `/raffles/${raffle.id}/setup/add-participants`
    );
  });

  it("renders the raffle-setup-add-participants component", async function () {
    await visit(`/raffles/${raffle.id}/setup/add-participants`);
    expect(find('[data-test-component="raffle-setup-add-participants"]')).to.be
      .ok;
  });

  it("transitions to the confirm-participants route after filling in the form", async function () {
    await visit(`/raffles/${raffle.id}/setup/add-participants`);
    await fillIn("textarea", "Ben Limmer");
    await click("[data-test-add-participants-button]");
    expect(currentURL()).to.equal(
      `/raffles/${raffle.id}/setup/confirm-participants`
    );
  });
});
