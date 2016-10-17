import { assert } from 'chai';
import moment from 'moment';

import {
  formatDate,
  durationToString,
  durationToHumanizedString,
} from '../date';

const TIMESTAMP = 1457172000000;
const DURATION_IN_MILLISECONDS = 6000;
const DURATION_AS_STRING = '6';
const DURATION_AS_HUMANIZED_STRING = 'een paar seconden';

describe('Datetime helpers', () => {
  it('date formats correctly', () => {
    assert.equal(
      formatDate(TIMESTAMP),
      moment(TIMESTAMP).format('lll'),
      'Date is not formatted correctly'
    );

    assert.equal(
      formatDate(),
      undefined,
      'Does not return undefined when no timestamp is given'
    );

    assert.equal(
      formatDate(TIMESTAMP, 'LLL'),
      moment(TIMESTAMP).format('LLL'),
      'Does not format custom format correctly'
    );
  });

  it('duration formats correctly', () => {
    assert.equal(
      durationToString(DURATION_IN_MILLISECONDS),
      DURATION_AS_STRING,
      'Duration is not formatted correctly'
    );
  });

  it('humanized duration formats correctly', () => {
    assert.equal(
      durationToHumanizedString(DURATION_IN_MILLISECONDS),
      DURATION_AS_HUMANIZED_STRING,
      'Duration is not formatted correctly'
    );
  });
});
