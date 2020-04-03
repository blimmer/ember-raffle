import { computed, getProperties } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@ember/component";

export default Component.extend({
  classNames: ["ui", "center", "aligned", "basic", "segment"],
  i18n: service(),

  textFileData: computed("raffle.id", function () {
    let raffle = this.get("raffle");
    let { name, drawingEndTime, participants, winners } = getProperties(
      raffle,
      "name",
      "drawingEndTime",
      "participants",
      "winners"
    );

    let string = this.get("i18n").t("raffleExport.textFileTemplate", {
      raffleName: name,
      numParticipants: participants.get("length"),
      numWinners: winners.get("length"),
      drawingEndTime,
      winners: this.formatParticipantList(winners),
      participants: this.formatParticipantList(participants),
    });
    return window.encodeURIComponent(string.toString());
  }),

  formatParticipantList(participants) {
    return participants.reduce(function (str, participant) {
      return `${str}\n${participant.get("name")}`;
    }, "");
  },
});
