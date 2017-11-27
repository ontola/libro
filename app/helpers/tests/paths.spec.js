import { assert } from 'chai';

import path from '../paths';

const TEST_ID = 12;

describe('Path helpers', () => {
  it('should return correct paths', () => {
    assert.equal(path.index(), '/', 'Does not return correct index path');
    assert.equal(path.event(TEST_ID), '/events/12', 'Does not return correct events resource path');
    assert.equal(path.motionsIndex(), '/motions', 'Does not return correct motions index path');
    assert.equal(path.profile(TEST_ID), '/profile/12', 'Does not return correct path');
    assert.equal(path.profileMotions(TEST_ID), '/profile/12/motions', 'Does not return correct path');
    assert.equal(path.profileAbout(TEST_ID), '/profile/12/about', 'Does not return correct path');
    assert.equal(path.politiciansIndex(), '/politicians', 'Does not return correct path');
    assert.equal(path.party(TEST_ID), '/parties/12', 'Does not return correct path');
    assert.equal(path.partyMotions(TEST_ID), '/parties/12/motions', 'Does not return correct path');
    assert.equal(path.partyMembers(TEST_ID), '/parties/12/members', 'Does not return correct path');
    assert.equal(path.partyAbout(TEST_ID), '/parties/12/about', 'Does not return correct path');
    assert.equal(path.partiesIndex(), '/parties', 'Does not return correct path');
  });

  it('should handle sign in', () => {
    assert.equal(path.signIn(), '/u/sign_in', 'Does not return correct sign in path');
    assert.equal(
      path.signIn('http://argu.co/redirect'),
      '/u/sign_in?r=http%3A%2F%2Fargu.co%2Fredirect',
      'Does not return correct sign in redirect path'
    );
  });
});
