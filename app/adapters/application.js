import { on } from "@ember/object/evented";
import { inject as service } from "@ember/service";
import LSAdapter from "ember-localstorage-adapter";

export default LSAdapter.extend({
  intl: service(),
  namespace: "raffle",

  _warnOnPersistenceUnavailable: on("persistenceUnavailable", function () {
    window.alert(this.get("intl").t("adapter.localstorageDisabled"));
  }),
});
