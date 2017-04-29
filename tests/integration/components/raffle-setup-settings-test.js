import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('raffle-setup-settings', 'Integration | Component | raffle setup settings', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{raffle-setup-settings}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#raffle-setup-settings}}
      template block text
    {{/raffle-setup-settings}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
