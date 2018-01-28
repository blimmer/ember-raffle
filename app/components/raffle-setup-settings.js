import Component from '@ember/component';

export default Component.extend({
  saveRaffleSettings() {
    let raffle = this.get('raffle');
    raffle.save().then(() => {
      this.sendAction('showRaffleSetupInfo', raffle);
    });
  }
});
