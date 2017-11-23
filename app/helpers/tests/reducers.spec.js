import { assert } from 'chai';
import { Map, Record } from 'immutable';

import {
  deleteRecord,
  increaseValue,
  setRecord,
  toggleValue,
} from '../reducers';

const TestRecord = new Record({
  id: '',
  individual: true,
  option: '',
});

const record = new TestRecord({
  id: '1',
  individual: true,
  option: 'pro',
});

const recordToggled = new TestRecord({
  id: '1',
  individual: false,
  option: 'pro',
});

const initialState = new Map({
  items: new Map(),
});

const expectedState = rec => new Map({
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
      'Value not toggled'
    );
  });

  it('increases a value by 1', () => {
    const state = new Map({ counter: 0 });
    const expected = new Map({ counter: 1 });

    assert.deepEqual(
      increaseValue(state, 'counter'),
      expected,
      'Value not increased by one'
    );
  });
});
