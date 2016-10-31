import { GET_RELATION } from '../action-types';

export const fetchRelation = (uri, relation) => ({
  type: GET_RELATION,
  payload: {
    uri,
    relation,
  },
});

export default fetchRelation;
