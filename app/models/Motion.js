import Immutable from 'immutable';

export const Motion = Immutable.Record({
  id: null,
  title: '',
  text: '',
  created_at: '',
  classification: 'Motie',
});

export const MotionMap = Immutable.OrderedMap;
