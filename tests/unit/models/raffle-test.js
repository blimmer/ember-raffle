import { A } from "@ember/array";
import { expect } from "chai";
import { describe, context, it, beforeEach } from "mocha";
import { setupTest } from "ember-mocha";
import { make, makeList, manualSetup } from "ember-data-factory-guy";
import moment from "moment";

describe("Unit | Model | raffle", function () {
  setupTest();

  beforeEach(function () {
    manualSetup(this);
  });

  describe("drawingComplete", function () {
    it("is true if drawingEndTime is set", function () {
      let model = this.owner.lookup("service:store").createRecord("raffle", {
        drawingEndTime: moment().toDate(),
      });
      expect(model.get("drawingComplete")).to.be.true;
    });

    it("is false if drawingEndTime is not set", function () {
      let model = this.owner.lookup("service:store").createRecord("raffle", {
        drawingEndTime: undefined,
      });
      expect(model.get("drawingComplete")).to.be.false;
    });
  });

  describe("losers", function () {
    context("when winners are chosen", function () {
      it("is the participants without the winners", function () {
        let participants = makeList("participant", 3);
        let model = this.owner.lookup("service:store").createRecord("raffle", {
          participants,
          winners: A([participants.get("firstObject")]),
        });

        let losers = model.get("losers");
        expect(losers.get("length")).to.equal(2);
        expect(losers.mapBy("id")).to.not.include(participants[0].id);
      });
    });

    context("when winners are not yet chosen", function () {
      it("returns an empty array", function () {
        let participants = makeList("participant", 3);
        let model = this.owner.lookup("service:store").createRecord("raffle", {
          participants,
        });

        expect(model.get("losers")).to.deep.equal([]);
      });
    });
  });

  describe("defaults", function () {
    describe("name", function () {
      it("has a default value", function () {
        let model = this.owner.lookup("service:store").createRecord("raffle");
        expect(model.get("name")).to.not.be.undefined;
      });

      it("includes the current time in the name", function () {
        this.sandbox
          .stub(moment.fn, "format")
          .withArgs("lll")
          .returns("Apr 30, 2017 3:04 PM");
        let model = this.owner.lookup("service:store").createRecord("raffle");
        expect(model.get("name")).to.include("Apr 30, 2017 3:04 PM");
      });
    });
  });

  describe("validations", function () {
    describe("participants", function () {
      it("is invalid without any participants", function () {
        let model = this.owner.lookup("service:store").createRecord("raffle");
        expect(model.get("validations.attrs.participants.isValid")).to.be.false;
      });

      it("is invalid when at least one paricipant is present", function () {
        let participant = make("participant");
        let model = this.owner.lookup("service:store").createRecord("raffle", {
          participants: [participant],
        });
        expect(model.get("validations.attrs.participants.isValid")).to.be.true;
      });
    });

    describe("name", function () {
      it("is invalid without a name", function () {
        let model = this.owner.lookup("service:store").createRecord("raffle", {
          name: "",
        });
        expect(model.get("validations.attrs.name.isValid")).to.be.false;
      });

      it("is valid with a name", function () {
        let model = this.owner.lookup("service:store").createRecord("raffle", {
          name: "My Raffle",
        });
        expect(model.get("validations.attrs.name.isValid")).to.be.true;
      });
    });

    describe("number of winners", function () {
      it("cannot be negative", function () {
        let model = this.owner.lookup("service:store").createRecord("raffle", {
          numberOfWinners: -1,
        });
        expect(model.get("validations.attrs.numberOfWinners.isValid")).to.be
          .false;
      });

      it("cannot be zero", function () {
        let model = this.owner.lookup("service:store").createRecord("raffle", {
          numberOfWinners: 0,
        });
        expect(model.get("validations.attrs.numberOfWinners.isValid")).to.be
          .false;
      });

      it("cannot be greater than the number of participants", function () {
        let participant = make("participant");
        let model = this.owner.lookup("service:store").createRecord("raffle", {
          participants: [participant],
          numberOfWinners: 2,
        });
        expect(model.get("validations.attrs.numberOfWinners.isValid")).to.be
          .false;
      });

      it("is not invalid when participants are not set", function () {
        let model = this.owner.lookup("service:store").createRecord("raffle", {
          numberOfWinners: 100,
        });
        expect(model.get("validations.attrs.numberOfWinners.isValid")).to.be
          .true;
      });

      it("is valid when greater than zero and less than the number of participants", function () {
        let participants = makeList("participant", 3);
        let model = this.owner.lookup("service:store").createRecord("raffle", {
          participants: participants,
          numberOfWinners: 2,
        });
        expect(model.get("validations.attrs.numberOfWinners.isValid")).to.be
          .true;
      });
    });
  });
});
