import { A } from "@ember/array";
import { expect } from "chai";
import { describe, it, context, beforeEach } from "mocha";
import { setupRenderingTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { click, find, findAll, render } from "@ember/test-helpers";
import { make, manualSetup } from "ember-data-factory-guy";

describe("Integration | Component | raffle list", function () {
  setupRenderingTest();

  async function doRender() {
    if (!this.get("createNewRaffle")) {
      this.set("createNewRaffle", () => {});
    }
    await render(hbs`
      {{raffle-list
        raffles=raffles
        viewRaffle=viewRaffle
        createNewRaffle=createNewRaffle}}
    `);
  }

  it("has a button to create a new raffle", async function () {
    await doRender.call(this);
    expect(find("[data-test-create-new-raffle-button]")).to.be.ok;
  });

  it("fires the create new raffle action when clicking the new button", async function (done) {
    this.set("createNewRaffle", () => {
      done();
    });

    await doRender.call(this);
    await click("[data-test-create-new-raffle-button]");
  });

  context("no raffles created", function () {
    it("shows a message intended for new users", async function () {
      await doRender.call(this);
      expect(find("[data-test-empty-state]").textContent).to.include(
        "Hi! Looks like you're new here."
      );
    });
  });

  context("with raffles previously created", function () {
    let unfinishedRaffle, finishedRaffle;
    beforeEach(function () {
      manualSetup(this);
      unfinishedRaffle = make("raffle");
      finishedRaffle = make("raffle", "finished");
      this.set("raffles", A([unfinishedRaffle, finishedRaffle]));
    });

    describe("table", function () {
      beforeEach(async function () {
        await doRender.call(this);
      });
      it("has the expected columns", function () {
        let headers = findAll("thead th");
        expect(headers).to.have.length(2);
        expect(headers[0].textContent.trim()).to.equal("Name");
        expect(headers[1].textContent.trim()).to.equal("Finished?");
      });

      it("lists the raffle names", function () {
        let nameCells = findAll("tbody tr td:first-of-type");
        expect(nameCells[0].textContent.trim()).to.equal(
          unfinishedRaffle.get("name")
        );
        expect(nameCells[1].textContent.trim()).to.equal(
          finishedRaffle.get("name")
        );
      });

      it("lists the raffle completion status", function () {
        let finishedCells = findAll("tbody tr td:last-of-type");
        expect(finishedCells[0].textContent.trim()).to.equal("false");
        expect(finishedCells[1].textContent.trim()).to.equal("true");
      });
    });

    describe("clicking a row", function () {
      it("fires the view raffle action", async function (done) {
        this.set("viewRaffle", () => {
          done();
        });
        await doRender.call(this);

        await click("tbody tr:first-of-type");
      });

      it("includes the raffle clicked in the action call", async function (done) {
        this.set("viewRaffle", (raffleClicked) => {
          expect(raffleClicked).to.equal(unfinishedRaffle);
          done();
        });
        await doRender.call(this);

        await click("tbody tr:first-of-type");
      });
    });

    describe("localstorage reminder", function () {
      it("shows a warning that all data is local to this computer", async function () {
        await doRender.call(this);

        let helpText = find("[data-test-localstorage-reminder]").textContent;
        expect(helpText).to.include("stored on this computer");
        expect(helpText).to.include("save the results");
      });
    });
  });
});
