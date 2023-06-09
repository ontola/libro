import { createCurrentURL, retrievePath } from '../iris';

describe('helpers', () => {
  describe('iris', () => {
    describe('retrievePath', () => {
      it('should return the root', () => {
        expect(retrievePath('http://example.com')).toEqual('/');
      });

      it('should return the path', () => {
        expect(retrievePath('http://example.com/4')).toEqual('/4');
      });

      it('should return nested paths', () => {
        expect(retrievePath('http://example.com/resources/4')).toEqual('/resources/4');
      });

      it('should return query parameters', () => {
        expect(retrievePath('http://example.com/5?test=true')).toEqual('/5?test=true');
      });

      it('should preserve non-navigation links', () => {
        expect(retrievePath('#')).toEqual('#');
      });
    });

    describe('currentURL', () => {
      it('should return the window location', () => {
        const window = { location: { href: 'https://argu.dev/o/1' } } as unknown as Window;
        const currentURL = createCurrentURL(window)();
        expect(currentURL).toEqual('https://argu.dev/o/1');
      });

      it('should return undefined without window', () => {
        const currentURL = createCurrentURL(undefined)();
        expect(currentURL).toBeUndefined();
      });
    });
  });
});
