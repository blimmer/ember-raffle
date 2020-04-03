import { reads } from "@ember/object/computed";
import { inject as service } from "@ember/service";
import Component from "@ember/component";
import { translationMacro as t } from "ember-intl";

export default Component.extend({
  intl: service(),
  raffleNotSetup: reads("raffle.validations.isInvalid"),
  completeSetupTooltip: t("raffleInfo.completeSetupTooltip"),
});
