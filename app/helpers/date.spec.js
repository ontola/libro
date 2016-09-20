import { assert } from 'chai';
import { formatDate, durationToString } from './date';

const TIMESTAMP = 1457172000000;
const expectedOutput = '05-03-2016';

describe('Date', () => {
  it('format correctly', () => {
    assert.equal(formatDate(TIMESTAMP), expectedOutput, 'Date is not formatted correctly');
  });
});

const DURATION = 60;
const durationAsString = '1:00';

describe('Duration', () => {
  it('format correctly', () => {
    assert.equal(durationToString(DURATION), durationAsString, 'Date is not formatted correctly');
  });
});
