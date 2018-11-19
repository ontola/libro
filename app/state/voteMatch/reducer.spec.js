import voteMatch from './reducer';

describe('Votematch reducer', () => {
  it('should return the initial state', () => {
    const reduced = voteMatch(undefined, {});

    expect(reduced.getIn(['items', 'LocalVoteMatch', 'voteables'])).toBeDefined();
    expect(reduced.getIn(['items', 'LocalVoteMatch', 'voteables']).size).toEqual(0);
  });
});
