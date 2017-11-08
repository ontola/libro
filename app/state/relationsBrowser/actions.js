import { GET_RELATION } from '../action-types';

export const fetchRelation = (uri, relation) => ({
  payload: {
    relation,
    uri,
  },
  type: GET_RELATION,
});

export default fetchRelation;
