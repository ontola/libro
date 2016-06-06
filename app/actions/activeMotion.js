import { SET_ACTIVE_MOTION } from '../constants';

export function setActiveMotion(index) {
  return { type: SET_ACTIVE_MOTION, index };
}
