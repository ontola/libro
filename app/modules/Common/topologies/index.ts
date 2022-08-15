import libro from '../../Kernel/ontology/libro';

export const inlineTopology = libro.topologies.inline;

export const alertDialogTopology = libro.ns('dialog/alert');
export const attributeListTopology = libro.topologies.attributeList;
export const tabPaneTopology = libro.topologies.tabPane;
export const tabBarTopology = libro.topologies.tabBar;
export const sideBarTopology = libro.topologies.sideBarTopology;
export const pageHeaderTopology = libro.topologies.pageHeader;
export const pageTopology = libro.topologies.page;
export const mainBodyTopology = libro.topologies.mainBody;
export const listTopology = libro.topologies.list;
export const hoverBoxTopology = libro.topologies.hoverBox;
export const gridTopology = libro.topologies.grid;
export const fullResourceTopology = libro.topologies.fullResource;
export const footerTopology = libro.topologies.footer;
export const detailsBarTopology = libro.topologies.detail;
export const contentDetailsTopology = libro.topologies.contentDetails;
export const containerHeaderTopology = libro.topologies.containerHeader;
export const containerFloatTopology = libro.topologies.containerFloat;
export const containerTopology = libro.topologies.container;
export const cardRowTopology = libro.topologies.cardRow;
export const cardMicroRowTopology = libro.topologies.cardMicroRow;
export const cardMainTopology = libro.topologies.cardMain;
export const cardFloatTopology = libro.topologies.cardFloat;
export const cardFixedTopology = libro.topologies.cardFixed;
export const cardAppendixTopology = libro.topologies.cardAppendix;
export const cardTopology = libro.topologies.card;
export const parentTopology = libro.topologies.parent;

export default [
  alertDialogTopology,
  attributeListTopology,
  cardTopology,
  cardAppendixTopology,
  cardFixedTopology,
  cardFloatTopology,
  cardMainTopology,
  cardMicroRowTopology,
  cardRowTopology,
  containerTopology,
  containerFloatTopology,
  containerHeaderTopology,
  contentDetailsTopology,
  detailsBarTopology,
  footerTopology,
  fullResourceTopology,
  gridTopology,
  hoverBoxTopology,
  inlineTopology,
  listTopology,
  mainBodyTopology,
  pageTopology,
  pageHeaderTopology,
  parentTopology,
  sideBarTopology,
  tabBarTopology,
  tabPaneTopology,
];
