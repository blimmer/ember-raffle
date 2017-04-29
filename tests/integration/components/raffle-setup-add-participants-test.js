import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('raffle-setup-add-participants', 'Integration | Component | raffle setup add participants', {
  integration: true
});

skip('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{raffle-setup-add-participants}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#raffle-setup-add-participants}}
      template block text
    {{/raffle-setup-add-participants}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
