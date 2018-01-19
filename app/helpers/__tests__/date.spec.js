import moment from 'moment';

import {
  durationToHumanizedString,
  durationToString,
  formatDate,
  formatDateCalendar,
} from '../date';

const TIMESTAMP = 1457172000000;
const DURATION_IN_MS = 6000;
const DURATION_AS_STRING = '6';
const DURATION_AS_HUMANIZED_STRING = 'een paar seconden';

describe('helpers', () => {
  describe('date', () => {
    describe('formatDate', () => {
      it('formats correctly', () => {
        expect(formatDate(TIMESTAMP)).toEqual(moment(TIMESTAMP).format('lll'));
      });

      it('handles undefined values', () => {
        expect(formatDate()).toBeUndefined();
      });

      it('handles format arguments', () => {
        expect(formatDate(TIMESTAMP, 'LLL')).toEqual(moment(TIMESTAMP).format('LLL'));
      });
    });

    describe('formatDateCalendar', () => {
      it('formats correctly', () => {
        expect(formatDateCalendar(TIMESTAMP, undefined)).toEqual('05-03-2016');
      });

      it('handles undefined values', () => {
        expect(formatDateCalendar(undefined, undefined)).toBeUndefined();
      });
    });


    describe('durationToString', () => {
      it('formats correctly', () => {
        expect(durationToString(DURATION_IN_MS)).toEqual(DURATION_AS_STRING);
      });
    });

    describe('durationToHumanizedString', () => {
      it('formats correctly', () => {
        expect(durationToHumanizedString(DURATION_IN_MS)).toEqual(DURATION_AS_HUMANIZED_STRING);
      });
    });
  });
});
