import Ember from 'ember';
import { expect } from 'chai';
import { describe, context, it, beforeEach } from 'mocha';
import { setupModelTest } from 'ember-mocha';
import { make, makeList, manualSetup } from 'ember-data-factory-guy';
import moment from 'moment';

describe('Unit | Model | raffle', function() {
  setupModelTest('raffle', {
    // Specify the other units that are required for this test.
    needs: [
      'model:participant',
      'validator:length',
      'validator:presence',
      'validator:number',
    ]
  });

  beforeEach(function() {
    manualSetup(this.container);
  });

  describe('drawingComplete', function() {
    it('is true if drawingEndTime is set', function() {
      let model = this.subject({ drawingEndTime: moment().toDate() });
      expect(model.get('drawingComplete')).to.be.true;
    });

    it('is false if drawingEndTime is not set', function() {
      let model = this.subject({ drawingEndTime: undefined });
      expect(model.get('drawingComplete')).to.be.false;
    });
  });

  describe('losers', function() {
    context('when winners are chosen', function() {
      // .without seems to not like this - need to figure it out
      it.skip('is the participants without the winners', function() {
        let participants = makeList('participant', 3);
        let model = this.subject({
          participants,
          winners: Ember.A([participants.get('firstObject')]),
        });

        let losers = model.get('losers');
        expect(losers.get('length')).to.equal(2);
        expect(losers).to.not.include(participants[0]);
      });
    });

    context('when winners are not yet chosen', function() {
      it('returns an empty array', function() {
        let participants = makeList('participant', 3);
        let model = this.subject({ participants });

        expect(model.get('losers')).to.deep.equal([]);
      });
    });
  });

  describe('defaults', function() {
    describe('name', function() {
      it('has a default value', function() {
        let model = this.subject();
        expect(model.get('name')).to.not.be.undefined;
      });

      it('includes the current time in the name', function() {
        this.sandbox.stub(moment.fn, 'format').withArgs('lll').returns('Apr 30, 2017 3:04 PM');
        let model = this.subject();
        expect(model.get('name')).to.include('Apr 30, 2017 3:04 PM');
      });
    });
  });

  describe('validations', function() {
    describe('participants', function() {
      it('is invalid without any participants', function() {
        let model = this.subject();
        expect(model.get('validations.attrs.participants.isValid')).to.be.false;
      });

      it('is invalid when at least one paricipant is present', function() {
        let participant = make('participant');
        let model = this.subject({ participants: [participant] });
        expect(model.get('validations.attrs.participants.isValid')).to.be.true;
      });
    });

    describe('name', function() {
      it('is invalid without a name', function() {
        let model = this.subject({ name: '' });
        expect(model.get('validations.attrs.name.isValid')).to.be.false;
      });

      it('is valid with a name', function() {
        let model = this.subject({ name: 'My Raffle' });
        expect(model.get('validations.attrs.name.isValid')).to.be.true;
      });
    });

    describe('number of winners', function() {
      it('cannot be negative', function() {
        let model = this.subject({ numberOfWinners: -1 });
        expect(model.get('validations.attrs.numberOfWinners.isValid')).to.be.false;
      });

      it('cannot be zero', function() {
        let model = this.subject({ numberOfWinners: 0 });
        expect(model.get('validations.attrs.numberOfWinners.isValid')).to.be.false;
      });

      it('cannot be greater than the number of participants', function() {
        let participant = make('participant');
        let model = this.subject({ participants: [participant], numberOfWinners: 2 });
        expect(model.get('validations.attrs.numberOfWinners.isValid')).to.be.false;
      });

      it('is not invalid when participants are not set', function() {
        let model = this.subject({ numberOfWinners: 100 });
        expect(model.get('validations.attrs.numberOfWinners.isValid')).to.be.true;
      });

      it('is valid when greater than zero and less than the number of participants', function() {
        let participants = makeList('participant', 3);
        let model = this.subject({ participants: participants, numberOfWinners: 2 });
        expect(model.get('validations.attrs.numberOfWinners.isValid')).to.be.true;
      });
    });
  });
});
