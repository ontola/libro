import path, { currentLocation } from '../paths';

const TEST_ID = 12;

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
        expect(path.createVoteMatch()).toEqual('/vote_matches/new');
      });
    });

    describe('index', () => {
      it('returns the correct path', () => {
        expect(path.index()).toEqual('/');
      });
    });

    describe('info', () => {
      it('returns the correct path', () => {
        expect(path.info('about')).toEqual('/info/about');
      });
    });

    describe('event', () => {
      it('returns the correct path', () => {
        expect(path.event(TEST_ID)).toEqual('/events/12');
      });
    });

    describe('infoIndex', () => {
      it('returns the correct path', () => {
        expect(path.infoIndex()).toEqual('/info');
      });
    });

    describe('motionsIndex', () => {
      it('returns the correct path', () => {
        expect(path.motionsIndex()).toEqual('/motions');
      });
    });

    describe('od', () => {
      it('returns the correct path', () => {
        expect(path.od('http://example.com/')).toEqual('/od?iri=http://example.com/');
      });
    });

    describe('profile', () => {
      it('returns the correct path', () => {
        expect(path.profile(TEST_ID)).toEqual('/profile/12');
      });
    });

    describe('profileAbout', () => {
      it('returns the correct path', () => {
        expect(path.profileAbout(TEST_ID)).toEqual('/profile/12/about');
      });
    });

    describe('profileMotions', () => {
      it('returns the correct path', () => {
        expect(path.profileMotions(TEST_ID)).toEqual('/profile/12/motions');
      });
    });

    describe('search', () => {
      it('returns the correct path', () => {
        expect(path.search()).toEqual('/search');
      });
    });

    describe('settings', () => {
      it('returns the correct path', () => {
        expect(path.settings()).toEqual('/settings');
      });
    });

    describe('politiciansIndex', () => {
      it('returns the correct path', () => {
        expect(path.politiciansIndex()).toEqual('/politicians');
      });
    });

    describe('party', () => {
      it('returns the correct path', () => {
        expect(path.party(TEST_ID)).toEqual('/parties/12');
      });
    });

    describe('partyMotions', () => {
      it('returns the correct path', () => {
        expect(path.partyMotions(TEST_ID)).toEqual('/parties/12/motions');
      });
    });

    describe('partyMembers', () => {
      it('returns the correct path', () => {
        expect(path.partyMembers(TEST_ID)).toEqual('/parties/12/members');
      });
    });

    describe('partyAbout', () => {
      it('returns the correct path', () => {
        expect(path.partyAbout(TEST_ID)).toEqual('/parties/12/about');
      });
    });

    describe('partiesIndex', () => {
      it('returns the correct path', () => {
        expect(path.partiesIndex()).toEqual('/parties');
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
