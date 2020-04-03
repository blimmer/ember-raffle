import { computed } from "@ember/object";
import Component from "@ember/component";
import Table from "ember-light-table";

export default Component.extend({
  table: computed("participants", function () {
    return new Table(this.get("columns"), this.get("participants"));
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
