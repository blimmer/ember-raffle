import { describe, it } from "mocha";
import { expect } from "chai";
import { setupApplicationTest } from "ember-mocha";
import { visit, click, find, currentURL } from "@ember/test-helpers";

describe("Acceptance | index", function () {
  setupApplicationTest();

  it("it can visit homepage", async function () {
    await visit("/");
    expect(currentURL()).to.equal("/");
  });

  it("it renders the homepage content module", async function () {
    await visit("/");
    expect(find('[data-test-component="homepage-content"]')).to.be.ok;
  });

  it("it has a link to the raffles list from the homepage", async function () {
    await visit("/");
    await click(`${"[data-test-get-started-segment]"} .button`);
    expect(currentURL()).to.equal("/raffles");
  });
});
