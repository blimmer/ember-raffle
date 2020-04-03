import { computed } from "@ember/object";
import Component from "@ember/component";
import Table from "ember-light-table";

export default Component.extend({
  table: computed("participants", function () {
    return Table.create({
      columns: this.get("columns"),
      rows: this.get("participants"),
    });
  }),

  columns: computed(function () {
    return [
      {
        label: "Name",
        valuePath: "name",
      },
    ];
  }),
});
