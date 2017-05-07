import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';

describe('Unit | Model | participant', function() {
  setupModelTest('participant', {
    // Specify the other units that are required for this test.
    needs: [
      'model:raffle',
      'validator:presence',
    ]
  });

  describe('validations', function() {
    describe('name', function() {
      it('is invalid without a name', function() {
        let model = this.subject({ name: null });
        expect(model.get('validations.attrs.name.isValid')).to.be.false;
      });

      it('is valid when a name is present', function() {
        let model = this.subject({ name: 'Lucky Ducky' });
        expect(model.get('validations.attrs.name.isValid')).to.be.true;
      });
    });
  });
});
