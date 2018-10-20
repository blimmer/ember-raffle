import Component from '@ember/component';
import { dasherize } from '@ember/string';
import Mixin from '@ember/object/mixin';
import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';
import { before, afterEach } from 'mocha';
import sinon from 'sinon';

setResolver(resolver);

before(function() {
  let ComponentTestingMixin = Mixin.create({
    init() {
      this._super(...arguments);

      if (this.tagName !== '') {
        let componentName = dasherize(this._debugContainerKey.replace(/\//g, '-').split(':')[1]);
        this.set('data-test-component', componentName);
        let dataTestAttr = ['data-test-component'];
        this.attributeBindings = this.attributeBindings ? this.attributeBindings.concat(dataTestAttr) : dataTestAttr;
      }
    }
  });
  Component.reopen(ComponentTestingMixin);

  this.sandbox = sinon.sandbox.create();
});

afterEach(function() {
  this.sandbox.restore();
  localStorage.removeItem('raffle') // clear all models
});
