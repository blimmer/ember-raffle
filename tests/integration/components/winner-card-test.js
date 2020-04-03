import { expect } from "chai";
import { describe, it } from "mocha";
import { setupRenderingTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { find, render } from "@ember/test-helpers";
import { make, manualSetup } from "ember-data-factory-guy";

describe("Integration | Component | winner card", function () {
  setupRenderingTest();

  it("shows a trophy icon", async function () {
    await render(hbs`{{winner-card}}`);
    expect(find("i.icon.trophy")).to.be.ok;
  });

  it("includes the winner's name", async function () {
    manualSetup(this);
    this.set(
      "winner",
      make("participant", {
        name: "Lucky Ducky",
      })
    );
    await render(hbs`{{winner-card winner=winner}}`);
    expect(find("[data-test-winner-name]").textContent.trim()).to.equal(
      "Lucky Ducky"
    );
  });
});
