import { createNS } from '@ontologies/core';

const libro = createNS('https://ns.ontola.io/libro/');

export default {
  ns: libro,

  // eslint-disable-next-line sort-keys
  actions: {
    copyToClipboard: libro('actions/copyToClipboard'),
    dialog: {
      alert: libro('actions/dialog/alert'),
      close: libro('actions/dialog/close'),
    },
    expireSession: libro('actions/expireSession'),
    logout: libro('actions/logout'),
    navigation: {
      pop: libro('actions/navigations/pop'),
      push: libro('actions/navigations/push'),
    },
    redirect: libro('actions/redirect'),
    refresh: libro('actions/refresh'),
    reload: libro('actions/reload'),
    snackbar: {
      finished: libro('actions/snackbar/finished'),
      show: libro('actions/snackbar'),
    },
    window: {
      open: libro('actions/window/open'),
    },
  },
  target: libro('target'),
  targets: {
    _blank: libro('_blank'),
    _parent: libro('_parent'),
    _self: libro('_self'),
    _top: libro('_top'),
    modal: libro('modal'),
  },
};
