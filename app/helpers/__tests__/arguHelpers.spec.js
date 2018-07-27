import HttpStatus from 'http-status-codes';
import React from 'react';

import {
  authenticityHeader,
  errorMessageForStatus,
  image,
  json,
  jsonHeader,
  safeCredentials,
  statusSuccess,
  tryLogin,
} from '../arguHelpers';

describe('helpers', () => {
  describe('arguHelper', () => {
    describe('authenticityHeader', () => {
      it('should override the requested-with header', () => {
        const obj = authenticityHeader({ 'X-Requested-With': 'wrong' })['X-Requested-With'];
        expect(obj).toEqual('XMLHttpRequest');
      });
    });

    describe('errorMessageForStatus', () => {
      [
        HttpStatus.UNAUTHORIZED,
        HttpStatus.NOT_FOUND,
        HttpStatus.TOO_MANY_REQUESTS,
        HttpStatus.INTERNAL_SERVER_ERROR,
      ].forEach((status) => {
        it(`should handle status ${status}`, () => {
          const err = errorMessageForStatus(status);
          expect(err.i18nString).toEqual(`errors.status.${status}`);
          expect(err.severity).toEqual('error');
          expect(err.type).toEqual('alert');
        });
      });

      it('should handle status 0', () => {
        const err = errorMessageForStatus(0);
        expect(err.fallback).toEqual('');
        expect(err.i18nString).toEqual(undefined);
        expect(err.severity).toEqual('');
        expect(err.type).toEqual('none');
      });

      it('should not error for other statuses', () => {
        const err = errorMessageForStatus(HttpStatus.OK);
        expect(err.fallback).toEqual(undefined);
        expect(err.i18nString).toEqual(undefined);
        expect(err.severity).toEqual('');
        expect(err.type).toEqual('none');
      });
    });

    describe('image', () => {
      const imgProp = {
        image: {
          className: 'class name',
          title: 'Title',
          url: 'URL',
        },
      };
      const faProp = {
        fa: 'fa-address-book',
      };
      const imgMerged = Object.assign({}, imgProp, faProp);
      const expectedImage = React.createElement('img', {
        alt: imgProp.image.title,
        className: imgProp.image.className,
        src: imgProp.image.url,
      });

      it('should return an img element', () => {
        expect(image(imgProp)).toEqual(expectedImage);
      });

      it('should return a fontawesome element', () => {
        expect(image(faProp)).toEqual(React.createElement('span', {
          className: 'fa fa-address-book',
        }));
      });

      it('should prefer images', () => {
        expect(image(imgMerged)).toEqual(expectedImage);
      });

      it('should default undefined', () => {
        expect(image({})).toEqual(undefined);
      });
    });

    describe('json', () => {
      it('should not process undefined responses', () => {
        expect(json()).resolves.toBeUndefined();
      });

      it('should not process 204 responses', () => {
        expect(json({ status: HttpStatus.NO_CONTENT })).resolves.toBeUndefined();
      });

      it('should not process 304 responses', () => {
        expect(json({ status: HttpStatus.NOT_MODIFIED })).resolves.toBeUndefined();
      });

      it('should resolve responses to json', () => {
        const jsonPromise = jest.fn().mockReturnValueOnce(Promise.resolve('{}'));
        expect(json({ json: jsonPromise, status: HttpStatus.OK })).resolves.toEqual('{}');
        expect(jsonPromise).toHaveBeenCalled();
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
        expect(safeCredentials({ headers: {} }).headers).toEqual({
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': null,
          'X-Requested-With': 'XMLHttpRequest',
        });
      });
    });

    describe('statusSuccess', () => {
      it('should resolve success statuses', () => {
        [
          HttpStatus.OK,
          HttpStatus.CREATED,
          HttpStatus.ACCEPTED,
          HttpStatus.NOT_MODIFIED,
        ].forEach((status) => {
          const response = { status };
          expect(statusSuccess(response)).resolves.toEqual(response);
        });
      });

      it('should reject error statuses', () => {
        [
          HttpStatus.MULTIPLE_CHOICES,
          HttpStatus.SEE_OTHER,
          HttpStatus.USE_PROXY,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ].forEach((status) => {
          const response = { status };
          expect(statusSuccess(response)).rejects.toEqual(response);
        });
      });
    });

    describe('tryLogin', () => {
      describe('when unauthorized', () => {
        it('should redirect the user if accepted', () => {
          const response = { status: HttpStatus.UNAUTHORIZED };
          global.confirm = () => true;
          expect(tryLogin(response)).rejects.toBe(response);
          global.confirm = undefined;
        });

        it('should reject with error if cancelled', () => {
          const response = { status: HttpStatus.UNAUTHORIZED };
          global.confirm = () => false;
          expect(tryLogin(response)).rejects.toBe('Je moet ingelogd zijn voor deze actie.');
          global.confirm = () => undefined;
        });
      });

      it('should pass other responses', () => {
        const response = { status: HttpStatus.OK };
        expect(tryLogin(response)).rejects.toBe(response);
      });
    });
  });
});
