import { createNS } from '@ontologies/core';

import path, { currentLocation } from '../paths';

function getCurrentLocation(websiteIRI: string, pathname = '', search = '', hash = '') {
  const basePath = new URL(websiteIRI).pathname;
  const ns = { appSlashless: createNS(websiteIRI) };
  return currentLocation(
    {
      hash,
      pathname,
      search,
    } as Location,
    false,
    basePath,
    ns,
  ).value;
}

describe('helpers', () => {
  describe('paths', () => {
    describe('currentLocation', () => {
      describe('root site', () => {
        const websiteIRI = 'https://demogemeente.nl';

        it('handles root resource', () => {
          expect(getCurrentLocation(websiteIRI))
            .toEqual('https://demogemeente.nl');
        });

        it('handles child resource', () => {
          expect(getCurrentLocation(websiteIRI, '/resource/5'))
            .toEqual('https://demogemeente.nl/resource/5');
        });
      });

      describe('site with path', () => {
        const websiteIRI = 'https://app.argu.co/utrecht';

        it('handles root resource', () => {
          expect(getCurrentLocation(websiteIRI))
            .toEqual('https://app.argu.co/utrecht');
        });

        it('handles child resource', () => {
          expect(getCurrentLocation(websiteIRI, '/resource/5'))
            .toEqual('https://app.argu.co/utrecht/resource/5');
        });

        it('handles child resource with search', () => {
          expect(getCurrentLocation(websiteIRI, '/n', '?type=infinite'))
            .toEqual('https://app.argu.co/utrecht/n?type=infinite');
        });
      });
    });

    describe('index', () => {
      it('returns the correct path', () => {
        expect(path.index()).toEqual('/');
      });
    });

    describe('signIn', () => {
      it('returns the correct path', () => {
        expect(path.signIn()).toEqual('https://app.argu.co/freetown/u/sign_in');
      });

      it('handles redirects', () => {
        expect(path.signIn('http://argu.co/redirect'))
          .toEqual('https://app.argu.co/freetown/u/sign_in?r=http%3A%2F%2Fargu.co%2Fredirect');
      });
    });
  });
});
