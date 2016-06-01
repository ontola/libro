/*
 * Action Types
 */

export const FETCH_MOTIONS = 'FETCH_MOTIONS';
export const SET_ACTIVE_MOTION = 'SET_ACTIVE_MOTION';
export const FETCH_POLITICIANS = 'FETCH_POLITICIANS';

/*
 * Action Creators
 */

export function fetchMotions(data) {
  return { type: FETCH_MOTIONS, data };
}

export function fetchPoliticians(data) {
  return { type: FETCH_POLITICIANS, data };
}

export function setActiveMotion(index) {
  return { type: SET_ACTIVE_MOTION, index };
}
