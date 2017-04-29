import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('raffle-setup-confirm-participants', 'Integration | Component | raffle setup confirm participants', {
  integration: true
});

skip('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{raffle-setup-confirm-participants}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#raffle-setup-confirm-participants}}
      template block text
    {{/raffle-setup-confirm-participants}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
