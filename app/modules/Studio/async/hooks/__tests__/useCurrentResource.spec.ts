import { pageViewerRelativeIRI } from '../useCurrentResource';

describe('pageViewerRelativeIRI', () => {
  describe('with simple websiteIRI', () => {
    const website = 'https://argu.nl'
    ;
    it('maps root to websiteIRI', () => {
      const location = {
        hash: '',
        pathname: '/',
        search: '',
        state: '',
      };
      const res = pageViewerRelativeIRI(website, location);

      expect(res).toEqual('https://argu.nl/');
    });

    it('maps nested paths', () => {
      const location = {
        hash: '',
        pathname: '/i/privacy',
        search: '',
        state: '',
      };
      const res = pageViewerRelativeIRI(website, location);

      expect(res).toEqual('https://argu.nl/i/privacy');
    });
  });

  describe('with path relative websiteIRI', () => {
    const website = 'https://argu.co/academy';

    it('maps root to websiteIRI', () => {
      const location = {
        hash: '',
        pathname: '/',
        search: '',
        state: '',
      };
      const res = pageViewerRelativeIRI(website, location);

      expect(res).toEqual('https://argu.co/academy');
    });

    it('maps website iri', () => {
      const location = {
        hash: '',
        pathname: '/academy',
        search: '',
        state: '',
      };
      const res = pageViewerRelativeIRI(website, location);

      expect(res).toEqual('https://argu.co/academy');
    });

    it('maps nested paths', () => {
      const location = {
        hash: '',
        pathname: '/academy/online-participatie/wat-is-participatie/wat-is-online-participatie',
        search: '',
        state: '',
      };
      const res = pageViewerRelativeIRI(website, location);

      expect(res).toEqual('https://argu.co/academy/online-participatie/wat-is-participatie/wat-is-online-participatie');
    });
  });
});
