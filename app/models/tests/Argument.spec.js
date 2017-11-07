import { assert } from 'chai';
import * as models from 'models';
import * as actions from 'state/action-types';

const SPECIFIC_ARGUMENT_ID = 14;

describe('Argument actions', () => {
  it('should have an action to get a specific Argument', () => {
    const expectedAction = {
      type: actions.GET_ARGUMENT,
      payload: {
        apiAction: true,
        arguModel: false,
        endpoint: 'arguments',
        id: SPECIFIC_ARGUMENT_ID,
      },
    };

    assert.deepEqual(
      models.Argument.fetch(SPECIFIC_ARGUMENT_ID),
      expectedAction,
      'Action is not formatted correctly'
    );
  });

  it('should have an action to get all arguments', () => {
    const expectedAction = {
      type: actions.GET_ARGUMENTS,
      payload: {
        apiAction: true,
        arguModel: false,
        endpoint: 'arguments',
      },
    };

    assert.deepEqual(
      models.Argument.index(),
      expectedAction,
      'Action is not formatted correctly'
    );
  });
});
