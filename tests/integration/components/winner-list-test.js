import { expect } from "chai";
import { describe, it, beforeEach } from "mocha";
import { setupRenderingTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { find, render } from "@ember/test-helpers";
import { make, makeList, manualSetup } from "ember-data-factory-guy";

describe("Integration | Component | winner list", function () {
  setupRenderingTest();

  beforeEach(function () {
    manualSetup(this);
  });

  async function doRender() {
    if (!this.get("winners")) {
      this.set("winners", make("participant"));
    }

    await render(hbs`
      <div id='fullscreen-confetti'></div>
      {{winner-list winners=winners}}
    `);
  }

  it("shows confetti", async function () {
    await doRender.call(this);
    expect(find('[data-test-component="confetti-rain"]')).to.be.ok;
  });

  it("renders a winner card for each winner", async function () {
    this.set("winners", makeList("participant", 2));
    await doRender.call(this);
    expect(find('[data-test-component="winner-card"]')).to.be.ok;
  });
});
