import { inject as service } from "@ember/service";
import { dasherize } from "@ember/string";
import { computed } from "@ember/object";
import Controller from "@ember/controller";

export default Controller.extend({
  router: service(),
  routeCssName: computed("router.currentRouteName", function () {
    return dasherize(this.get("router.currentRouteName"));
  }),
});
