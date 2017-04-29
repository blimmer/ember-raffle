import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('confirm-participants');
  this.route('ready-for-drawing');
  this.route('drawing');
  this.route('winners');
  this.route('setup-drawing');
  this.route('raffles', function() {
    this.route('raffle', { path: ':raffle_id' });
  });
});

export default Router;
