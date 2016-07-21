import * as actions from '../constants/actionTypes';
import { CALL_API } from '../middleware/api';

const getMotions = () => ({
  [CALL_API]: {
    types: [actions.GET_MOTIONS_REQUEST, actions.GET_MOTIONS_SUCCESS, actions.GET_MOTIONS_FAILURE],
  },
});

const getMotion = (id) => ({
  [CALL_API]: {
    types: [actions.GET_MOTIONS_REQUEST, actions.GET_MOTIONS_SUCCESS, actions.GET_MOTIONS_FAILURE],
    payload: id,
  },
});

const getPersons = () => ({
  [CALL_API]: {
    types: [actions.GET_PERSONS_REQUEST, actions.GET_PERSONS_SUCCESS, actions.GET_PERSONS_FAILURE],
  },
});

const getPerson = (id) => ({
  [CALL_API]: {
    types: [actions.GET_PERSON_REQUEST, actions.GET_PERSON_SUCCESS, actions.GET_PERSON_FAILURE],
    payload: id,
  },
});


export {
  getMotions,
  getMotion,
  getPersons,
  getPerson,
};
