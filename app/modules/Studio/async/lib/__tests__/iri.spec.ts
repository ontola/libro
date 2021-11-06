import { websiteRelativePath } from '../iri';

describe('iri', () => {
  describe('websiteRelativePath', () => {
    it('0', () => {
      expect(websiteRelativePath('https://example.com/', 'https://example.com/')).toEqual('/');
    });

    it('1', () => {
      expect(websiteRelativePath('https://example.com/page', 'https://example.com/')).toEqual('/page');
    });

    it('2', () => {
      expect(websiteRelativePath('https://example.com/academy', 'https://example.com/academy')).toEqual('/');
    });

    it('3', () => {
      expect(websiteRelativePath('https://example.com/academy/page', 'https://example.com/academy')).toEqual('/page');
    });
  });
});
