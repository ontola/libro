import { assert } from 'chai';

import * as models from 'models';
import * as actions from 'state/action-types';

const SPECIFIC_PERSON_ID = 14;

describe('Persons actions', () => {
  it('should have an action to get a specific Person', () => {
    const expectedAction = {
      payload: {
        apiAction: true,
        arguModel: false,
        endpoint: 'persons',
        id: SPECIFIC_PERSON_ID,
      },
      type: actions.GET_PERSON,
    };

    assert.deepEqual(
      models.Person.fetch(SPECIFIC_PERSON_ID),
      expectedAction,
      'Action is not formatted correctly'
    );
  });

  it('should have an action to get all Persons', () => {
    const expectedAction = {
      payload: {
        apiAction: true,
        arguModel: false,
        endpoint: 'persons',
      },
      type: actions.GET_PERSONS,
    };

    assert.deepEqual(
      models.Person.index(),
      expectedAction,
      'Action is not formatted correctly'
    );
  });
});
