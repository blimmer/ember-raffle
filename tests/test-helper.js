import Application from "../app";
import config from "../config/environment";
import { setApplication } from "@ember/test-helpers";
import { start } from "ember-mocha";
import { before, afterEach } from "mocha";
import Component from "@ember/component";
import { dasherize } from "@ember/string";
import Mixin from "@ember/object/mixin";
import { get, computed } from "@ember/object";
import { registerWarnHandler } from "@ember/debug";
import sinon from "sinon";

before(function () {
  registerWarnHandler((_1, opts, next) => {
    if (get(opts, "id") !== "ember-test-selectors.empty-tag-name") {
      next(...arguments);
    }
  });
  let ComponentTestingMixin = Mixin.create({
    "data-test-component": computed(function () {
      let [, componentName] = this._debugContainerKey
        .replace(/\//g, "-")
        .split(":");
      return dasherize(componentName);
    }),
  });
  Component.reopen(ComponentTestingMixin);

  this.sandbox = sinon.sandbox.create();
});

afterEach(function () {
  this.sandbox.restore();
  localStorage.removeItem("raffle"); // clear all models
});

setApplication(Application.create(config.APP));

start();
