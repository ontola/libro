import Immutable from 'immutable';

const Argument = Immutable.Record({
  id: null,
  title: '',
  text: '',
  side: '',
  created_at: '',
  vote_count: null,
});

const Count = Immutable.Record({
  id: null,
  name: '',
  option: '',
  value: null,
});

const Motion = Immutable.Record({
  id: null,
  title: '',
  text: '',
  created_at: '',
  creator: {},
  classification: 'Motie',
  arguments: [],
  vote_event: [],
});

const MotionMap = Immutable.OrderedMap;

const Person = Immutable.Record({
  id: null,
  name: '',
  image: '',
});

const Vote = Immutable.Record({
  id: null,
  individual: false,
  value: '',
});

const VoteEvent = Immutable.Record({
  id: null,
  result: '',
  counts: [],
  votes: [],
});

export {
  Argument,
  Count,
  Motion,
  MotionMap,
  Person,
  Vote,
  VoteEvent,
};
