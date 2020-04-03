import { expect } from "chai";
import { describe, it, beforeEach } from "mocha";
import { setupRenderingTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { find, render } from "@ember/test-helpers";
import { make, manualSetup } from "ember-data-factory-guy";

describe("Integration | Component | raffle setup info", function () {
  setupRenderingTest();

  beforeEach(function () {
    manualSetup(this);
  });

  async function doRender() {
    if (!this.get("raffle")) {
      this.set("raffle", make("raffle"));
    }

    await render(hbs`
      {{raffle-setup-info raffle=raffle}}
    `);
  }

  it("shows the raffle name in the header", async function () {
    this.set(
      "raffle",
      make("raffle", {
        name: "My Raffle",
      })
    );
    await doRender.call(this);
    expect(find("[data-test-header]").textContent.trim()).to.equal(
      "Setup My Raffle"
    );
  });

  it("has a link to settings", async function () {
    await doRender.call(this);
    expect(find("[data-test-settings-header]" + " a")).to.be.ok;
  });

  it("has a link to add participants", async function () {
    await doRender.call(this);
    expect(find("[data-test-add-participants-header]" + " a")).to.be.ok;
  });

  it("has a save button", async function () {
    await doRender.call(this);
    expect(find(".large.primary.button")).to.be.ok;
  });
});
