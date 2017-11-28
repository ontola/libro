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
    expect(setRecord(initialState, record, record.id))
      .toEqual(expectedState(record));
    expect(setRecord(initialState, record))
      .toEqual(expectedState(record));
  });

  it('deletes a record', () => {
    expect(deleteRecord(setRecord(initialState, record, record.id), record.id))
      .toEqual(initialState);
  });

  it('toggles a value', () => {
    expect(toggleValue(setRecord(initialState, record, record.id), record.id, 'individual'))
      .toEqual(expectedState(recordToggled));
  });

  describe('increaseValue', () => {
    const subject = new Map({ counter: 0 });
    const expected = new Map({ counter: 1 });

    it('increments the value', () => {
      expect(increaseValue(subject, 'counter'))
        .toEqual(expected);
    });
  });
});
