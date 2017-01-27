const path = {
  index() {
    return '/';
  },

  event(id) {
    return `/events/${id}`;
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

  profile(id) {
    return `/profile/${id}`;
  },

  profileMotions(id) {
    return `/profile/${id}/motions`;
  },

  profileAbout(id) {
    return `/profile/${id}/about`;
  },

  politiciansIndex() {
    return '/politicians';
  },

  party(id) {
    return `/parties/${id}`;
  },

  partyMotions(id) {
    return `/parties/${id}/motions`;
  },

  partyMembers(id) {
    return `/parties/${id}/members`;
  },

  partyAbout(id) {
    return `/parties/${id}/about`;
  },

  partiesIndex() {
    return '/parties';
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
