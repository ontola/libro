import { assert } from 'chai';

import * as models from 'models';
import * as actions from 'state/action-types';

const SPECIFIC_ARGUMENT_ID = 14;

describe('Argument actions', () => {
  it('should have an action to get a specific Argument', () => {
    const expectedAction = {
      payload: {
        apiAction: true,
        arguModel: false,
        endpoint: 'arguments',
        id: SPECIFIC_ARGUMENT_ID,
      },
      type: actions.GET_ARGUMENT,
    };

    assert.deepEqual(
      models.Argument.fetch(SPECIFIC_ARGUMENT_ID),
      expectedAction,
      'Action is not formatted correctly'
    );
  });

  it('should have an action to get all arguments', () => {
    const expectedAction = {
      payload: {
        apiAction: true,
        arguModel: false,
        endpoint: 'arguments',
      },
      type: actions.GET_ARGUMENTS,
    };

    assert.deepEqual(
      models.Argument.index(),
      expectedAction,
      'Action is not formatted correctly'
    );
  });
});
