import { FRONTEND_URL } from '../config';

export function currentLocation(location) {
  return `${FRONTEND_URL}${location.pathname}${location.search}`;
}

const path = {
  createVoteMatch() {
    return '/vote_matches/new';
  },

  event(id) {
    return `/events/${id}`;
  },

  index() {
    return '/';
  },

  info(id) {
    return `/info/${id}`;
  },

  infoIndex() {
    return '/info';
  },

  motion(id) {
    return `/motions/${id}`;
  },

  motionsIndex() {
    return '/motions';
  },

  od(iri) {
    return `/od?iri=${iri}`;
  },

  partiesIndex() {
    return '/parties';
  },

  party(id) {
    return `/parties/${id}`;
  },

  partyAbout(id) {
    return `/parties/${id}/about`;
  },

  partyMembers(id) {
    return `/parties/${id}/members`;
  },

  partyMotions(id) {
    return `/parties/${id}/motions`;
  },

  politiciansIndex() {
    return '/politicians';
  },

  profile(id) {
    return `/profile/${id}`;
  },

  profileAbout(id) {
    return `/profile/${id}/about`;
  },

  profileMotions(id) {
    return `/profile/${id}/motions`;
  },

  search() {
    return '/search';
  },

  settings() {
    return '/settings';
  },

  /**
   * Sign-in / registration entrance route
   * @param {string} r The URL to return to after signing in/up
   * @returns {string} The URL.
   */
  signIn(r) {
    const url = '/u/sign_in';
    return r ? `${url}?r=${encodeURIComponent(r)}` : url;
  },
};

export default path;
