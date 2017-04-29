import { moduleForModel, test } from 'ember-qunit';

moduleForModel('raffle', 'Unit | Model | raffle', {
  // Specify the other units that are required for this test.
  needs: [
    'model:participant',
    'validator:length',
    'validator:presence',
    'validator:number'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
