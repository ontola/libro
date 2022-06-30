/**
 * @jest-environment jsdom
 */

import {
  authenticityHeader,
  jsonHeader,
  safeCredentials,
} from '../dom';

describe('helpers', () => {
  describe('dom', () => {
    describe('authenticityHeader', () => {
      it('should override the requested-with header', () => {
        const obj = authenticityHeader({ 'X-Requested-With': 'wrong' })['X-Requested-With'];
        expect(obj).toEqual('XMLHttpRequest');
      });
    });

    describe('jsonHeader', () => {
      it('should override the accept header', () => {
        expect(jsonHeader({ Accept: 'wrong' }).Accept).toEqual('application/vnd.api+json');
      });

      it('should override the accept content type', () => {
        expect(jsonHeader({ 'Content-Type': 'wrong' })['Content-Type']).toEqual('application/json');
      });
    });

    describe('safeCredentials', () => {
      it('should set credentials', () => {
        expect(safeCredentials().credentials).toEqual('include');
      });

      it('should set the mode', () => {
        expect(safeCredentials().mode).toEqual('same-origin');
      });

      it('should set the headers', () => {
        const siteName = window.document.createElement('meta');
        siteName.content = 'https://app.argu.co/freetown';
        siteName.name = 'website';
        window.document.head.appendChild(siteName);

        expect(safeCredentials({ headers: {} }).headers).toEqual({
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/json',
          'Website-Iri': 'https://app.argu.co/freetown',
          'X-CSRF-Token': undefined,
          'X-Requested-With': 'XMLHttpRequest',
        });
      });
    });

  });
});
