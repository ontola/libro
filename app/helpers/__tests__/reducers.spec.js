import {
  deleteRecord,
  setRecord,
  toggleValue,
  updateRecordValue,
} from '../reducers';

const createTestRecord = (record) => ({
  id: '',
  individual: true,
  option: '',
  ...record,
});

const record = createTestRecord({
  id: '1',
  individual: true,
  option: 'pro',
});

const recordToggled = createTestRecord({
  id: '1',
  individual: false,
  option: 'pro',
});

const initialState = {
  items: {},
};

const expectedState = (rec) => ({
  items: ({
    [rec.id]: rec,
  }),
});

describe('helpers', () => {
  describe('reducers', () => {
    describe('setRecord', () => {
      it('sets a record', () => {
        expect(setRecord(initialState, record, record.id)).toEqual(expectedState(record));
      });

      it('sets a record without id', () => {
        expect(setRecord(initialState, record)).toEqual(expectedState(record));
      });
    });

    describe('deleteRecord', () => {
      it('deletes a record', () => {
        expect(deleteRecord(setRecord(initialState, record, record.id), record.id))
          .toEqual(initialState);
      });
    });

    describe('toggleValue', () => {
      it('toggles a value', () => {
        expect(toggleValue(setRecord(initialState, record, record.id), record.id, 'individual'))
          .toEqual(expectedState(recordToggled));
      });
    });

    describe('updateRecordValue', () => {
      it('toggles a value', () => {
        expect(updateRecordValue(expectedState(record), record.id, 'individual', false))
          .toEqual(expectedState(recordToggled));
      });
    });
  });
});
