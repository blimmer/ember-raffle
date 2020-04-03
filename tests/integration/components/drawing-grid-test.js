import { expect } from "chai";
import { describe, it, beforeEach } from "mocha";
import { setupRenderingTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { find, render } from "@ember/test-helpers";
import { make, makeList, manualSetup } from "ember-data-factory-guy";

describe("Integration | Component | drawing grid", function () {
  setupRenderingTest();

  beforeEach(function () {
    manualSetup(this);
  });

  async function doRender() {
    if (!this.get("winners")) {
      this.set("winners", [make("participant")]);
    }

    if (!this.get("losers")) {
      this.set("losers", makeList("participant", 2));
    }

    await render(hbs`
      {{drawing-grid winners=winners losers=losers}}
    `);
  }

  it("shows all participants in a grid", async function () {
    let participants = makeList("participant", 3);
    this.set("winners", participants.slice(0));
    this.set("losers", participants.slice(1, 2));

    await doRender.call(this);

    participants.forEach((participant) => {
      expect(find(`[data-test-participant-id="${participant.id}"]`)).to.be.ok;
    });
  });

  it.skip("pulls losers from the board");
  it.skip(
    "calls the showWinners action when all losers have been pulled from the board"
  );
});
