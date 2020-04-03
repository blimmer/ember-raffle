import { A } from "@ember/array";
import FactoryGuy from "ember-data-factory-guy";
import moment from "moment";

FactoryGuy.define("raffle", {
  default: {},
  traits: {
    withParticipants: {
      participants: FactoryGuy.hasMany("participant", 2),
    },
    finished: {
      participants: FactoryGuy.hasMany("participant", 2),
      drawingEndTime: () => moment().subtract(2, "days").toDate(),
      winners: (obj) => {
        return A([obj.participants[0]]);
      },
    },
  },
});
