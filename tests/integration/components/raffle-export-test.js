import { expect } from "chai";
import { describe, it, beforeEach } from "mocha";
import { setupRenderingTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { find, render } from "@ember/test-helpers";
import { make, makeList, manualSetup } from "ember-data-factory-guy";
import moment from "moment";

describe("Integration | Component | raffle export", function () {
  setupRenderingTest();

  beforeEach(function () {
    manualSetup(this);
  });

  async function doRender() {
    if (!this.get("raffle")) {
      this.set("raffle", make("raffle", "finished"));
    }

    await render(hbs`{{raffle-export raffle=raffle}}`);
  }

  function urlEncoded(message) {
    return window.encodeURIComponent(message);
  }

  describe("download button", function () {
    it("renders a link", async function () {
      await doRender.call(this);

      expect(find("[data-test-download-button]").tagName).to.equal("A");
    });

    describe("text content", function () {
      it("is a plain-text file", async function () {
        await doRender.call(this);

        expect(find("[data-test-download-button]").href).to.include(
          "data:text/plain;"
        );
      });

      it("is utf-8 encoded", async function () {
        await doRender.call(this);

        expect(find("[data-test-download-button]").href).to.include(
          "charset=utf-8"
        );
      });

      it("is URL safe", async function () {
        this.set(
          "raffle",
          make("raffle", {
            name: "Something with spaces",
          })
        );
        await doRender.call(this);
        expect(find("[data-test-download-button]").href).to.include(
          urlEncoded(" ")
        );
      });

      it("includes the raffle name", async function () {
        this.set(
          "raffle",
          make("raffle", {
            name: "My Raffle",
          })
        );
        await doRender.call(this);

        expect(find("[data-test-download-button]").href).to.include(
          urlEncoded("My Raffle")
        );
      });

      it("includes the number of participants", async function () {
        this.set(
          "raffle",
          make("raffle", {
            participants: makeList("participant", 3),
          })
        );
        await doRender.call(this);

        expect(find("[data-test-download-button]").href).to.include(
          urlEncoded("had 3 participants")
        );
      });

      it("includes the number of winners", async function () {
        this.set(
          "raffle",
          make("raffle", "finished", {
            winners: makeList("participant", 2),
          })
        );
        await doRender.call(this);

        expect(find("[data-test-download-button]").href).to.include(
          urlEncoded("2 winners")
        );
      });

      it("includes the drawing time", async function () {
        this.set(
          "raffle",
          make("raffle", "finished", {
            drawingEndTime: moment().subtract(2, "days").toDate(),
          })
        );
        await doRender.call(this);

        expect(find("[data-test-download-button]").href).to.include(
          urlEncoded(this.get("raffle.drawingEndTime"))
        );
      });

      it("lists all the winners", async function () {
        let winner1 = make("participant", {
          name: "Lucky Ducky 1",
        });
        let winner2 = make("participant", {
          name: "Lucky Ducky 2",
        });
        this.set(
          "raffle",
          make("raffle", "finished", {
            winners: [winner1, winner2],
          })
        );
        await doRender.call(this);

        let textContent = find("[data-test-download-button]").href;
        expect(textContent).to.include(
          urlEncoded("# Winners\n\nLucky Ducky 1\nLucky Ducky 2")
        );
      });

      it("lists all the participants including winners", async function () {
        let participant1 = make("participant", {
          name: "Lucky Ducky 1",
        });
        let participant2 = make("participant", {
          name: "Participant 2",
        });
        let participant3 = make("participant", {
          name: "Participant 3",
        });
        this.set(
          "raffle",
          make("raffle", "finished", {
            winners: [participant1],
            participants: [participant1, participant2, participant3],
          })
        );
        await doRender.call(this);

        let textContent = find("[data-test-download-button]").href;
        expect(textContent).to.include(
          urlEncoded(
            "# All Participants\n\nLucky Ducky 1\nParticipant 2\nParticipant 3"
          )
        );
      });
    });

    describe("download attribute", function () {
      it("it uses the underscored raffle name", async function () {
        this.set(
          "raffle",
          make("raffle", "finished", {
            name: "My Awesome Raffle",
          })
        );
        await doRender.call(this);

        expect(find("[data-test-download-button]").download).to.include(
          "my_awesome_raffle"
        );
      });

      it("is a text file", async function () {
        await doRender.call(this);

        expect(find("[data-test-download-button]").download).to.include(".txt");
      });
    });
  });
});
