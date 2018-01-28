import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { translationMacro as t } from "ember-i18n";

export default Component.extend({
  i18n: service(),
  raffleNotSetup: reads('raffle.validations.isInvalid'),
  completeSetupTooltip: t('raffleInfo.completeSetupTooltip'),
});
