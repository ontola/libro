import { assert } from 'chai';
import { Map } from 'immutable';

import {
  deleteRecord,
  setRecord,
  toggleValue,
} from 'helpers/reducers';

import Vote from 'models/Vote';

const record = new Vote({ id: '1', individual: true, option: 'pro' });
const recordToggled = new Vote({ id: '1', individual: false, option: 'pro' });

const initialState = new Map({
  items: new Map(),
});

const expectedState = (rec) => new Map({
  items: new Map({
    [rec.id]: rec,
  }),
});

describe('Reducer helpers', () => {
  it('sets a record', () => {
    assert.deepEqual(
      setRecord(initialState, record, record.id),
      expectedState(record),
      'Record not set correctly'
    );
    assert.deepEqual(
      setRecord(initialState, record),
      expectedState(record),
      'Record not set correctly'
    );
  });

  it('deletes a record', () => {
    assert.deepEqual(
      deleteRecord(setRecord(initialState, record, record.id), record.id),
      initialState,
      'Record not deleted'
    );
  });

  it('toggles a value', () => {
    assert.deepEqual(
      toggleValue(setRecord(initialState, record, record.id), record.id, 'individual'),
      expectedState(recordToggled),
      'Record not deleted'
    );
  });
});
