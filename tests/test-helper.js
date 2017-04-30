import Ember from 'ember';
import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';
import { before, afterEach } from 'mocha';

setResolver(resolver);

before(function() {
  // There has got to be a better way!
  // https://github.com/simplabs/ember-test-selectors/issues/106
  let realEmberWarn = Ember.warn;
  Ember.warn = function(_1, _2, opts) {
    if (Ember.get(opts, 'id') !== "ember-test-selectors.empty-tag-name") {
      realEmberWarn(...arguments);
    }
  }
  let ComponentTestingMixin = Ember.Mixin.create({
    'data-test-component': Ember.computed(function() {
      let [, componentName] = this._debugContainerKey.replace(/\//g, '-').split(':');
      return Ember.String.dasherize(componentName);
    })
  });
  Ember.Component.reopen(ComponentTestingMixin);
});

afterEach(function() {
  localStorage.removeItem('raffle') // clear all models
});
