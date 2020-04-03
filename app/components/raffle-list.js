import { computed } from "@ember/object";
import Component from "@ember/component";
import Table from "ember-light-table";

export default Component.extend({
  columns: computed(function () {
    return [
      {
        label: "Name",
        valuePath: "name",
      },
      {
        label: "Finished?",
        valuePath: "drawingComplete",
      },
    ];
  }),

  table: computed("raffles.[]", function () {
    return Table.create({
      columns: this.get("columns"),
      rows: this.get("raffles"),
    });
  }),

  rowClicked(row) {
    this.sendAction("viewRaffle", row.content);
  },
});
