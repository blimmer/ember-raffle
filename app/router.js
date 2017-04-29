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
});

export default Router;
