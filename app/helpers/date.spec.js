import { assert } from 'chai';
import moment from 'moment';
import { formatDate, durationToString } from './date';

moment.locale('nl');

const TIMESTAMP = 1457172000000;
const expectedOutput = '5 mrt. 2016 11:00';

describe('Date', () => {
  it('format correctly', () => {
    assert.equal(formatDate(TIMESTAMP), expectedOutput, 'Date is not formatted correctly');
  });
});

const DURATION_IN_MILLISECONDS = 6000;
const durationAsString = '6';

describe('Duration', () => {
  it('format correctly', () => {
    assert.equal(
      durationToString(DURATION_IN_MILLISECONDS),
      durationAsString,
      'Date is not formatted correctly'
    );
  });
});
