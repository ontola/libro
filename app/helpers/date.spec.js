import { assert } from 'chai';
import { formatDate, durationToString } from './date';
import moment from 'moment';

const TIMESTAMP = 1457172000000;

describe('Date', () => {
  it('format correctly', () => {
    assert.equal(
      formatDate(TIMESTAMP),
      moment(TIMESTAMP).format('lll'),
      'Date is not formatted correctly'
    );
    assert.equal(formatDate(), undefined, 'Does not return undefined when no timestamp is given');
  });
});

const DURATION_IN_MILLISECONDS = 6000;
const durationAsString = '6';

describe('Duration', () => {
  it('format correctly', () => {
    assert.equal(
      durationToString(DURATION_IN_MILLISECONDS),
      durationAsString,
      'Duration is not formatted correctly'
    );
  });
});
