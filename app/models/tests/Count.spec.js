import { assert } from 'chai';
import * as models from 'models';
import * as actions from 'state/action-types';

const SPECIFIC_COUNT_ID = 14;

describe('Count actions', () => {
  it('should have an action to get a specific Count', () => {
    const expectedAction = {
      type: actions.GET_COUNT,
      payload: {
        apiAction: true,
        arguModel: false,
        endpoint: 'counts',
        id: SPECIFIC_COUNT_ID,
      },
    };

    assert.deepEqual(
      models.Count.fetch(SPECIFIC_COUNT_ID),
      expectedAction,
      'Action is not formatted correctly'
    );
  });

  it('should have an action to get all Counts', () => {
    const expectedAction = {
      type: actions.GET_COUNTS,
      payload: {
        apiAction: true,
        arguModel: false,
        endpoint: 'counts',
      },
    };

    assert.deepEqual(
      models.Count.index(),
      expectedAction,
      'Action is not formatted correctly'
    );
  });
});
