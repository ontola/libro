import Immutable, { Map } from 'immutable';
import * as actions from '../constants/actionTypes';

const APIDesc = Immutable.Record({
  actions: new Map(),
  endpoint: '',
  type: '',
});

const apiModelGenerator = (properties, apiDesc) => {
  const superClass = Immutable.Record(Object.assign(
    {},
    { apiDesc: new APIDesc(apiDesc) },
    properties
  ));
  return class APIAction extends superClass {
    fetch() {
      return {
        type: this.apiDesc.getIn(['actions', 'resource']),
        payload: {
          apiAction: true,
          endpoint: this.apiDesc.get('endpoint'),
          id: this.id,
        },
      };
    }

    index() {
      return {
        type: this.apiDesc.getIn(['actions', 'collection']),
        payload: {
          apiAction: true,
          endpoint: this.apiDesc.get('endpoint'),
        },
      };
    }
  };
};

const Argument = apiModelGenerator({
  id: null,
  title: '',
  text: '',
  side: '',
  created_at: '',
  vote_count: null,
}, {
  actions: new Map({
    collection: actions.GET_ARGUMENTS,
    resource: actions.GET_ARGUMENT,
  }),
  endpoint: 'arguments',
  type: 'argument',
});

const Count = apiModelGenerator({
  id: null,
  name: '',
  option: '',
  value: null,
}, {
  actions: new Map({
    collection: actions.GET_COUNTS,
    resource: actions.GET_COUNT,
  }),
  endpoint: 'counts',
  type: 'count',
});

const Motion = apiModelGenerator({
  id: null,
  title: '',
  text: '',
  created_at: '',
  creator: {},
  classification: 'Motie',
  arguments: [],
  vote_event: [],
}, {
  actions: new Map({
    collection: actions.GET_MOTIONS,
    resource: actions.GET_MOTION,
  }),
  endpoint: 'documents',
  type: 'motion',
});

const Person = apiModelGenerator({
  id: null,
  name: '',
  image: '',
}, {
  actions: new Map({
    collection: actions.GET_PERSONS,
    resource: actions.GET_PERSON,
  }),
  endpoint: 'persons',
  type: 'person',
});

const Vote = apiModelGenerator({
  id: null,
  individual: false,
  value: '',
}, {
  actions: new Map({
    collection: actions.GET_VOTES,
    resource: actions.GET_VOTE,
  }),
  endpoint: 'votes',
  type: 'vote',
});

const VoteEvent = apiModelGenerator({
  id: null,
  result: '',
  counts: [],
  votes: [],
}, {
  actions: new Map({
    collection: actions.GET_VOTE_EVENTS,
    resource: actions.GET_VOTE_EVENT,
  }),
  endpoint: 'vote_events',
  type: 'vote_event',
});

export {
  Argument,
  Count,
  Motion,
  Person,
  Vote,
  VoteEvent,
};
