import { assert } from 'chai';

import * as models from 'models';
import * as actions from 'state/action-types';

const SPECIFIC_MOTION_ID = 14;

describe('Motion actions', () => {
  it('should have an action to get a specific motion', () => {
    const expectedAction = {
      payload: {
        apiAction: true,
        arguModel: false,
        endpoint: 'motions',
        id: SPECIFIC_MOTION_ID,
      },
      type: actions.GET_MOTION,
    };

    assert.deepEqual(
      models.Motion.fetch(SPECIFIC_MOTION_ID),
      expectedAction,
      'Action is not formatted correctly'
    );
  });

  it('should have an action to get all motions', () => {
    const expectedAction = {
      payload: {
        apiAction: true,
        arguModel: false,
        endpoint: 'motions',
      },
      type: actions.GET_MOTIONS,
    };

    assert.deepEqual(
      models.Motion.index(),
      expectedAction,
      'Action is not formatted correctly'
    );
  });
});
