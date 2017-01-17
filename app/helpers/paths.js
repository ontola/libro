const path = {
  index() {
    return '/';
  },

  event(id) {
    return `/events/${id}`;
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

  signIn() {
    return '/u/sign_in';
  },
};

export default path;
