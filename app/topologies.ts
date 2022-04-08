import rdf, { NamedNode } from '@ontologies/core';

import app from './ontology/app';
import argu from './ontology/argu';
import ontola from './ontology/ontola';
import sales from './ontology/sales';

export const actionsBarTopology = argu.actionsBar;
export const alertDialogTopology = ontola.ns('dialog/alert');
export const appMenuTopology = app.ns('topologies/appMenu');
export const attributeListTopology = argu.ns('attributeList');
export const blueBlockTopology = sales.blueBlock;
export const cardAppendixTopology = argu.ns('cardAppendix');
export const cardFixedTopology = argu.cardFixed;
export const cardFloatTopology = argu.ns('cardFloat');
export const cardMainTopology = argu.cardMain;
export const cardMicroRowTopology = argu.ns('cardMicroRow');
export const cardRowTopology = argu.ns('cardRow');
export const cardTopology = argu.card;
export const chapterContentTopology = argu.ns('chapterContent');
export const containerFloatTopology = argu.ns('containerFloat');
export const containerHeaderTopology = argu.ns('containerHeader');
export const containerTopology = argu.container;
export const contentDetailsTopology = argu.ns('contentDetails');
export const detailsBarTopology = argu.detail;
export const flowTopology = argu.ns('flow');
export const footerTopology = ontola.ns('footer');
export const formFooterTopology = argu.formFooter;
export const fullResourceTopology = argu.fullResource;
export const gridTopology = argu.grid;
export const hoverBoxTopology = argu.ns('cardHover');
export const inlineTopology = argu.inline;
export const listTopology = argu.ns('list');
export const mainBodyTopology = argu.ns('mainBody');
export const menuTopology = argu.ns('topologies/menu');
export const navbarTopology = app.ns('topologies/navbar');
export const omniformFieldsTopology = argu.ns('omniformFields');
export const omniformSupplementBarTopology = argu.ns('omniformSupplementBar');
export const pageHeaderTopology = argu.ns('pageHeader');
export const pageTopology = argu.ns('page');
export const parentTopology = argu.ns('parent');
export const radioGroupTopology = argu.ns('radioGroup');
export const selectTopology = argu.ns('select');
export const selectedValueTopology = argu.selectedValue;
export const showcaseTopology = argu.ns('topologies/showcase');
export const sideBarTopology = argu.ns('sideBarTopology');
export const tabBarTopology = argu.ns('tabBar');
export const tabPaneTopology = argu.tabPane;
export const tableBodyTopology = argu.ns('tableBody');
export const tableCellTopology = argu.ns('tableCell');
export const tableFooterCellTopology = argu.ns('tableFooterCell');
export const tableFooterRowTopology = argu.ns('tableFooterRow');
export const tableHeaderCellTopology = argu.ns('tableHeaderCell');
export const tableHeaderRowTopology = argu.ns('tableHeaderRow');
export const tableRowTopology = argu.ns('tableRow');
export const tableTopology = argu.ns('table');

export const allTopologies: NamedNode[] = [
  undefined as unknown as NamedNode,
  actionsBarTopology,
  appMenuTopology,
  attributeListTopology,
  blueBlockTopology,
  cardTopology,
  cardAppendixTopology,
  cardFixedTopology,
  cardFloatTopology,
  cardMainTopology,
  cardMicroRowTopology,
  cardRowTopology,
  chapterContentTopology,
  containerTopology,
  containerFloatTopology,
  containerHeaderTopology,
  contentDetailsTopology,
  detailsBarTopology,
  alertDialogTopology,
  menuTopology,
  flowTopology,
  formFooterTopology,
  footerTopology,
  fullResourceTopology,
  gridTopology,
  hoverBoxTopology,
  inlineTopology,
  listTopology,
  mainBodyTopology,
  navbarTopology,
  omniformFieldsTopology,
  omniformSupplementBarTopology,
  parentTopology,
  pageTopology,
  pageHeaderTopology,
  radioGroupTopology,
  selectTopology,
  selectedValueTopology,
  showcaseTopology,
  sideBarTopology,
  tableBodyTopology,
  tableHeaderCellTopology,
  tableHeaderRowTopology,
  tableFooterCellTopology,
  tableFooterRowTopology,
  tableTopology,
  tableRowTopology,
  tableCellTopology,
  tabPaneTopology,
  tabBarTopology,
];

export const formFieldTopologies = [
  cardMainTopology,
  cardTopology,
  formFooterTopology,
  mainBodyTopology,
  omniformFieldsTopology,
  flowTopology,
];

export function allTopologiesExcept(...topologies: NamedNode[]): NamedNode[] {
  const filtered = allTopologies.slice();
  topologies.forEach((t) => {
    const i = filtered.findIndex((f) => rdf.equals(f, t));

    if (i !== -1) {
      filtered.splice(i, 1);
    }
  });

  return filtered;
}

export const getTopologyNumber = (topology?: NamedNode): number => allTopologies
  .findIndex((item) => rdf.equals(topology, item));
