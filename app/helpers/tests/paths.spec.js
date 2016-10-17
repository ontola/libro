/* eslint no-magic-numbers: 0 */
import { assert } from 'chai';
import path from '../paths';

describe('Path helpers', () => {
  it('should return correct paths', () => {
    assert.equal(path.index(), '/', 'Does not return correct index path');
    assert.equal(path.event(12), '/events/12', 'Does not return correct events resource path');
    assert.equal(path.motion(12), '/motions/12', 'Does not return correct motions resource path');
    assert.equal(path.motionsIndex(), '/motions', 'Does not return correct motions index path');
    assert.equal(path.profile(12), '/profile/12', 'Does not return correct path');
    assert.equal(path.profileMotions(12), '/profile/12/motions', 'Does not return correct path');
    assert.equal(path.profileAbout(12), '/profile/12/about', 'Does not return correct path');
    assert.equal(path.politiciansIndex(), '/politicians', 'Does not return correct path');
    assert.equal(path.party(12), '/parties/12', 'Does not return correct path');
    assert.equal(path.partyMotions(12), '/parties/12/motions', 'Does not return correct path');
    assert.equal(path.partyMembers(12), '/parties/12/members', 'Does not return correct path');
    assert.equal(path.partyAbout(12), '/parties/12/about', 'Does not return correct path');
    assert.equal(path.partiesIndex(), '/parties', 'Does not return correct path');
  });
});
