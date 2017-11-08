/* eslint no-magic-numbers: 0 */
import { assert } from 'chai';
import nock from 'nock';
import sinon from 'sinon';

import * as models from 'models';

import {
  handleError,
  handleRecord,
  handleRequest,
} from '../utils/apiActionCreators';
import {
  callApi,
  getEndpoint,
  yieldEntities,
} from '../utils/apiHelpers';
import DataStore, { toCamel } from '../utils/DataStore';
import LinkedRenderStore from '../../helpers/LinkedRenderStore';

function mockCSRF() {
  LinkedRenderStore.api.processor.worker = { postMessage: () => {} };
  sinon.stub(LinkedRenderStore.api.processor.worker, 'postMessage');
  nock('https://beta.argu.dev')
    .post('/csrfToken')
    .reply(200, { csrfToken: 'sometoken' });
}

const record = new models.Motion({
  id: '1234567890',
  title: 'I am a Motion',
});

describe('Api Middleware', () => {
  it('should have an action to handle a record', () => {
    const expectedAction = {
      payload: {
        record,
      },
      type: 'GET_MOTION',
    };
    assert.deepEqual(handleRecord(record), expectedAction, 'Action not formatted properly');
  });

  it('should have an action to handle a request', () => {
    const actualPayload = {
      payload: {
        apiAction: true,
        endpoint: 'motions',
        id: '123456789',
      },
      type: 'GET_MOTION',
    };

    const expectedAction = {
      payload: {
        id: '123456789',
        loading: true,
      },
      type: 'GET_MOTION',
    };

    assert.deepEqual(handleRequest(actualPayload), expectedAction, 'HandleRequest action not properly formatted');
  });

  it('should have an action to handle an error', () => {
    const actualAction = {
      payload: {
        apiAction: true,
        endpoint: 'motions',
        id: '123456789',
      },
      type: 'GET_MOTION',
    };

    const actualError = new Error('Failed to fetch');

    const expectedAction = {
      error: true,
      payload: {
        id: '123456789',
        message: 'Failed to fetch',
      },
      type: 'GET_MOTION',
    };

    assert.deepEqual(handleError(actualAction, actualError), expectedAction, 'HandleError action not properly formatted');
  });

  it('should handle fetch requests', (done) => {
    mockCSRF();
    const jsondataSuccess = {
      data: 'success',
    };

    nock('http://api.example.com')
      .get('/success')
      .reply(200, jsondataSuccess);

    callApi('someUrlThatIsOverwrittenByHref', {
      payload: {
        request: {
          href: 'http://api.example.com/success',
        },
        test: 'test',
      },
      type: 'TEST_ACITON',
    })
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
        id: '3137bf58-89f5-e511-9672-e4115babb880',
        type: 'motions',
      }, {
        id: '3137bf58-89f5-e511-9672-e13513uievsq',
        type: 'motions',
      }],
      included: [{
        id: '2c37bf58-89f5-e511-9672-e4115babb880',
        type: 'persons',
      }],
    };

    const expectedEntities = [{
      id: '3137bf58-89f5-e511-9672-e4115babb880',
      type: 'motions',
    }, {
      id: '3137bf58-89f5-e511-9672-e13513uievsq',
      type: 'motions',
    }, {
      id: '2c37bf58-89f5-e511-9672-e4115babb880',
      type: 'persons',
    }];

    assert.deepEqual(yieldEntities(rawJson), expectedEntities, 'Entities not formatted correctly');
  });

  it('should format a raw jsonapi-response-entity to a predefined record', () => {
    const dataStore = new DataStore(Object.values(models));
    const actualEntity = {
      attributes: {
        classification: 'Motie',
        createdAt: '2016-03-28T22:00:00Z',
        title: 'A Motion Title',
      },
      id: '3137bf58-89f5-e511-9672-e4115babb880',
      relationships: {
        vote_events: {
          data: {
            id: '3137bf58-89f5-e511-9672-e4115babb880',
            type: 'vote_events',
          },
        },
      },
      type: 'motions',
    };

    const expectedRecord = new models.Motion({
      classification: 'Motie',
      createdAt: new Date('2016-03-28T22:00:00Z'),
      id: '3137bf58-89f5-e511-9672-e4115babb880',
      title: 'A Motion Title',
      voteEvents: '3137bf58-89f5-e511-9672-e4115babb880',
    });

    assert.deepEqual(dataStore.formatEntity(actualEntity), expectedRecord, 'Entity not transformed properly');
  });

  it('should have a helpers function to transform snake_cased string to camelCased', () => {
    assert.equal(toCamel('snake_cased'), 'snakeCased', 'toCamel function does not transform snake_cased strings properly');
  });
});
