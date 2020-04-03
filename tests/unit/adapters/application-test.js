import { expect } from "chai";
import { describe, context, it } from "mocha";
import { setupTest } from "ember-mocha";

describe("Unit | Adapter | application", function () {
  setupTest();

  context("localstorage disabled", function () {
    it("shows an alert", function () {
      let alertStub = this.sandbox.stub(window, "alert");
      let subject = this.owner.lookup("adapter:application");
      subject.trigger("persistenceUnavailable");

      expect(alertStub.calledOnce).to.be.true;
      expect(alertStub.getCall(0).args[0].toString()).to.include(
        "data will not be persisted"
      );
    });
  });
});
