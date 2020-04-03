import { describe, it, beforeEach } from "mocha";
import { setupApplicationTest } from "ember-mocha";
import { expect } from "chai";
import { visit, find, click, currentURL } from "@ember/test-helpers";
import { make, manualSetup } from "ember-data-factory-guy";

describe("Acceptance | raffles/raffle/setup/index", function () {
  setupApplicationTest();

  let raffle;
  beforeEach(function () {
    manualSetup(this);
    raffle = make("raffle");
  });

  it("can visit the route", async function () {
    await visit(`/raffles/${raffle.id}/setup`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup`);
  });

  it("renders the raffle-setup-info component", async function () {
    await visit(`/raffles/${raffle.id}/setup`);
    expect(find('[data-test-component="raffle-setup-info"]')).to.be.ok;
  });

  it("navigates to the setup route when clicking the settings link", async function () {
    await visit(`/raffles/${raffle.id}/setup`);
    await click(`${"[data-test-settings-header]"} a`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}/setup/settings`);
  });

  it("navigates to the add participants route when clicking the add participants link", async function () {
    await visit(`/raffles/${raffle.id}/setup`);
    await click(`${"[data-test-add-participants-header]"} a`);
    expect(currentURL()).to.equal(
      `/raffles/${raffle.id}/setup/add-participants`
    );
  });

  it("goes back to the raffle index when clicking the save button", async function () {
    await visit(`/raffles/${raffle.id}/setup`);
    await click(`.button.primary`);
    expect(currentURL()).to.equal(`/raffles/${raffle.id}`);
  });
});
