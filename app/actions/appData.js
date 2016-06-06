import { FETCH_MOTIONS, FETCH_POLITICIANS } from '../constants';

export function fetchMotions(data) {
  return { type: FETCH_MOTIONS, data };
}

export function fetchPoliticians(data) {
  return { type: FETCH_POLITICIANS, data };
}
