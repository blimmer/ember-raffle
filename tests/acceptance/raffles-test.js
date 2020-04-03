import { describe, context, it } from "mocha";
import { setupApplicationTest } from "ember-mocha";
import { expect } from "chai";
import {
  click,
  visit,
  find,
  currentURL,
  currentRouteName,
} from "@ember/test-helpers";

describe("Acceptance | raffles", function () {
  setupApplicationTest();

  it("visiting /raffles", async function () {
    await visit("/raffles");
    expect(currentURL()).to.equal("/raffles");
  });

  it("it renders the raffle list component", async function () {
    await visit("/raffles");
    expect(find('[data-test-component="raffle-list"]')).to.be.ok;
  });

  context("no raffles created", function () {
    it("create a new raffle and navigates to its landing page when clicking the button", async function () {
      await visit("/raffles");
      await click("[data-test-create-new-raffle-button]");
      expect(currentRouteName()).to.equal("raffles.raffle.index");
    });
  });
});
