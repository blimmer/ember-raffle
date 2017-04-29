import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  raffleNotSetup: Ember.computed.reads('raffle.validations.isInvalid'),
  completeSetupTooltip: t('raffleInfo.completeSetupTooltip'),
});
