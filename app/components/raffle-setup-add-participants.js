import { Promise as EmberPromise } from "rsvp";
import { get } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@ember/component";
import { chain } from "lodash";

export default Component.extend({
  store: service(),

  didReceiveAttrs() {
    this._super(...arguments);

    let participants = this.get("raffle.participants");
    this.set(
      "nameList",
      participants.reduce((str, participant) => {
        return (str += `${participant.get("name")}\n`);
      }, "")
    );
  },

  nameList: null,
  gatherParticipants() {
    let names = chain(this.get("nameList"))
      .split("\n")
      .compact()
      .uniq()
      .value();

    let store = this.get("store");
    return EmberPromise.all(
      names.map((name) => {
        return store
          .query("participant", {
            name,
          })
          .then((result) => {
            let existingParticipant = get(result, "firstObject");
            if (!existingParticipant) {
              return store
                .createRecord("participant", {
                  name,
                })
                .save();
            } else {
              return existingParticipant;
            }
          });
      })
    );
  },
  associateParticipants(participants) {
    let raffle = this.get("raffle");
    raffle.set("participants", participants);
    return raffle.save();
  },
});
