import { computed } from "@ember/object";
import { union } from "@ember/object/computed";
import Component from "@ember/component";
import Ember from "ember";
import { task, timeout } from "ember-concurrency";
import { round, sampleSize, shuffle, without } from "lodash";

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    this.set("losersRemainingToDrop", this.get("losers"));

    if (!Ember.testing) {
      this.get("dropLosers").perform();
    }
  },

  losersRemainingToDrop: null, // set as clone on didReceiveAttrs
  allParticipants: union("winners", "losers"),
  currentParticipants: computed("allParticipants.[]", function () {
    return shuffle(this.get("allParticipants"));
  }),

  dropLosers: task(function* () {
    let currentParticipants = this.get("currentParticipants");
    let losersRemainingToDrop = this.get("losersRemainingToDrop").toArray();
    let numToDrop = round(losersRemainingToDrop.get("length") * 0.2, 0) || 1;
    let losersToDropNow = sampleSize(losersRemainingToDrop, numToDrop);

    this.setProperties({
      losersRemainingToDrop: without(losersRemainingToDrop, ...losersToDropNow),
      currentParticipants: without(currentParticipants, ...losersToDropNow),
    });

    yield timeout(1000);

    if (this.get("losersRemainingToDrop.length") > 0) {
      this.get("dropLosers").perform();
    } else {
      this.sendAction("showWinners");
    }
  }),
});
