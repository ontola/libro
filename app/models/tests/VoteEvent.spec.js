import { assert } from 'chai';
import * as models from 'models';
import * as actions from 'state/action-types';

const SPECIFIC_VOTE_EVENT_ID = 14;

describe('Vote events actions', () => {
  it('should have an action to get a specific Vote event', () => {
    const expectedAction = {
      type: actions.GET_VOTE_EVENT,
      payload: {
        apiAction: true,
        arguModel: false,
        endpoint: 'vote_events',
        id: SPECIFIC_VOTE_EVENT_ID,
      },
    };

    assert.deepEqual(
      models.VoteEvent.fetch(SPECIFIC_VOTE_EVENT_ID),
      expectedAction,
      'Action is not formatted correctly'
    );
  });

  it('should have an action to get all Vote events', () => {
    const expectedAction = {
      type: actions.GET_VOTE_EVENTS,
      payload: {
        apiAction: true,
        arguModel: false,
        endpoint: 'vote_events',
      },
    };

    assert.deepEqual(
      models.VoteEvent.index(),
      expectedAction,
      'Action is not formatted correctly'
    );
  });
});
