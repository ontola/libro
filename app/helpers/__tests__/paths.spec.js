import path, { currentLocation } from '../paths';

describe('helpers', () => {
  describe('paths', () => {
    describe('currentLocation', () => {
      it('returns the correct path', () => {
        expect(currentLocation({
          hash: '',
          pathname: '/n',
          search: '?type=infinite',
        }).value).toEqual('https://argu.dev/n?type=infinite');
      });
    });

    describe('index', () => {
      it('returns the correct path', () => {
        expect(path.index()).toEqual('/');
      });
    });

    describe('signIn', () => {
      it('returns the correct path', () => {
        expect(path.signIn()).toEqual('/u/sign_in');
      });

      it('handles redirects', () => {
        expect(path.signIn('http://argu.co/redirect'))
          .toEqual('/u/sign_in?r=http%3A%2F%2Fargu.co%2Fredirect');
      });
    });
  });
});
