import { on } from "@ember/object/evented";
import { inject as service } from "@ember/service";
import LSAdapter from "ember-localstorage-adapter";

export default LSAdapter.extend({
  i18n: service(),
  namespace: "raffle",

  _warnOnPersistenceUnavailable: on("persistenceUnavailable", function () {
    window.alert(this.get("i18n").t("adapter.localstorageDisabled"));
  }),
});
