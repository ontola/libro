/* eslint no-magic-numbers: 0 */
import { assert } from 'chai';
import nock from 'nock';

import {
  handleRecord,
  handleRequest,
  handleError,
} from '../utils/apiActionCreators';

import {
  callApi,
  getEndpoint,
  yieldEntities,
} from '../utils/apiHelpers';

import * as models from 'models';

const record = new models.Motion({
  id: '1234567890',
  title: 'I am a Motion',
});

describe('Api Middleware', () => {
  it('should have an action to handle a record', () => {
    const expectedAction = {
      type: 'GET_MOTION',
      payload: {
        record,
      },
    };
    assert.deepEqual(handleRecord(record), expectedAction, 'Action not formatted properly');
  });

  it('should have an action to handle a request', () => {
    const actualPayload = {
      type: 'GET_MOTION',
      payload: {
        apiAction: true,
        endpoint: 'motions',
        id: '123456789',
      },
    };

    const expectedAction = {
      type: 'GET_MOTION',
      payload: {
        loading: true,
        id: '123456789',
      },
    };

    assert.deepEqual(handleRequest(actualPayload), expectedAction, 'HandleRequest action not properly formatted');
  });

  it('should have an action to handle an error', () => {
    const actualAction = {
      type: 'GET_MOTION',
      payload: {
        apiAction: true,
        endpoint: 'motions',
        id: '123456789',
      },
    };

    const actualError = new Error('Failed to fetch');

    const expectedAction = {
      type: 'GET_MOTION',
      error: true,
      payload: {
        message: 'Failed to fetch',
        id: '123456789',
      },
    };

    assert.deepEqual(handleError(actualAction, actualError), expectedAction, 'HandleError action not properly formatted');
  });

  it('should handle fetch requests', (done) => {
    const jsondata = {
      data: 'success',
    };

    nock('http://api.example.com')
      .get('/success')
      .reply(200, jsondata);

    callApi('http://api.example.com/success')
      .catch(done)
      .then((data) => {
        assert.equal(data.data, 'success', 'response is incorrect');
        done();
      });
  });

  it('should generate correct endpoint', () => {
    const resourceAction = {
      apiAction: true,
      endpoint: 'motions',
      id: '123456789',
    };

    const collectionAction = {
      apiAction: true,
      endpoint: 'motions',
    };

    assert.equal(
      getEndpoint('http://api.argu.co/', resourceAction),
      'http://api.argu.co/motions/123456789',
      'Resource endpoint is not formatted correctly'
    );

    assert.equal(
      getEndpoint('http://api.argu.co/', collectionAction),
      'http://api.argu.co/motions',
      'Collection endpoint is not formatted correctly'
    );
  });

  it('should yield correct entities from json object', () => {
    const rawJson = {
      data: [{
        type: 'motions',
        id: '3137bf58-89f5-e511-9672-e4115babb880',
      }, {
        type: 'motions',
        id: '3137bf58-89f5-e511-9672-e13513uievsq',
      }],
      included: [{
        type: 'persons',
        id: '2c37bf58-89f5-e511-9672-e4115babb880',
      }],
    };

    const expectedEntities = [{
      type: 'motions',
      id: '3137bf58-89f5-e511-9672-e4115babb880',
    }, {
      type: 'motions',
      id: '3137bf58-89f5-e511-9672-e13513uievsq',
    }, {
      type: 'persons',
      id: '2c37bf58-89f5-e511-9672-e4115babb880',
    }];

    assert.deepEqual(yieldEntities(rawJson), expectedEntities, 'Entities not formatted correctly');
  });
});
