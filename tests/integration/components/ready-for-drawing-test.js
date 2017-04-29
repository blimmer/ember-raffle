import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ready-for-drawing', 'Integration | Component | ready for drawing', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ready-for-drawing}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ready-for-drawing}}
      template block text
    {{/ready-for-drawing}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
