import { expect } from "chai";
import { describe, it, beforeEach } from "mocha";
import { setupRenderingTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { find, click, fillIn, render } from "@ember/test-helpers";
import { make, manualSetup } from "ember-data-factory-guy";

describe("Integration | Component | raffle setup settings", function () {
  setupRenderingTest();

  beforeEach(function () {
    manualSetup(this);
  });

  async function doRender() {
    if (!this.get("raffle")) {
      this.set("raffle", make("raffle"));
    }

    if (!this.get("showRaffleSetupInfo")) {
      this.set("showRaffleSetupInfo", () => {});
    }

    await render(hbs`
      {{raffle-setup-settings raffle=raffle showRaffleSetupInfo=showRaffleSetupInfo}}
    `);
  }

  it("has a header", async function () {
    await doRender.call(this);
    expect(find("[data-test-header]").textContent.trim()).to.equal(
      "What're the specifics of this raffle?"
    );
  });

  describe("name input", function () {
    it("shows the existing raffle name initially", async function () {
      this.set(
        "raffle",
        make("raffle", {
          name: "A very special raffle",
        })
      );
      await doRender.call(this);

      expect(find("[data-test-raffle-name-input]").value).to.equal(
        "A very special raffle"
      );
    });

    it("mutates the raffle name when changed", async function () {
      await doRender.call(this);
      await fillIn("[data-test-raffle-name-input]", "A very average raffle");
      expect(find("[data-test-raffle-name-input]").value).to.equal(
        "A very average raffle"
      );
      expect(this.get("raffle.name")).to.equal("A very average raffle");
    });
  });

  describe("number of winners input", function () {
    it("is a number input field", async function () {
      await doRender.call(this);
      expect(find(`${"[data-test-raffle-num-winners-input]"}[type='number']`))
        .to.be.ok;
    });

    it("shows the existing number of winners initially", async function () {
      this.set(
        "raffle",
        make("raffle", {
          numberOfWinners: 2,
        })
      );
      await doRender.call(this);
      expect(find("[data-test-raffle-num-winners-input]").value).to.equal("2");
    });

    it("mutates the raffle number of when changed", async function () {
      this.set(
        "raffle",
        make("raffle", {
          numberOfWinners: 2,
        })
      );
      await doRender.call(this);
      await fillIn("[data-test-raffle-num-winners-input]", "3");
      expect(find("[data-test-raffle-num-winners-input]").value).to.equal("3");
      expect(this.get("raffle.numberOfWinners")).to.equal("3");
    });

    it("has a singular label when the field is 1", async function () {
      this.set(
        "raffle",
        make("raffle", {
          numberOfWinners: 2,
        })
      );
      await doRender.call(this);
      expect(
        find("[data-test-raffle-num-winners-label]").textContent.trim()
      ).to.equal("winners");
    });

    it("has a pluralized label when the field is greater than 1", async function () {
      this.set(
        "raffle",
        make("raffle", {
          numberOfWinners: 1,
        })
      );
      await doRender.call(this);
      expect(
        find("[data-test-raffle-num-winners-label]").textContent.trim()
      ).to.equal("winner");
    });
  });

  describe("save button", function () {
    it("is disabled when the number of winners is invalid", async function () {
      await doRender.call(this);
      expect(find("[data-test-save-button]").disabled).to.be.false;
      await fillIn("[data-test-raffle-num-winners-input]", "0");
      expect(find("[data-test-save-button]").disabled).to.be.true;
    });

    it("is disabled when the name is invalid", async function () {
      await doRender.call(this);
      expect(find("[data-test-save-button]").disabled).to.be.false;
      await fillIn("[data-test-raffle-name-input]", "");
      expect(find("[data-test-save-button]").disabled).to.be.true;
    });

    it("saves the changes to the raffle model when clicked", async function () {
      await doRender.call(this);
      await fillIn("[data-test-raffle-name-input]", "My Raffle 123");
      await fillIn("[data-test-raffle-num-winners-input]", "2");
      expect(this.get("raffle.hasDirtyAttributes")).to.be.true;
      await click(find("[data-test-save-button]"));
      expect(this.get("raffle.hasDirtyAttributes")).to.be.false;
    });

    it("fires the showRaffleSetupInfo when clicked", async function (done) {
      this.set("showRaffleSetupInfo", () => {
        done();
      });
      await doRender.call(this);
      await click(find("[data-test-save-button]"));
    });
  });
});
