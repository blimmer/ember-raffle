import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('raffle-setup-info', 'Integration | Component | raffle setup info', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{raffle-setup-info}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#raffle-setup-info}}
      template block text
    {{/raffle-setup-info}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
