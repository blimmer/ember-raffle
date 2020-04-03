import { expect } from "chai";
import { describe, it } from "mocha";
import { setupTest } from "ember-mocha";

describe("Unit | Model | participant", function () {
  setupTest();

  describe("validations", function () {
    describe("name", function () {
      it("is invalid without a name", function () {
        let model = this.owner
          .lookup("service:store")
          .createRecord("participant", {
            name: null,
          });
        expect(model.get("validations.attrs.name.isValid")).to.be.false;
      });

      it("is valid when a name is present", function () {
        let model = this.owner
          .lookup("service:store")
          .createRecord("participant", {
            name: "Lucky Ducky",
          });
        expect(model.get("validations.attrs.name.isValid")).to.be.true;
      });
    });
  });
});
