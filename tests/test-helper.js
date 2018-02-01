import Component from '@ember/component';
import { dasherize } from '@ember/string';
import Mixin from '@ember/object/mixin';
import { get, computed } from '@ember/object';
import { registerWarnHandler } from '@ember/debug';
import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';
import { before, afterEach } from 'mocha';
import sinon from 'sinon';

setResolver(resolver);

before(function() {
  registerWarnHandler((_1, opts, next) => {
    if (get(opts, 'id') !== "ember-test-selectors.empty-tag-name") {
      next(...arguments);
    }
  });
  let ComponentTestingMixin = Mixin.create({
    'data-test-component': computed(function() {
      let [, componentName] = this._debugContainerKey.replace(/\//g, '-').split(':');
      return dasherize(componentName);
    })
  });
  Component.reopen(ComponentTestingMixin);

  this.sandbox = sinon.sandbox.create();
});

afterEach(function() {
  this.sandbox.restore();
  localStorage.removeItem('raffle') // clear all models
});
