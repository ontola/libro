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
    playAudio: libro('actions/playAudio'),
    playBeep: libro('actions/playBeep'),
    redirect: libro('actions/redirect'),
    refresh: libro('actions/refresh'),
    reload: libro('actions/reload'),
    search: libro('actions/search'),
    snackbar: {
      finished: libro('actions/snackbar/finished'),
      show: libro('actions/snackbar'),
    },
    window: {
      open: libro('actions/window/open'),
    },
  },
  bootstrap: {
    ModulesList: libro('bootstrap/ModulesList'),
    TopologiesList: libro('bootstrap/TopologiesList'),
  },
  module: {
    topologiesCount: libro('module/topologiesCount'),
    type: libro('module/type'),
    viewsCount: libro('module/viewsCount'),
  },
  target: libro('target'),
  targets: {
    _blank: libro('_blank'),
    _parent: libro('_parent'),
    _self: libro('_self'),
    _top: libro('_top'),
    modal: libro('modal'),
  },
  topologies: {
    actionsBar: libro('topologies/actionsBar'),
    appMenu: libro('topologies/appMenu'),
    attributeList: libro('topologies/attributeList'),
    card: libro('topologies/card'),
    cardAppendix: libro('topologies/cardAppendix'),
    cardFixed: libro('topologies/cardFixed'),
    cardFloat: libro('topologies/cardFloat'),
    cardMain: libro('topologies/cardMain'),
    cardMicroRow: libro('topologies/cardMicroRow'),
    cardRow: libro('topologies/cardRow'),
    container: libro('topologies/container'),
    containerFloat: libro('topologies/containerFloat'),
    containerHeader: libro('topologies/containerHeader'),
    contentDetails: libro('topologies/contentDetails'),
    detail: libro('topologies/detail'),
    flow: libro('topologies/flow'),
    footer: libro('topologies/footer'),
    fullResource: libro('topologies/fullResource'),
    grid: libro('topologies/grid'),
    hoverBox: libro('topologies/hoverBox'),
    inline: libro('topologies/inline'),
    list: libro('topologies/list'),
    mainBody: libro('topologies/mainBody'),
    menu: libro('topologies/menu'),
    navbar: libro('topologies/navbar'),
    page: libro('topologies/page'),
    pageHeader: libro('topologies/pageHeader'),
    parent: libro('topologies/parent'),
    sideBarTopology: libro('topologies/sideBarTopology'),
    tabBar: libro('topologies/tabBar'),
    tabPane: libro('topologies/tabPane'),
  },
};
