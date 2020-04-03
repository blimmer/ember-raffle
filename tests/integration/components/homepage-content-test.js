import { expect } from "chai";
import { describe, it, beforeEach } from "mocha";
import { setupRenderingTest } from "ember-mocha";
import { find, render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

describe("Integration | Component | homepage content", function () {
  setupRenderingTest();

  beforeEach(async function () {
    await render(hbs`{{homepage-content}}`);
  });

  it("shows confetti-rain", function () {
    expect(find('[data-test-component="confetti-rain"]')).to.be.ok;
  });

  it("has a jumbotron", function () {
    expect(find("[data-test-jumbotron-header]").textContent.trim()).to.equal(
      "ember-raffle"
    );
  });

  it("has a why segment", function () {
    expect(find("[data-test-why-segment]")).to.be.ok;
  });

  it("has a get-started segment", function () {
    expect(find("[data-test-get-started-segment]")).to.be.ok;
  });

  it("has shameless self-promotion", function () {
    expect(find("[data-test-shamless-self-promotion-segment]")).to.be.ok;
  });
});
