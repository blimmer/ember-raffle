import Ember from 'ember';

export default Ember.Component.extend({
  saveRaffleSettings() {
    let raffle = this.get('raffle');
    raffle.save().then(() => {
      this.sendAction('showRaffleSetupInfo', raffle);
    });
  }
});
