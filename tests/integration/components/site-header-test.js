import { expect } from "chai";
import { describe, it } from "mocha";
import { setupRenderingTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { find, render } from "@ember/test-helpers";

describe("Integration | Component | site header", function () {
  setupRenderingTest();

  async function doRender() {
    await render(hbs`{{site-header}}`);
  }

  it("has a link to the homepage", async function () {
    await doRender.call(this);
    expect(find('[data-test-selector="global-homepage-link"]')).to.be.ok;
  });

  it("has a link to the raffles index", async function () {
    await doRender.call(this);
    expect(find('[data-test-selector="global-raffles-link"]')).to.be.ok;
  });
});
