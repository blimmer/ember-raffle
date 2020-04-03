import { expect } from "chai";
import { describe, it, beforeEach } from "mocha";
import { setupRenderingTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { find, render } from "@ember/test-helpers";
import { makeList, manualSetup } from "ember-data-factory-guy";

describe("Integration | Component | raffle setup confirm participants", function () {
  setupRenderingTest();

  beforeEach(function () {
    manualSetup(this);
  });

  async function doRender() {
    await render(
      hbs`{{raffle-setup-confirm-participants participants=participants}}`
    );
  }

  describe("content", function () {
    beforeEach(async function () {
      await doRender.call(this);
    });
    it("has a header", function () {
      expect(
        find("[data-test-confirm-participants-header]").textContent.trim()
      ).to.equal("Is this everyone?");
    });

    it("has a table", function () {
      expect(find("table")).to.be.ok;
    });
  });

  describe("table", function () {
    beforeEach(async function () {
      this.set("participants", makeList("participant", 2));
      await doRender.call(this);
    });

    it("show the participants names", function () {
      let participants = this.get("participants");
      expect(find(".lt-body").textContent).to.include(
        participants.get("firstObject.name")
      );
      expect(find(".lt-body").textContent).to.include(
        participants.get("lastObject.name")
      );
    });
  });

  it("has an edit button", async function () {
    await doRender.call(this);
    expect(find('[data-test-link="confirm-participants"]')).to.be.ok;
  });

  it("has a confirm link", async function () {
    await doRender.call(this);
    expect(find('[data-test-link="confirm-participants"]')).to.be.ok;
  });
});
