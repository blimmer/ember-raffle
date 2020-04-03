import { expect } from "chai";
import { describe, it, beforeEach } from "mocha";
import { setupRenderingTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { find, render } from "@ember/test-helpers";
import { make, makeList, manualSetup } from "ember-data-factory-guy";

describe("Integration | Component | ready for drawing", function () {
  setupRenderingTest();

  beforeEach(function () {
    manualSetup(this);
  });

  async function doRender() {
    if (!this.get("raffle")) {
      this.set("raffle", make("raffle"));
    }

    await render(hbs`
      {{ready-for-drawing raffle=raffle}}
    `);
  }

  it("has a header", async function () {
    await doRender.call(this);
    expect(find("[data-test-header]").textContent.trim()).to.equal(
      `We're all set to draw winners for ${this.get("raffle.name")}!`
    );
  });

  describe("participant count", function () {
    it("shows the number of participants", async function () {
      this.set(
        "raffle",
        make("raffle", {
          participants: makeList("participant", 3),
        })
      );
      await doRender.call(this);

      expect(
        find("[data-test-number-of-participants]").textContent.trim()
      ).to.include("3");
    });

    it("has a singular label for one participant", async function () {
      this.set(
        "raffle",
        make("raffle", {
          participants: makeList("participant", 1),
        })
      );
      await doRender.call(this);

      expect(
        find("[data-test-number-of-participants]").textContent.trim()
      ).to.include("participant");
    });

    it("has a pluralized label for more than more participant", async function () {
      this.set(
        "raffle",
        make("raffle", {
          participants: makeList("participant", 2),
        })
      );
      await doRender.call(this);

      expect(
        find("[data-test-number-of-participants]").textContent.trim()
      ).to.include("participants");
    });
  });

  describe("winner count", function () {
    it("shows the number of winners", async function () {
      this.set(
        "raffle",
        make("raffle", "withParticipants", {
          numberOfWinners: 1,
        })
      );
      await doRender.call(this);

      expect(
        find("[data-test-number-of-winners]").textContent.trim()
      ).to.include("1");
    });

    it("has a singular label for one winner", async function () {
      this.set(
        "raffle",
        make("raffle", "withParticipants", {
          numberOfWinners: 1,
        })
      );
      await doRender.call(this);

      expect(
        find("[data-test-number-of-winners]").textContent.trim()
      ).to.include("winner");
    });

    it("has a pluralized label for more than more participant", async function () {
      this.set(
        "raffle",
        make("raffle", "withParticipants", {
          numberOfWinners: 2,
        })
      );
      await doRender.call(this);

      expect(
        find("[data-test-number-of-winners]").textContent.trim()
      ).to.include("winners");
    });
  });

  it("has a link to start the drawing", async function () {
    await doRender.call(this);
    expect(find(".button.primary")).to.be.ok;
  });
});
